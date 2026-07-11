"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";

export async function markSubmissionRead(id: string) {
  await requireAdminSession();
  const supabase = await createClient();
  await supabase.from("contact_submissions").update({ is_read: true }).eq("id", id);
  revalidatePath("/admin/submissions");
}

export async function deleteSubmission(id: string) {
  await requireAdminSession();
  const supabase = await createClient();
  await supabase.from("contact_submissions").delete().eq("id", id);
  revalidatePath("/admin/submissions");
}
