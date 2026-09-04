-- Lightweight, privacy-conscious visitor analytics. One row per public page
-- view. country/region/city come from Vercel's edge geolocation headers
-- (x-vercel-ip-*) at request time — no IP address is ever read or stored,
-- only the coarse location Vercel already resolves it to.
--
-- Written from proxy.ts (via lib/supabase/proxy.ts) on every qualifying
-- public GET request. Read from /admin/analytics.

create table page_views (
  id bigint generated always as identity primary key,
  path text not null,
  country text,
  region text,
  city text,
  created_at timestamptz not null default now()
);

create index page_views_created_at_idx on page_views (created_at desc);

alter table page_views enable row level security;

-- Visitors are never authenticated, so logging a view has to be allowed for
-- anon. Nothing sensitive is in the row (no IP, no cookie/session id), so
-- this is safe to leave open.
create policy "anyone can log a page view"
  on page_views for insert
  to anon, authenticated
  with check (true);

create policy "authenticated can read page views"
  on page_views for select
  to authenticated
  using (true);
