-- Free-text category label for blog posts, same pattern as projects.category
-- (a short descriptive tag per post, not a fixed enum). Nullable — posts
-- without one just don't show a category tag.

alter table blog_posts
  add column if not exists category text;
