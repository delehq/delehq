import { createClient } from "@/lib/supabase/server";

export async function getServices() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}
