-- Adds two profile columns that were previously hardcoded in components:
--   - resume_path: storage path to a CV/resume PDF, powers the "Download CV" button
--   - footer_headline: the big statement in the footer (was hardcoded as
--     "Building Systems That Scale." in app/(site)/layout.tsx)

alter table profile
  add column if not exists resume_path text,
  add column if not exists footer_headline text not null default 'Building Systems That Scale.';
