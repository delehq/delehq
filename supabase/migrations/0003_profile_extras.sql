-- Adds two profile columns that were previously hardcoded in components:
--   - resume_path: storage path to a CV/resume PDF, powers the "Download CV" button
--   - footer_headline: the big statement in the footer (was hardcoded as
--     "Building Systems That Scale." in app/(site)/layout.tsx). Nullable —
--     app/(site)/layout.tsx falls back to the hardcoded copy when unset, so
--     the admin field isn't forced to be filled in.

alter table profile
  add column if not exists resume_path text,
  add column if not exists footer_headline text;
