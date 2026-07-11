import { createClient } from "@/lib/supabase/server";

export async function getExperience() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("experience")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}
