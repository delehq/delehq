-- Seed data drawn from Ayodele John's resume.
-- Placeholders (marked below) should be filled in via /admin once the site is live:
--   - profile.contact_email: best-known address, confirm it's the one you want public
--   - profile.resume_path: no CV uploaded yet — "Download CV" stays inert until you add one
--   - projects.year: resume doesn't date individual projects; years below are estimates
--   - projects.cover_image_path / project_url / repo_url: none uploaded yet, cards fall
--     back to a gradient placeholder in the UI until you add these
--   - testimonials / blog_posts: seeded with ONE placeholder row each so the sections
--     aren't empty — edit or delete both from /admin once you have real content

-- ---------------------------------------------------------------------------
-- profile
-- ---------------------------------------------------------------------------
insert into profile (id, full_name, tagline, bio, location, contact_email, social_links, footer_headline)
values (
  '00000000-0000-0000-0000-000000000001',
  'Ayodele John',
  'SOFTWARE ENGINEER',
  E'I''m Ayodele, a software engineer based in Nigeria, building production-grade backend systems and full-stack products end-to-end.\n\nI work across NestJS and TypeScript backends, PostgreSQL/MongoDB data layers, and React, Next.js, and React Native interfaces.\n\nOver the past few years I''ve shipped fintech systems handling multi-currency payments and payouts, and led UI/UX direction for client-facing platforms.',
  'Lagos, Nigeria',
  'john.ayo.jam@gmail.com',
  '[
    {"platform": "x", "url": "https://x.com/jcode_Code"},
    {"platform": "instagram", "url": "https://www.instagram.com/jirovahq/"},
    {"platform": "linkedin", "url": "https://www.linkedin.com/in/john-ayodele-dev/"}
  ]'::jsonb,
  'Building Systems That Scale.'
)
on conflict (id) do update set
  full_name = excluded.full_name,
  tagline = excluded.tagline,
  bio = excluded.bio,
  location = excluded.location,
  contact_email = excluded.contact_email,
  social_links = excluded.social_links,
  footer_headline = excluded.footer_headline;

-- ---------------------------------------------------------------------------
-- experience
-- ---------------------------------------------------------------------------
insert into experience (company, role, location, start_date, end_date, description, sort_order) values
(
  'Sonaroid',
  'Lead Backend Engineer',
  'Lagos, Nigeria',
  '2026-01-01',
  null,
  E'- Architected and deployed a recommendation algorithm inspired by Netflix and Instagram''s discovery models, increasing user session duration by 30%.\n- Designed and built a multi-currency subscription and payments platform in NestJS and TypeScript, with location-based pricing, VAT computation, and exchange-rate locking to protect against FX volatility.\n- Integrated Paystack and Flutterwave with auto-renewal via saved card authorizations.\n- Built UI components for the companion React Native app, wiring screens to REST/GraphQL APIs for subscriptions, payments, and payouts.\n- Engineered a creator earnings ledger with per-event payout multipliers and available-balance accounting, plus an auditable NEW → PROCESSING → APPROVED → PAID_OUT withdrawal workflow.\n- Independently managed cloud infrastructure, CI/CD, and security for production delivery.',
  1
),
(
  'ToksNet Africa',
  'Software Engineer',
  'Abuja, Nigeria',
  '2024-06-01',
  '2025-12-01',
  E'- Spearheaded an ML-powered recommendation engine, increasing engagement 10% and reducing churn 20% within six months.\n- Led migration from monolith to microservices using Kubernetes and Docker, improving performance 15% and cutting deployment time 25%.\n- Led a team of 3 developers implementing AI-driven security protocols, reducing vulnerabilities 15%.\n- Owned cloud infrastructure, CI/CD, and release processes.',
  2
);

-- ---------------------------------------------------------------------------
-- education
-- ---------------------------------------------------------------------------
insert into education (institution, credential, start_date, end_date, sort_order) values
('University of Benin, Nigeria', 'B.Sc. Biology', null, '2021-12-01', 1),
('Xoft Tech Academy, Nigeria', 'Diploma in Computer Science', null, '2020-08-01', 2);

-- ---------------------------------------------------------------------------
-- certifications
-- ---------------------------------------------------------------------------
insert into certifications (name, issuer, issue_date, sort_order) values
('AWS Certified Developer – Associate', 'Amazon Web Services', '2024-01-01', 1),
('Google Associate Cloud Engineer', 'Google Cloud', '2023-01-01', 2),
('Certified Scrum Master (CSM)', 'Scrum Alliance', '2023-01-01', 3);

-- ---------------------------------------------------------------------------
-- skills
-- ---------------------------------------------------------------------------
insert into skills (category, name, sort_order) values
('Languages & Frameworks', 'JavaScript (ES6+)', 1),
('Languages & Frameworks', 'TypeScript', 2),
('Languages & Frameworks', 'Node.js', 3),
('Languages & Frameworks', 'NestJS', 4),
('Languages & Frameworks', 'Python', 5),
('Languages & Frameworks', 'PHP', 6),
('Frontend', 'React.js', 1),
('Frontend', 'Next.js', 2),
('Frontend', 'React Native', 3),
('Frontend', 'Responsive UI Development', 4),
('Frontend', 'REST/GraphQL Integration', 5),
('Payments & Fintech', 'Paystack', 1),
('Payments & Fintech', 'Flutterwave', 2),
('Payments & Fintech', 'Multi-currency Billing', 3),
('Payments & Fintech', 'Subscriptions', 4),
('Payments & Fintech', 'VAT Computation', 5),
('Payments & Fintech', 'FX Rate Locking', 6),
('Payments & Fintech', 'Earnings Ledgers & Payouts', 7),
('Architecture & APIs', 'Microservices', 1),
('Architecture & APIs', 'GraphQL', 2),
('Architecture & APIs', 'REST', 3),
('Architecture & APIs', 'WebSockets', 4),
('Databases & Messaging', 'PostgreSQL', 1),
('Databases & Messaging', 'MySQL', 2),
('Databases & Messaging', 'MongoDB', 3),
('Databases & Messaging', 'Redis', 4),
('Databases & Messaging', 'RabbitMQ', 5),
('Cloud & DevOps', 'AWS (EC2, S3, Lambda)', 1),
('Cloud & DevOps', 'Azure', 2),
('Cloud & DevOps', 'Docker', 3),
('Cloud & DevOps', 'Kubernetes', 4),
('Cloud & DevOps', 'CI/CD (GitHub Actions, GitLab CI)', 5),
('AI & Data', 'ML-powered Recommendations', 1),
('AI & Data', 'AI API Integrations', 2),
('AI & Data', 'Data-driven System Design', 3);

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
insert into projects (slug, title, category, year, summary, content, project_url, is_published, sort_order) values
(
  'zetabrent-education',
  'Zetabrent Education',
  'Study Abroad Platform',
  2025,
  'International study-abroad and agency-operations platform — backend services and React-based frontend, with modular architecture and consistent UX across the public site and agency portal.',
  E'## Role\nLead Full Stack Engineer\n\n## Overview\nDirected end-to-end development of zetabrenteducation.com, building both the backend services and the React-based frontend with a focus on modular architecture, responsive UI, and consistent UX across the public site and agency-facing portal.',
  'https://zetabrenteducation.com',
  true,
  1
),
(
  'zephlo-erp',
  'Zephlo ERP System',
  'ERP / Personal Project',
  2025,
  'Full-stack ERP demo built from the ground up: a guided multi-step onboarding flow and core business modules on React/Next.js, backed by a Node.js/NestJS API.',
  E'## Role\nFull Stack Developer (Personal Project)\n\n## Overview\nIndependently designed and built a full-stack ERP demo showcasing end-to-end product, backend, and UI ownership — a guided multi-step onboarding flow and core business modules on a React/Next.js frontend backed by a Node.js/NestJS API.',
  null,
  true,
  2
),
(
  'sehembz-travels',
  'SEHEMBZ Travels',
  'Travel Booking Platform',
  2024,
  'Travel-booking platform spanning flights, hotel reservations, visa assistance, private jet charter, and curated tours — led project management and UI/UX direction from concept through delivery.',
  E'## Role\nProject Manager & Design Lead\n\n## Overview\nLed end-to-end project management for sehembztravels.com, coordinating engineering and design workstreams and overseeing UI/UX design direction from concept through final delivery.',
  'https://sehembztravels.com',
  true,
  3
),
(
  'aedion',
  'AEDION',
  'Healthcare / OpenAI Integration',
  2025,
  'Secure, scalable healthcare platform integrating OpenAI capabilities — led backend architecture, cloud engineering, and DevOps.',
  E'## Role\nLead Backend Engineer\n\n## Overview\nLed backend architecture, cloud engineering, and DevOps for a secure, scalable healthcare platform integrating OpenAI capabilities.',
  null,
  true,
  4
),
(
  'aeropulse',
  'Aeropulse',
  'Document Management',
  2024,
  'Microservices-based document management system for an aviation school, enabling secure file sharing and streamlined approvals.',
  E'## Role\nLead Backend Engineer\n\n## Overview\nBuilt a microservices-based document management system for an aviation school enabling secure file sharing and streamlined approvals.',
  null,
  true,
  5
),
(
  'gv3n',
  'GV3N',
  'Blockchain',
  2023,
  'Telegram-based mining app integrated with an e-commerce marketplace leveraging blockchain components.',
  E'## Role\nLead Backend Engineer\n\n## Overview\nOversaw a Telegram-based mining app integrated with an e-commerce marketplace leveraging blockchain components.',
  null,
  true,
  6
);

-- ---------------------------------------------------------------------------
-- services
-- ---------------------------------------------------------------------------
insert into services (title, description, sort_order) values
(
  'Backend & API Engineering',
  'NestJS and TypeScript services, REST/GraphQL APIs, and microservices architecture built to scale.',
  1
),
(
  'Fintech & Payments Systems',
  'Multi-currency billing, subscriptions, payment gateway integrations, and earnings/payout ledgers.',
  2
),
(
  'Cloud Infrastructure & DevOps',
  'AWS/Azure infrastructure, Docker and Kubernetes deployments, and CI/CD pipelines for reliable delivery.',
  3
),
(
  'Full-Stack Product Delivery',
  'React, Next.js, and React Native interfaces wired end-to-end to the backend that powers them.',
  4
),
(
  'AI Engineering',
  'ML-powered recommendation engines, AI API integrations, and data-driven system design built into production backends.',
  5
);

-- ---------------------------------------------------------------------------
-- testimonials (placeholder — replace/delete via /admin)
-- ---------------------------------------------------------------------------
insert into testimonials (author_name, author_role, author_company, quote, back_content, is_published, sort_order)
values (
  'Sample Client',
  'Product Lead',
  'Placeholder Co.',
  'Ayodele shipped a reliable, well-structured backend and communicated clearly at every step. Replace this with a real testimonial from /admin.',
  'This is placeholder content — edit or delete it from /admin → Testimonials once you have a real quote.',
  true,
  1
);

-- ---------------------------------------------------------------------------
-- blog_posts (placeholder — replace/delete via /admin)
-- ---------------------------------------------------------------------------
insert into blog_posts (slug, title, summary, body, read_time_minutes, published_at, is_published)
values (
  'locking-exchange-rates-multi-currency-billing',
  'Locking Exchange Rates for Multi-Currency Billing',
  'Placeholder post — edit or delete from /admin. Notes on protecting subscription revenue from FX volatility when billing across currencies.',
  E'## The problem\n\nWhen a subscription platform bills in multiple currencies, the price a customer agreed to and the amount you actually collect can drift apart between checkout and settlement — pure FX volatility risk with no product change involved.\n\n## Locking the rate\n\nThe fix is to snapshot the exchange rate at the moment of checkout and store it alongside the invoice, rather than re-resolving it at charge time. Renewals re-lock against the latest rate on a fixed cadence instead of drifting silently.\n\n## Why it matters\n\nThis keeps pricing predictable for customers and protects margin from currency swings — a small architectural decision with an outsized effect on revenue integrity.\n\n---\n\n*This is placeholder content seeded to demonstrate the blog layout — replace or delete it from /admin → Blog.*',
  4,
  now(),
  true
);
