import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/dal";
import type { Database } from "@/types/database.types";

type TableName = keyof Database["public"]["Tables"];

// Thin, generic wrappers shared by every resource's server actions. Each
// resource still declares its own explicit "use server" action functions
// (see lib/actions/*.actions.ts) — only the Supabase call + auth check is
// centralized here, so Next's server-action compiler sees plain, static
// exports rather than a dynamically generated factory.
export async function insertRow(table: TableName, data: Record<string, unknown>) {
  await requireAdminSession();
  const supabase = await createClient();
  const { error } = await supabase.from(table).insert(data as never);
  if (error) throw new Error(error.message);
}

export async function updateRow(
  table: TableName,
  id: string,
  data: Record<string, unknown>,
) {
  await requireAdminSession();
  const supabase = await createClient();
  const { error } = await supabase.from(table).update(data as never).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteRow(table: TableName, id: string) {
  await requireAdminSession();
  const supabase = await createClient();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw new Error(error.message);
}
