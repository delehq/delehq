"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { insertRow, updateRow, deleteRow } from "@/lib/admin/crud-helpers";

function parse(formData: FormData) {
  return {
    category: String(formData.get("category") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") || 0),
  };
}

export async function createSkill(formData: FormData) {
  await insertRow("skills", parse(formData));
  revalidatePath("/admin/skills");
  revalidatePath("/");
  redirect("/admin/skills");
}

export async function updateSkill(id: string, formData: FormData) {
  await updateRow("skills", id, parse(formData));
  revalidatePath("/admin/skills");
  revalidatePath("/");
  redirect("/admin/skills");
}

export async function deleteSkill(id: string) {
  await deleteRow("skills", id);
  revalidatePath("/admin/skills");
  revalidatePath("/");
}
