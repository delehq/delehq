"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { insertRow, updateRow, deleteRow } from "@/lib/admin/crud-helpers";

function parse(formData: FormData) {
  return {
    institution: String(formData.get("institution") ?? "").trim(),
    credential: String(formData.get("credential") ?? "").trim(),
    start_date: (formData.get("start_date") as string) || null,
    end_date: (formData.get("end_date") as string) || null,
    description: (formData.get("description") as string) || null,
    sort_order: Number(formData.get("sort_order") || 0),
  };
}

export async function createEducation(formData: FormData) {
  await insertRow("education", parse(formData));
  revalidatePath("/admin/education");
  revalidatePath("/");
  redirect("/admin/education");
}

export async function updateEducation(id: string, formData: FormData) {
  await updateRow("education", id, parse(formData));
  revalidatePath("/admin/education");
  revalidatePath("/");
  redirect("/admin/education");
}

export async function deleteEducation(id: string) {
  await deleteRow("education", id);
  revalidatePath("/admin/education");
  revalidatePath("/");
}
