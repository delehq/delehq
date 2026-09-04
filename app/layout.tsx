import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { SITE_URL } from "@/lib/constants";
import { getProfile } from "@/lib/data/profile";
import { getMediaUrl } from "@/lib/supabase/storage";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo-sans",
  subsets: ["latin"],
});

const title = "Ayodele John — Software Engineer";
const description =
  "I'm John Ayodele, a Backend and AI Engineer building scalable, production-grade platforms with Node.js, NestJS, Python, microservices, and cloud infrastructure.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s — Ayodele John",
  },
  description,
  keywords: [
    "Ayodele John",
    "software engineer",
    "backend engineer",
    "full stack developer",
    "NestJS developer",
    "Next.js developer",
    "Nigeria software engineer",
  ],
  authors: [{ name: "Ayodele John", url: SITE_URL }],
  creator: "Ayodele John",
  publisher: "Ayodele John",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Ayodele John",
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  colorScheme: "light",
};

// Structured data (Person + Sonaroid Organization + WebSite + ProfilePage) for
// search engines and AI crawlers. See node_modules/next/dist/docs/01-app/02-guides/json-ld.md
// for why this is a native <script> tag rather than next/script, and why the
// payload is sanitized before being injected via dangerouslySetInnerHTML.
//
// name/image/email/address/sameAs are pulled from the live `profile` row (the
// same one /admin/profile edits) so this stays in sync automatically — the
// hardcoded values below are fallbacks for when a field hasn't been filled in
// yet. Everything else (credentials, offers, knowsAbout, worksFor) is curated
// SEO copy that isn't part of the profile model, so it stays static here.
// This used to be duplicated by a second, simpler Person block on the
// homepage (app/(site)/page.tsx) that disagreed with this one — that block
// was removed in favor of this single, canonical one.
const FALLBACK_SAME_AS = [
  "https://www.linkedin.com/in/john-ayodele-dev/",
  "https://github.com/delehq",
  "https://x.com/dele_dev",
  "https://www.instagram.com/jirovahq",
];

async function buildJsonLd() {
  const profile = await getProfile();
  const headshotUrl = getMediaUrl(profile?.headshot_path);
  const sameAs = (profile?.social_links ?? [])
    .filter((s) => s.url && s.url !== "#")
    .map((s) => s.url);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.deledev.com/#person",
        name: profile?.full_name ?? "Ayodele John",
        alternateName: "John Ayodele Miracle",
        url: "https://www.deledev.com/",
        // Falls back to the dynamic OG image (app/opengraph-image.tsx) when
        // no headshot has been uploaded — there's no static /og-image.jpg in
        // this project.
        image: headshotUrl ?? `${SITE_URL}/opengraph-image`,
        description:
          "Nigeria-based software engineer building production-grade platforms end-to-end, from backend systems to the interfaces that ship them. Specializes in backend and API engineering, fintech and payments systems, cloud infrastructure, full-stack product delivery, and AI engineering.",
        jobTitle: "Lead Backend Engineer",
        email: `mailto:${profile?.contact_email ?? "johnayodelemiracle@gmail.com"}`,
        ...(profile?.location && { address: profile.location }),
        nationality: { "@type": "Country", name: "Nigeria" },
        worksFor: { "@id": "https://sonaroid.io/#organization" },
        alumniOf: [
          { "@type": "CollegeOrUniversity", name: "University of Benin" },
          { "@type": "EducationalOrganization", name: "Xoft Tech Academy" },
        ],
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "AWS Certified Developer - Associate",
            credentialCategory: "certification",
            dateCreated: "2024-01",
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Google Associate Cloud Engineer",
            credentialCategory: "certification",
            dateCreated: "2023-01",
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Certified ScrumMaster",
            credentialCategory: "certification",
            dateCreated: "2023-01",
          },
        ],
        knowsAbout: [
          "Backend Engineering",
          "NestJS",
          "Node.js",
          "TypeScript",
          "PostgreSQL",
          "MongoDB",
          "React",
          "Next.js",
          "React Native",
          "GraphQL",
          "REST APIs",
          "Microservices Architecture",
          "AWS",
          "Azure",
          "Docker",
          "Kubernetes",
          "CI/CD",
          "Fintech and Payments Systems",
          "AI and Machine Learning Integration",
          "Data Engineering",
        ],
        knowsLanguage: "en",
        sameAs: sameAs.length > 0 ? sameAs : FALLBACK_SAME_AS,
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Backend & API Engineering",
              serviceType: "Software Development",
              description:
                "NestJS, Node.js, and TypeScript backend systems, REST and GraphQL APIs, microservices architecture.",
              provider: { "@id": "https://www.deledev.com/#person" },
              areaServed: "Worldwide (Remote)",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Fintech & Payments Systems",
              serviceType: "Software Development",
              description:
                "Multi-currency subscription billing, payment gateway integration (Paystack, Flutterwave), FX-rate locking, earnings ledgers, and withdrawal state machines.",
              provider: { "@id": "https://www.deledev.com/#person" },
              areaServed: "Worldwide (Remote)",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Full-Stack Product Delivery",
              serviceType: "Software Development",
              description:
                "End-to-end product builds spanning NestJS/Node backends and React, Next.js, and React Native frontends, including product and UX direction.",
              provider: { "@id": "https://www.deledev.com/#person" },
              areaServed: "Worldwide (Remote)",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Engineering",
              serviceType: "Software Development",
              description:
                "AI and LLM integration into production applications, recommendation systems, and AI-driven product features.",
              provider: { "@id": "https://www.deledev.com/#person" },
              areaServed: "Worldwide (Remote)",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Cloud Infrastructure & DevOps",
              serviceType: "IT Consulting",
              description:
                "AWS and Azure infrastructure, Docker, Kubernetes, and CI/CD pipeline design.",
              provider: { "@id": "https://www.deledev.com/#person" },
              areaServed: "Worldwide (Remote)",
            },
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": "https://sonaroid.io/#organization",
        name: "Sonaroid",
        url: "https://sonaroid.io/",
        description:
          "Provider of authentic data and deep insights into Africa's energy industry, delivered through a multi-currency subscription platform.",
        employee: { "@id": "https://www.deledev.com/#person" },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.deledev.com/#website",
        url: "https://www.deledev.com/",
        name: "Ayodele John — Software Engineer",
        description:
          "Portfolio of Ayodele John, a Nigeria-based software engineer building production-grade platforms end-to-end.",
        inLanguage: "en",
        publisher: { "@id": "https://www.deledev.com/#person" },
      },
      {
        "@type": "ProfilePage",
        "@id": "https://www.deledev.com/#profilepage",
        url: "https://www.deledev.com/",
        name: "Ayodele John — Software Engineer",
        isPartOf: { "@id": "https://www.deledev.com/#website" },
        mainEntity: { "@id": "https://www.deledev.com/#person" },
      },
    ],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = await buildJsonLd();

  return (
    <html lang="en" className={`${archivo.variable}`}>
      <body className="bg-cream text-black font-archivo antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
