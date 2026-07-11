"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { insertRow, updateRow, deleteRow } from "@/lib/admin/crud-helpers";

function parse(formData: FormData) {
  return {
    author_name: String(formData.get("author_name") ?? "").trim(),
    author_role: (formData.get("author_role") as string) || null,
    author_company: (formData.get("author_company") as string) || null,
    quote: String(formData.get("quote") ?? "").trim(),
    back_content: (formData.get("back_content") as string) || null,
    avatar_path: (formData.get("avatar_path") as string) || null,
    is_published: formData.get("is_published") === "on",
    sort_order: Number(formData.get("sort_order") || 0),
  };
}

export async function createTestimonial(formData: FormData) {
  await insertRow("testimonials", parse(formData));
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  await updateRow("testimonials", id, parse(formData));
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await deleteRow("testimonials", id);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
