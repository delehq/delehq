import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const [unreadRes, projectsRes, postsRes] = await Promise.all([
    supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false),
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[28px] font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-3">
        <StatCard
          label="Unread submissions"
          value={unreadRes.count ?? 0}
          href="/admin/submissions"
        />
        <StatCard label="Projects" value={projectsRes.count ?? 0} href="/admin/projects" />
        <StatCard label="Blog posts" value={postsRes.count ?? 0} href="/admin/blog" />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-1 rounded-2xl border border-black/10 bg-white p-5 transition-colors hover:border-black/20"
    >
      <span className="text-[13px] text-black/50">{label}</span>
      <span className="text-[32px] font-semibold">{value}</span>
    </Link>
  );
}
