-- Just the referrer's hostname (e.g. "chatgpt.com"), not the full URL —
-- enough to classify traffic source without storing paths/query strings
-- from whatever site sent the visitor here. Powers the "AI referral
-- traffic" breakdown on the admin dashboard.

alter table page_views
  add column if not exists referrer_host text;
