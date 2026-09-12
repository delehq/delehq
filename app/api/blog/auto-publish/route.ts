import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { pingIndexNow } from "@/lib/indexnow";
import { SITE_URL } from "@/lib/constants";

// Lets the scheduled blog-post cloud routine (see the "Write one blog post
// for deledev.com" routine) publish directly instead of a human copy-pasting
// generated text into /admin/blog by hand — that manual step was the single
// biggest bottleneck an SEO audit found in the whole publishing pipeline.
//
// Deliberately narrow: this route can only ever do one thing (create a
// published blog post + its cover image), gated by its own single-purpose
// token — never the admin session, never a token that can do anything else.
// The routine that calls this never holds SUPABASE_SECRET_KEY itself.

const BodySchema = z.object({
  title: z.string().trim().min(3).max(200),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase, hyphen-separated"),
  summary: z.string().trim().min(10).max(500),
  body: z.string().trim().min(50),
  read_time_minutes: z.number().int().min(1).max(60),
  image_url: z.string().trim().url().startsWith("https://"),
});

function supabaseAdmin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!);
}

async function fetchCoverImage(imageUrl: string) {
  const res = await fetch(imageUrl);
  if (!res.ok) throw new Error(`Could not download image_url (${res.status})`);

  const contentType = res.headers.get("content-type") ?? "";
  const extByType: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  };
  const ext = extByType[contentType.split(";")[0].trim()];
  if (!ext) throw new Error(`image_url did not return a supported image type (got "${contentType}")`);

  const buffer = Buffer.from(await res.arrayBuffer());
  if (buffer.byteLength > 10 * 1024 * 1024) {
    throw new Error("Image is larger than the 10MB limit");
  }

  return { buffer, ext, contentType };
}

export async function POST(request: Request) {
  const expectedToken = process.env.BLOG_AUTOPUBLISH_TOKEN;
  if (!expectedToken) {
    return Response.json({ error: "Auto-publish is not configured" }, { status: 503 });
  }

  const authHeader = request.headers.get("authorization") ?? "";
  const providedToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (providedToken !== expectedToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Body must be JSON" }, { status: 400 });
  }

  const parsed = BodySchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { title, slug, summary, body, read_time_minutes, image_url } = parsed.data;
  const supabase = supabaseAdmin();

  let coverImagePath: string | null = null;
  try {
    const { buffer, ext } = await fetchCoverImage(image_url);
    const path = `blog/${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(path, buffer, { contentType: `image/${ext === "jpg" ? "jpeg" : ext}`, upsert: false });
    if (uploadError) throw new Error(uploadError.message);
    coverImagePath = path;
  } catch (err) {
    return Response.json(
      { error: `Image upload failed: ${err instanceof Error ? err.message : String(err)}` },
      { status: 502 },
    );
  }

  const row = {
    slug,
    title,
    summary,
    body,
    cover_image_path: coverImagePath,
    read_time_minutes,
    published_at: new Date().toISOString(),
    is_published: true,
  };

  let { error: insertError } = await supabase.from("blog_posts").insert(row);

  // Slug collisions should be rare (the routine is told not to repeat a
  // covered topic), but the column is unique — retry once with a suffix
  // rather than failing the whole run over it.
  if (insertError?.code === "23505") {
    const fallbackSlug = `${slug}-${Date.now().toString(36)}`;
    ({ error: insertError } = await supabase
      .from("blog_posts")
      .insert({ ...row, slug: fallbackSlug }));
    if (!insertError) {
      void pingIndexNow(`${SITE_URL}/blog/${fallbackSlug}`);
      return Response.json({ success: true, slug: fallbackSlug, note: "original slug was taken" });
    }
  }

  if (insertError) {
    return Response.json({ error: insertError.message }, { status: 500 });
  }

  void pingIndexNow(`${SITE_URL}/blog/${slug}`);
  return Response.json({ success: true, slug });
}
