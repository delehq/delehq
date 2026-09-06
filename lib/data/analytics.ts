import { createClient } from "@/lib/supabase/server";

const DAY_MS = 24 * 60 * 60 * 1000;

// page_views.country stores a raw ISO code (e.g. "NG"), not a display name —
// this turns "NG" into "Nigeria" using the browser/Node built-in, no dataset
// or dependency needed.
const countryNames = new Intl.DisplayNames(["en"], { type: "region" });
function countryLabel(code: string) {
  if (code === "Unknown") return code;
  try {
    return countryNames.of(code) ?? code;
  } catch {
    return code;
  }
}

export async function getAnalyticsSummary() {
  const supabase = await createClient();

  const since7 = new Date(Date.now() - 7 * DAY_MS).toISOString();
  const since30 = new Date(Date.now() - 30 * DAY_MS).toISOString();

  const [totalRes, last7Res, last30Res, countryRes] = await Promise.all([
    supabase.from("page_views").select("*", { count: "exact", head: true }),
    supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .gte("created_at", since7),
    supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .gte("created_at", since30),
    supabase.from("page_views").select("country").gte("created_at", since30),
  ]);

  const countryCounts = new Map<string, number>();
  for (const row of countryRes.data ?? []) {
    const key = row.country ?? "Unknown";
    countryCounts.set(key, (countryCounts.get(key) ?? 0) + 1);
  }

  const topCountries = [...countryCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([country, count]) => ({ country: countryLabel(country), count }));

  return {
    total: totalRes.count ?? 0,
    last7Days: last7Res.count ?? 0,
    last30Days: last30Res.count ?? 0,
    topCountries,
  };
}
