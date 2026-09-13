-- Tracks whether a post has already been cross-posted to dev.to, and where.
-- Without this, every edit/republish would create a duplicate dev.to article
-- instead of updating or skipping the existing one.

alter table blog_posts
  add column if not exists devto_url text;
