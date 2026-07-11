import type { ReactNode } from "react";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FixedCtaButtons } from "@/components/site/FixedCtaButtons";
import { getProfile } from "@/lib/data/profile";
import { hasPublishedPosts } from "@/lib/data/blog";
import { getMediaUrl } from "@/lib/supabase/storage";

export default async function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [profile, showBlog] = await Promise.all([
    getProfile(),
    hasPublishedPosts(),
  ]);

  const fullName = profile?.full_name ?? "Ayodele John";
  const brand = "Dele";
  const resumeUrl = getMediaUrl(profile?.resume_path);

  return (
    <SmoothScrollProvider>
      <NoiseOverlay />
      <Navbar brand={brand} showBlog={showBlog} />
      <main>{children}</main>
      <Footer
        fullName={fullName}
        tagline={profile?.footer_headline ?? "Building Systems That Scale."}
        contactEmail={profile?.contact_email ?? null}
        socialLinks={profile?.social_links ?? []}
        showBlog={showBlog}
      />
      <FixedCtaButtons resumeUrl={resumeUrl} />
    </SmoothScrollProvider>
  );
}
