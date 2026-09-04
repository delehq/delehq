// Fixed row id for the singleton `profile` table — must match
// supabase/migrations/0002_seed.sql and any admin code that upserts it.
export const PROFILE_ID = "00000000-0000-0000-0000-000000000001";

// Canonical production origin, used for metadataBase, sitemap.xml, and
// JSON-LD absolute URLs. Must be the "www" host — deledev.com (apex) 308s to
// www.deledev.com at the DNS/hosting layer, so the apex is never the final
// URL a crawler lands on. Override via NEXT_PUBLIC_SITE_URL if the domain
// changes (also update NEXT_PUBLIC_SITE_URL in the Vercel project settings —
// this fallback only covers local dev).
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.deledev.com";
