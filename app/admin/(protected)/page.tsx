import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getAnalyticsSummary } from "@/lib/data/analytics";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const [unreadRes, projectsRes, postsRes, analytics] = await Promise.all([
    supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false),
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    getAnalyticsSummary(),
  ]);
  const maxCountryCount = analytics.topCountries[0]?.count ?? 0;

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

      <div>
        <h2 className="mb-3 text-[16px] font-semibold">Site visits</h2>
        <p className="mb-4 text-[13px] text-black/50">
          Tracked by page view (not by visitor), with a coarse country/city resolved
          from each request&apos;s IP via a lookup service. The IP itself is never
          stored — no IP addresses or cookies are recorded.
        </p>
        <div className="grid grid-cols-1 gap-4 tablet:grid-cols-3">
          <StatCard label="All-time views" value={analytics.total} />
          <StatCard label="Last 7 days" value={analytics.last7Days} />
          <StatCard label="Last 30 days" value={analytics.last30Days} />
        </div>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-5">
        <h2 className="text-[16px] font-semibold">Top countries (last 30 days)</h2>
        {analytics.topCountries.length === 0 ? (
          <p className="mt-3 text-[14px] text-black/50">
            No page views recorded yet. This fills in once the site is live and gets
            real traffic.
          </p>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {analytics.topCountries.map(({ country, count }) => (
              <li key={country} className="flex items-center gap-3">
                <span className="w-28 shrink-0 truncate text-[14px] text-black/70">
                  {country}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/5">
                  <div
                    className="h-full rounded-full bg-black"
                    style={{
                      width: `${maxCountryCount > 0 ? (count / maxCountryCount) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right text-[14px] tabular-nums text-black/50">
                  {count}
                </span>
              </li>
            ))}
          </ul>
        )}
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
  href?: string;
}) {
  const content = (
    <>
      <span className="text-[13px] text-black/50">{label}</span>
      <span className="text-[32px] font-semibold">{value.toLocaleString()}</span>
    </>
  );

  if (!href) {
    return (
      <div className="flex flex-col gap-1 rounded-2xl border border-black/10 bg-white p-5">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="flex flex-col gap-1 rounded-2xl border border-black/10 bg-white p-5 transition-colors hover:border-black/20"
    >
      {content}
    </Link>
  );
}
