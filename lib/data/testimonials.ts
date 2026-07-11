import { createClient } from "@/lib/supabase/server";

export async function getPublishedTestimonials() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
}
