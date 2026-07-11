import "server-only";
import { redirect } from "next/navigation";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

// The actual security boundary for /admin. proxy.ts only does an optimistic
// redirect; every admin page/server action must call this (directly or via
// app/admin/layout.tsx) before touching Supabase with write intent.
export const requireAdminSession = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
});
