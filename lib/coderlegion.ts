import "server-only";
import sharp from "sharp";

const API_BASE = "https://coderlegion.com/api/v1";
const ARTICLES_CATEGORY_ID = 2; // confirmed via GET /posts/create-options

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// CoderLegion's own docs cap "cover" images at 1080x1080 server-side, but a
// ~5.5MB source photo (well under that pixel cap already) still got a bare
// 500 on upload — so the real limit is file size, not dimensions, and it's
// undocumented. Re-encoding through sharp at 1080px/quality 80 reliably
// lands in the 100-300KB range, comfortably under whatever the cap is
// (confirmed: a 35KB image uploads fine).
async function compressForUpload(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .resize(1080, 1080, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer();
}

async function uploadCoverImage(imageUrl: string, apiKey: string): Promise<string | null> {
  try {
    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) return null;
    const original = Buffer.from(await imgRes.arrayBuffer());
    const compressed = await compressForUpload(original);

    const form = new FormData();
    form.append("file", new Blob([new Uint8Array(compressed)], { type: "image/jpeg" }), "cover.jpg");
    form.append("type", "cover");

    const uploadRes = await fetch(`${API_BASE}/uploads/image`, {
      method: "POST",
      headers: { "X-API-Key": apiKey },
      body: form,
    });
    // Still don't let an upload failure kill the whole cross-post — post
    // without a cover rather than not at all — but this should be rare now.
    if (!uploadRes.ok) return null;

    const data = (await uploadRes.json()) as { data?: { blobid?: string } };
    return data.data?.blobid ?? null;
  } catch {
    return null;
  }
}

// Cross-posts to CoderLegion, with source_url pointing back to deledev.com
// (their equivalent of dev.to's canonical_url). Note: unlike dev.to, a new
// post here is queued for moderation, not published instantly (API returns
// 202 with queued: true) — the constructed URL below works once approved,
// since CoderLegion redirects any slug to the canonical one as long as the
// numeric ID matches, confirmed directly against a real post.
export async function crossPostToCoderLegion({
  title,
  bodyMarkdown,
  canonicalUrl,
  coverImageUrl,
  tags,
}: {
  title: string;
  bodyMarkdown: string;
  canonicalUrl: string;
  coverImageUrl?: string | null;
  tags: string[];
}): Promise<string | null> {
  const apiKey = process.env.CODERLEGION_API_KEY;
  if (!apiKey) return null;

  const blobid = coverImageUrl ? await uploadCoverImage(coverImageUrl, apiKey) : null;

  const res = await fetch(`${API_BASE}/posts`, {
    method: "POST",
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content: bodyMarkdown,
      format: "markdown",
      category_id: ARTICLES_CATEGORY_ID,
      tags: tags.slice(0, 4),
      ...(blobid && { cover_image_blobid: blobid }),
      source_url: canonicalUrl,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`CoderLegion API returned ${res.status}: ${detail}`);
  }

  const result = (await res.json()) as { data?: { id?: number } };
  const id = result.data?.id;
  if (!id) return null;

  return `https://coderlegion.com/${id}/${slugify(title)}`;
}
