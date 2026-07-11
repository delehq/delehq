import { createClient } from "@/lib/supabase/server";

export async function getEducation() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("education")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}
