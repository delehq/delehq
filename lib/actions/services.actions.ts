"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { insertRow, updateRow, deleteRow } from "@/lib/admin/crud-helpers";

function parse(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    icon: (formData.get("icon") as string) || null,
    sort_order: Number(formData.get("sort_order") || 0),
  };
}

export async function createService(formData: FormData) {
  await insertRow("services", parse(formData));
  revalidatePath("/admin/services");
  revalidatePath("/");
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  await updateRow("services", id, parse(formData));
  revalidatePath("/admin/services");
  revalidatePath("/");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await deleteRow("services", id);
  revalidatePath("/admin/services");
  revalidatePath("/");
}
