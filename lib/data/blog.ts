import { createClient } from "@/lib/supabase/server";

export async function getPublishedPosts(limit?: number) {
  const supabase = await createClient();
  let query = supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });
  if (limit) query = query.limit(limit);
  const { data } = await query;
  return data ?? [];
}

export async function getPostBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  return data;
}

export async function getRelatedPosts(excludeId: string, limit = 3) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .neq("id", excludeId)
    .order("published_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}

// Blog nav link / home preview both hide when there's nothing published yet.
export async function hasPublishedPosts() {
  const supabase = await createClient();
  const { count } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact", head: true })
    .eq("is_published", true);
  return (count ?? 0) > 0;
}
