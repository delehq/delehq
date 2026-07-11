import { createClient } from "@/lib/supabase/server";

export async function getSkillsGrouped() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("skills")
    .select("*")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  const groups = new Map<string, { id: string; name: string }[]>();
  for (const skill of data ?? []) {
    const list = groups.get(skill.category) ?? [];
    list.push({ id: skill.id, name: skill.name });
    groups.set(skill.category, list);
  }
  return Array.from(groups.entries()).map(([category, items]) => ({
    category,
    items,
  }));
}
