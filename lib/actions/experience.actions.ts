"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { insertRow, updateRow, deleteRow } from "@/lib/admin/crud-helpers";

function parse(formData: FormData) {
  return {
    company: String(formData.get("company") ?? "").trim(),
    role: String(formData.get("role") ?? "").trim(),
    location: (formData.get("location") as string) || null,
    start_date: String(formData.get("start_date") ?? ""),
    end_date: (formData.get("end_date") as string) || null,
    description: (formData.get("description") as string) || null,
    sort_order: Number(formData.get("sort_order") || 0),
  };
}

export async function createExperience(formData: FormData) {
  await insertRow("experience", parse(formData));
  revalidatePath("/admin/experience");
  revalidatePath("/");
  redirect("/admin/experience");
}

export async function updateExperience(id: string, formData: FormData) {
  await updateRow("experience", id, parse(formData));
  revalidatePath("/admin/experience");
  revalidatePath("/");
  redirect("/admin/experience");
}

export async function deleteExperience(id: string) {
  await deleteRow("experience", id);
  revalidatePath("/admin/experience");
  revalidatePath("/");
}
