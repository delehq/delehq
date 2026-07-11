import { createClient } from "@/lib/supabase/server";
import { PROFILE_ID } from "@/lib/constants";

export async function getProfile() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profile")
    .select("*")
    .eq("id", PROFILE_ID)
    .maybeSingle();
  return data;
}
