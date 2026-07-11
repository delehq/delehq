import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo-sans",
  subsets: ["latin"],
});

const title = "Ayodele John — Software Engineer";
const description =
  "Ayodele John is a software engineer building production-grade platforms end-to-end, from backend systems to the interfaces that ship them.";

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
  authors: [{ name: "Ayodele John" }],
  creator: "Ayodele John",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Ayodele John",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable}`}>
      <body className="bg-cream text-black font-archivo antialiased">
        {children}
      </body>
    </html>
  );
}
