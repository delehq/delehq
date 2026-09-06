import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";

// Technical/metadata endpoints — not something a visitor actually "views",
// so these don't count as page views.
const EXCLUDED_PATHS = new Set([
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
  "/opengraph-image",
  "/icon",
  "/apple-icon",
]);

function shouldLogPageView(request: NextRequest) {
  if (request.method !== "GET") return false;
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/admin")) return false;
  return !EXCLUDED_PATHS.has(pathname);
}

// Refreshes the Supabase session cookie on every request and performs an
// optimistic auth check on /admin routes. This is NOT the security boundary
// by itself — every admin server action and app/admin/layout.tsx re-verify
// the session server-side (see lib/auth/dal.ts). Proxy just avoids serving
// a flash of the admin shell to a logged-out visitor.
//
// It also logs a lightweight, privacy-conscious page view (path + coarse
// location) for /admin/analytics — done via event.waitUntil so it never adds
// latency to the actual page response. The IP address itself is used only
// in-memory to resolve that location and is never written to the database.
export async function updateSession(request: NextRequest, event: NextFetchEvent) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname === "/admin/login";

  if (isAdminRoute && !isLoginRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  if (isLoginRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  if (shouldLogPageView(request)) {
    event.waitUntil(
      (async () => {
        try {
          const geo = await resolveVisitorGeo(request);
          await supabase.from("page_views").insert({
            path: pathname,
            country: geo.country,
            region: geo.region,
            city: geo.city,
          });
        } catch {
          // Analytics logging must never surface as a request failure.
        }
      })(),
    );
  }

  return supabaseResponse;
}

type VisitorGeo = { country: string | null; region: string | null; city: string | null };

// The domain is proxied through Cloudflare (for its bot/WAF protection) in
// front of Vercel, so Vercel's own x-vercel-ip-* headers geolocate
// Cloudflare's edge server, not the visitor. Cloudflare forwards the real
// visitor IP in cf-connecting-ip on every plan (unlike its precomputed
// city/region headers, which need Enterprise), so we resolve location from
// that IP ourselves via a free lookup. The IP is only ever held in memory for
// this one lookup — never logged, never written to page_views.
async function resolveVisitorGeo(request: NextRequest): Promise<VisitorGeo> {
  const fallbackCountry = request.headers.get("cf-ipcountry") ?? request.headers.get("x-vercel-ip-country");
  const ip = request.headers.get("cf-connecting-ip");
  if (!ip) return { country: fallbackCountry, region: null, city: null };

  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,countryCode,regionName,city`, {
      signal: AbortSignal.timeout(2000),
    });
    if (!res.ok) return { country: fallbackCountry, region: null, city: null };
    const data = await res.json();
    if (data.status !== "success") return { country: fallbackCountry, region: null, city: null };
    return {
      country: data.countryCode ?? fallbackCountry,
      region: data.regionName ?? null,
      city: data.city ?? null,
    };
  } catch {
    // ip-api down, rate-limited, or timed out — degrade to country only.
    return { country: fallbackCountry, region: null, city: null };
  }
}
