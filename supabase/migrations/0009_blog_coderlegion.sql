-- Tracks whether a post has already been cross-posted to CoderLegion, and
-- where — same reasoning as devto_url (see 0007_blog_devto.sql): without
-- this, every edit/republish would create a duplicate post there instead of
-- skipping it.

alter table blog_posts
  add column if not exists coderlegion_url text;
