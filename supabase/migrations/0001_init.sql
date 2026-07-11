-- Ayodele John portfolio — initial schema, RLS policies, storage bucket.
-- Apply with: supabase db push  (or paste into the Supabase SQL editor)

create extension if not exists "pgcrypto";

-- Shared trigger to keep updated_at current on every UPDATE.
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ---------------------------------------------------------------------------
-- profile (singleton)
-- ---------------------------------------------------------------------------
create table profile (
  id uuid primary key,
  full_name text not null,
  tagline text not null,
  bio text not null,
  headshot_path text,
  location text,
  contact_email text,
  social_links jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create trigger profile_set_updated_at
  before update on profile
  for each row execute function set_updated_at();

alter table profile enable row level security;

create policy "public can read profile"
  on profile for select
  to anon, authenticated
  using (true);

create policy "authenticated can manage profile"
  on profile for all
  to authenticated
  using (true) with check (true);

-- ---------------------------------------------------------------------------
-- experience
-- ---------------------------------------------------------------------------
create table experience (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role text not null,
  location text,
  start_date date not null,
  end_date date,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger experience_set_updated_at
  before update on experience
  for each row execute function set_updated_at();

alter table experience enable row level security;

create policy "public can read experience"
  on experience for select
  to anon, authenticated
  using (true);

create policy "authenticated can manage experience"
  on experience for all
  to authenticated
  using (true) with check (true);

-- ---------------------------------------------------------------------------
-- education
-- ---------------------------------------------------------------------------
create table education (
  id uuid primary key default gen_random_uuid(),
  institution text not null,
  credential text not null,
  start_date date,
  end_date date,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger education_set_updated_at
  before update on education
  for each row execute function set_updated_at();

alter table education enable row level security;

create policy "public can read education"
  on education for select
  to anon, authenticated
  using (true);

create policy "authenticated can manage education"
  on education for all
  to authenticated
  using (true) with check (true);

-- ---------------------------------------------------------------------------
-- certifications
-- ---------------------------------------------------------------------------
create table certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  issuer text not null,
  issue_date date,
  credential_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger certifications_set_updated_at
  before update on certifications
  for each row execute function set_updated_at();

alter table certifications enable row level security;

create policy "public can read certifications"
  on certifications for select
  to anon, authenticated
  using (true);

create policy "authenticated can manage certifications"
  on certifications for all
  to authenticated
  using (true) with check (true);

-- ---------------------------------------------------------------------------
-- skills
-- ---------------------------------------------------------------------------
create table skills (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index skills_category_idx on skills (category, sort_order);

create trigger skills_set_updated_at
  before update on skills
  for each row execute function set_updated_at();

alter table skills enable row level security;

create policy "public can read skills"
  on skills for select
  to anon, authenticated
  using (true);

create policy "authenticated can manage skills"
  on skills for all
  to authenticated
  using (true) with check (true);

-- ---------------------------------------------------------------------------
-- services
-- ---------------------------------------------------------------------------
create table services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  icon text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger services_set_updated_at
  before update on services
  for each row execute function set_updated_at();

alter table services enable row level security;

create policy "public can read services"
  on services for select
  to anon, authenticated
  using (true);

create policy "authenticated can manage services"
  on services for all
  to authenticated
  using (true) with check (true);

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
create table projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  year int not null,
  summary text not null,
  content text,
  cover_image_path text,
  project_url text,
  repo_url text,
  is_published boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index projects_published_idx on projects (is_published, sort_order);

create trigger projects_set_updated_at
  before update on projects
  for each row execute function set_updated_at();

alter table projects enable row level security;

create policy "public can read published projects"
  on projects for select
  to anon, authenticated
  using (is_published = true);

create policy "authenticated can read all projects"
  on projects for select
  to authenticated
  using (true);

create policy "authenticated can manage projects"
  on projects for insert
  to authenticated
  with check (true);

create policy "authenticated can update projects"
  on projects for update
  to authenticated
  using (true) with check (true);

create policy "authenticated can delete projects"
  on projects for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- blog_posts
-- ---------------------------------------------------------------------------
create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null,
  body text not null,
  cover_image_path text,
  read_time_minutes int,
  published_at timestamptz,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index blog_posts_published_idx on blog_posts (is_published, published_at desc);

create trigger blog_posts_set_updated_at
  before update on blog_posts
  for each row execute function set_updated_at();

alter table blog_posts enable row level security;

create policy "public can read published blog_posts"
  on blog_posts for select
  to anon, authenticated
  using (is_published = true);

create policy "authenticated can read all blog_posts"
  on blog_posts for select
  to authenticated
  using (true);

create policy "authenticated can insert blog_posts"
  on blog_posts for insert
  to authenticated
  with check (true);

create policy "authenticated can update blog_posts"
  on blog_posts for update
  to authenticated
  using (true) with check (true);

create policy "authenticated can delete blog_posts"
  on blog_posts for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- testimonials
-- ---------------------------------------------------------------------------
create table testimonials (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  author_role text,
  author_company text,
  quote text not null,
  back_content text,
  avatar_path text,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger testimonials_set_updated_at
  before update on testimonials
  for each row execute function set_updated_at();

alter table testimonials enable row level security;

create policy "public can read published testimonials"
  on testimonials for select
  to anon, authenticated
  using (is_published = true);

create policy "authenticated can read all testimonials"
  on testimonials for select
  to authenticated
  using (true);

create policy "authenticated can insert testimonials"
  on testimonials for insert
  to authenticated
  with check (true);

create policy "authenticated can update testimonials"
  on testimonials for update
  to authenticated
  using (true) with check (true);

create policy "authenticated can delete testimonials"
  on testimonials for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- contact_submissions (public insert-only, admin read/update)
-- ---------------------------------------------------------------------------
create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now(),
  is_read boolean not null default false
);

alter table contact_submissions enable row level security;

create policy "anyone can submit contact form"
  on contact_submissions for insert
  to anon, authenticated
  with check (true);

create policy "authenticated can read submissions"
  on contact_submissions for select
  to authenticated
  using (true);

create policy "authenticated can update submissions"
  on contact_submissions for update
  to authenticated
  using (true) with check (true);

create policy "authenticated can delete submissions"
  on contact_submissions for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- storage: single public "media" bucket, folder-prefixed
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

create policy "authenticated can upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

create policy "authenticated can update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media');

create policy "authenticated can delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');
