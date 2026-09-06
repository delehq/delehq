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
// country) for /admin/analytics — done via event.waitUntil so it never adds
// latency to the actual page response. No IP address is ever read or stored.
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
          // The domain is proxied through Cloudflare (for its bot/WAF
          // protection) in front of Vercel, so Vercel's own x-vercel-ip-*
          // headers geolocate Cloudflare's edge server, not the visitor.
          // cf-ipcountry is Cloudflare's own edge-computed country for the
          // real visitor — the same source powering their dashboard's
          // "Requests by country" — and it's included on every plan, free
          // included. Region/city aren't: those precomputed headers need
          // Cloudflare Enterprise, so we don't attempt them here rather than
          // fake it with a wrong or third-party-sourced value.
          const country =
            request.headers.get("cf-ipcountry") ?? request.headers.get("x-vercel-ip-country");
          await supabase.from("page_views").insert({ path: pathname, country, region: null, city: null });
        } catch {
          // Analytics logging must never surface as a request failure.
        }
      })(),
    );
  }

  return supabaseResponse;
}
