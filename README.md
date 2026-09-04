# Hey, I'm Ayodele 👋

Lead Backend Engineer at [Sonaroid](https://sonaroid.io/), based in Nigeria. I build production-grade platforms end-to-end — backend systems, fintech/payments infrastructure, cloud architecture, and the interfaces that ship them. Open to remote full-time roles and contract/consulting work.

📍 Nigeria &nbsp;·&nbsp; 🌍 Open to remote, worldwide &nbsp;·&nbsp; ✉️ [johnayodelemiracle@gmail.com](mailto:johnayodelemiracle@gmail.com)

[![Portfolio](https://img.shields.io/badge/Portfolio-deledev.com-111111?style=flat-square)](https://www.deledev.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-john--ayodele--dev-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/john-ayodele-dev/)
[![X](https://img.shields.io/badge/X-%40dele__dev-000000?style=flat-square&logo=x&logoColor=white)](https://x.com/dele_dev)

## What I work on

- **Backend & API Engineering** — NestJS, Node.js, TypeScript, REST, GraphQL, microservices
- **Fintech & Payments Systems** — multi-currency billing, Paystack/Flutterwave integration, FX-rate locking, earnings ledgers, withdrawal workflows
- **Cloud Infrastructure & DevOps** — AWS, Azure, Docker, Kubernetes, CI/CD (GitHub Actions, GitLab CI)
- **Full-Stack Product Delivery** — React, Next.js, React Native, end to end
- **AI Engineering** — LLM/OpenAI integration, recommendation systems

## Currently

Lead Backend Engineer at **[Sonaroid](https://sonaroid.io/)** (Jan 2026–present) — authentic data and insights into Africa's energy industry, delivered through a multi-currency subscription platform. Built the subscription and payments layer (NestJS, TypeScript, Paystack, Flutterwave), a recommendation engine (+30% session duration), and an auditable earnings/withdrawal ledger.

Previously: Software Engineer at ToksNet Africa — led a monolith-to-microservices migration on Kubernetes/Docker and an ML-powered recommendation engine.

## Featured projects

- **[Sonaroid](https://www.deledev.com/work/sonaroid)** — multi-currency subscription and payments platform with a recommendation engine
- **[Zetabrent Education](https://www.deledev.com/work/zetabrent-education)** — international study-abroad platform, backend + React frontend
- **[SEHEMBZ Travels](https://www.deledev.com/work/sehembz-travels)** — travel-booking platform
- **[AEDION](https://www.deledev.com/work/aedion)** — OpenAI-integrated healthcare platform
- **[Zephlo ERP](https://www.deledev.com/work/zephlo-erp)** — full-stack ERP demo (React/Next.js + NestJS)

## Certifications

AWS Certified Developer – Associate (2024) · Google Associate Cloud Engineer (2023) · Certified ScrumMaster (2023)

More at **[deledev.com](https://www.deledev.com)** — full write-ups, blog, and contact form.

---

## About this repository

This repo also hosts the source for [deledev.com](https://www.deledev.com) — a Next.js 16 (App Router) portfolio site with all content managed through Supabase, plus a full admin panel at `/admin` for editing everything without touching code.

### Stack

- Next.js 16, TypeScript, Tailwind CSS v4
- Supabase (Postgres + Auth + Storage) via `@supabase/ssr`
- `motion` for the scroll/reveal animation system, `lenis` for smooth scroll
- react-markdown for project/blog rich content

### 1. Create the Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL Editor, run the migration files in order:
   - `supabase/migrations/0001_init.sql` — schema, RLS policies, storage bucket
   - `supabase/migrations/0002_seed.sql` — your resume-derived content (projects, experience, skills, etc.)
   - `supabase/migrations/0003_profile_extras.sql` — resume/footer-headline columns
3. **Auth → Providers**: disable "Allow new users to sign up" (this app has no public sign-up flow — the admin account is created manually).
4. **Auth → Users → Add user**: create your own admin login (email + password, mark email confirmed). This is the only account that can sign in to `/admin`.
5. **Project Settings → API**: copy the Project URL and anon public key.

### 2. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in the values from step 1:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

### 3. Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin/login` to sign in with the admin account you created.

### 4. Finish the seeded content

The seed migration leaves a few placeholders — fill these in via `/admin`:

- **Profile → GitHub/LinkedIn URLs** (the resume PDF's links weren't machine-readable, so these seeded as empty)
- **Profile → Headshot** — upload `assets/WhatsApp Image 2026-04-06 at 11.20.06 PM.jpeg` (or any photo) via the image uploader
- **Projects → cover images** — each project shows a gradient placeholder until you upload a real screenshot
- **Projects → year** — the resume doesn't date individual projects; the seeded years are estimates
- Blog posts and testimonials start empty by design — those sections on the homepage auto-hide until you add at least one row

### Clash Grotesk font

The design uses Clash Grotesk for small decorative "/Label" text. It isn't on Google Fonts but is free for commercial use via [Fontshare](https://www.fontshare.com/fonts/clash-grotesk). To wire it in: download the woff2 files, drop them in `public/fonts/`, add an `@font-face` block, and point `--font-clash` in `app/globals.css` at the real family name. Until then it falls back to Archivo.

### Deploy

1. Push this repo to GitHub and import it into [Vercel](https://vercel.com/new).
2. Add the env vars from step 2 in the Vercel project settings (Production + Preview) — plus `NEXT_PUBLIC_SITE_URL` set to your production domain.
3. In Supabase, set **Auth → URL Configuration → Site URL** to your production domain.
4. Deploy. No `SUPABASE_SERVICE_ROLE_KEY` is needed anywhere in this app — admin writes ride the signed-in admin's own session, and RLS policies handle authorization.
