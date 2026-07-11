import { createClient } from "@/lib/supabase/server";

export async function getPublishedProjects(limit?: number) {
  const supabase = await createClient();
  let query = supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  if (limit) query = query.limit(limit);
  const { data } = await query;
  return data ?? [];
}

export async function getProjectBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  return data;
}

export async function getRelatedProjects(excludeId: string, limit = 2) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .neq("id", excludeId)
    .order("sort_order", { ascending: true })
    .limit(limit);
  return data ?? [];
}
