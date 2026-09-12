"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { insertRow, updateRow, deleteRow } from "@/lib/admin/crud-helpers";
import { parseFaqsText } from "@/lib/faq";

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
    faqs: faqs.length > 0 ? faqs : null,
    is_published: isPublished,
    // First time a post is published, stamp published_at with now(); once
    // set, keep it stable across later edits (including unpublishing).
    published_at: isPublished ? (existingPublishedAt ?? new Date().toISOString()) : existingPublishedAt,
  };
}

export async function createBlogPost(formData: FormData) {
  await insertRow("blog_posts", parse(formData));
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  await updateRow("blog_posts", id, parse(formData));
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  await deleteRow("blog_posts", id);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
}
