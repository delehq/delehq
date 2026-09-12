-- Adds an optional FAQ section to blog posts: a small array of
-- {question, answer} pairs, rendered as a visible FAQ block on the post page
-- and as FAQPage JSON-LD alongside the existing Article schema. Nullable —
-- posts without any FAQs simply don't render the section.

alter table blog_posts
  add column if not exists faqs jsonb;
