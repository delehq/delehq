"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { insertRow, updateRow, deleteRow } from "@/lib/admin/crud-helpers";
import { createClient } from "@/lib/supabase/server";
import { parseFaqsText } from "@/lib/faq";
import { pingIndexNow } from "@/lib/indexnow";
import { requestGoogleIndexing } from "@/lib/google-indexing";
import { crossPostToDevTo } from "@/lib/devto";
import { getMediaUrl } from "@/lib/supabase/storage";
import { SITE_URL } from "@/lib/constants";

function parse(formData: FormData) {
  const isPublished = formData.get("is_published") === "on";
  const existingPublishedAt = (formData.get("published_at") as string) || null;
  const faqs = parseFaqsText(String(formData.get("faqs") ?? ""));

  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    body: String(formData.get("body") ?? ""),
    cover_image_path: (formData.get("cover_image_path") as string) || null,
    read_time_minutes: formData.get("read_time_minutes")
      ? Number(formData.get("read_time_minutes"))
      : null,
    category: (formData.get("category") as string)?.trim() || null,
    faqs: faqs.length > 0 ? faqs : null,
    is_published: isPublished,
    // First time a post is published, stamp published_at with now(); once
    // set, keep it stable across later edits (including unpublishing).
    published_at: isPublished ? (existingPublishedAt ?? new Date().toISOString()) : existingPublishedAt,
  };
}

// Runs the "something just went live" side effects: nudge IndexNow, and
// cross-post to dev.to exactly once per post (checked via devto_url, so
// editing an already-cross-posted post never creates a duplicate there).
// Best-effort throughout — a failure here must never surface as an error on
// what is otherwise a successfully saved post.
async function afterPublish(slug: string, data: ReturnType<typeof parse>) {
  if (!data.is_published) return;

  const url = `${SITE_URL}/blog/${slug}`;
  void pingIndexNow(url);
  void requestGoogleIndexing(url);

  try {
    const supabase = await createClient();
    const { data: row } = await supabase
      .from("blog_posts")
      .select("devto_url")
      .eq("slug", slug)
      .maybeSingle();
    if (row?.devto_url) return; // already cross-posted, never repost on edit

    const coverImageUrl = getMediaUrl(data.cover_image_path);
    const tags = ["programming", "softwareengineering", ...(data.category ? [] : ["beginners"])];

    const devtoUrl = await crossPostToDevTo({
      title: data.title,
      bodyMarkdown: data.body,
      canonicalUrl: url,
      coverImageUrl,
      tags,
    });

    if (devtoUrl) {
      await supabase.from("blog_posts").update({ devto_url: devtoUrl }).eq("slug", slug);
    }
  } catch {
    // Cross-posting is a nice-to-have layered on top of a publish that
    // already succeeded — never let it block or error the admin action.
  }
}

export async function createBlogPost(formData: FormData) {
  const data = parse(formData);
  await insertRow("blog_posts", data);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/rss.xml");
  await afterPublish(data.slug, data);
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  const data = parse(formData);
  await updateRow("blog_posts", id, data);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/rss.xml");
  await afterPublish(data.slug, data);
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  await deleteRow("blog_posts", id);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
}
