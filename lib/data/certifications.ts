import { createClient } from "@/lib/supabase/server";

export async function getCertifications() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("certifications")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}
