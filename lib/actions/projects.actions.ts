"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { insertRow, updateRow, deleteRow } from "@/lib/admin/crud-helpers";

function parse(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    year: Number(formData.get("year") || new Date().getFullYear()),
    summary: String(formData.get("summary") ?? "").trim(),
    content: (formData.get("content") as string) || null,
    cover_image_path: (formData.get("cover_image_path") as string) || null,
    project_url: (formData.get("project_url") as string) || null,
    repo_url: (formData.get("repo_url") as string) || null,
    is_published: formData.get("is_published") === "on",
    sort_order: Number(formData.get("sort_order") || 0),
  };
}

export async function createProject(formData: FormData) {
  await insertRow("projects", parse(formData));
  revalidatePath("/admin/projects");
  revalidatePath("/work");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await updateRow("projects", id, parse(formData));
  revalidatePath("/admin/projects");
  revalidatePath("/work");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await deleteRow("projects", id);
  revalidatePath("/admin/projects");
  revalidatePath("/work");
  revalidatePath("/");
}
