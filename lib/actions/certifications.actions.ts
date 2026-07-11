"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { insertRow, updateRow, deleteRow } from "@/lib/admin/crud-helpers";

function parse(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    issuer: String(formData.get("issuer") ?? "").trim(),
    issue_date: (formData.get("issue_date") as string) || null,
    credential_url: (formData.get("credential_url") as string) || null,
    sort_order: Number(formData.get("sort_order") || 0),
  };
}

export async function createCertification(formData: FormData) {
  await insertRow("certifications", parse(formData));
  revalidatePath("/admin/certifications");
  revalidatePath("/");
  redirect("/admin/certifications");
}

export async function updateCertification(id: string, formData: FormData) {
  await updateRow("certifications", id, parse(formData));
  revalidatePath("/admin/certifications");
  revalidatePath("/");
  redirect("/admin/certifications");
}

export async function deleteCertification(id: string) {
  await deleteRow("certifications", id);
  revalidatePath("/admin/certifications");
  revalidatePath("/");
}
