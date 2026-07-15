import Link from "next/link";
import { H2b, H4, Body16 } from "@/components/ui/typography";
import { SocialIcon } from "@/components/ui/SocialIcon";
import type { SocialLink } from "@/types/database.types";

type FooterProps = {
  fullName: string;
  tagline: string;
  contactEmail: string | null;
  socialLinks: SocialLink[];
  showBlog: boolean;
};

// One component, responsive Tailwind classes — deliberately not three
// separate DOM trees per breakpoint (the "hide via CSS, render all 3"
// pattern duplicates real content for screen readers). The audited
// breakpoint differences here are reflow, not structurally different
// content, so a single responsive layout is the correct call.
//
// The huge pt/pb on the <footer> itself (not the inner content div) is
// deliberate: the giant wordmark below is absolutely positioned with a
// *negative* bottom offset, pushing most of it past the footer's own
// bottom edge, where `overflow-hidden` on the footer crops it — the
// reserved padding is what gives that bleed somewhere to sit.
export function Footer({
  fullName,
  tagline,
  contactEmail,
  socialLinks,
  showBlog,
}: FooterProps) {
  const year = new Date().getFullYear();
  const links = socialLinks.filter((s) => s.url && s.url !== "#");
  const wordmark = "DELE";

  return (
    <footer className="relative overflow-hidden bg-black pt-20 pb-50 text-cream tablet:pt-25 tablet:pb-75 desktop:pt-30">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-15 px-5 tablet:px-7.5 desktop:flex-row desktop:items-end desktop:justify-between desktop:px-0">
        <H2b as="p" className="max-w-85 tracking-[-0.02em]">
          {tagline}
        </H2b>
        <div className="flex flex-col gap-15 tablet:flex-row tablet:items-start tablet:justify-between tablet:gap-2.5 desktop:max-w-180">
          <div className="flex max-w-75 flex-col gap-5">
            <H4>/Quick links</H4>
            <div className="flex flex-wrap gap-2.5">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/#bio-section">About Me</FooterLink>
              <FooterLink href="/#services">Services</FooterLink>
              <FooterLink href="/work">Works</FooterLink>
              <FooterLink href="/about">Resume</FooterLink>
              {showBlog && <FooterLink href="/blog">Blog</FooterLink>}
              <FooterLink href="/#contact">Contact</FooterLink>
            </div>
          </div>
          <div className="flex max-w-75 flex-col gap-5">
            <H4>/Contact</H4>
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="text-[18px] leading-[1.4] tracking-[-0.04em] hover:underline"
              >
                {contactEmail}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-15 flex max-w-[1180px] flex-col-reverse items-start gap-4 border-t border-cream/10 px-5 pt-6 tablet:flex-row tablet:items-center tablet:justify-between tablet:px-7.5 desktop:px-0">
        <Body16 className="text-cream/50">
          © {year} {fullName}. All rights reserved.
        </Body16>
        {links.length > 0 && (
          <div className="flex gap-3">
            {links.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.platform}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 transition-colors hover:bg-cream/10"
              >
                <SocialIcon platform={s.platform} />
              </a>
            ))}
          </div>
        )}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-10px] flex select-none justify-center tablet:bottom-[-50px] desktop:bottom-[-100px]"
      >
        <p className="w-[93.75%] max-w-[1200px] text-center text-[138px] leading-[0.9] font-bold tracking-[-0.02em] text-cream/10 tablet:text-[287px] desktop:text-[455px]">
          {wordmark}
        </p>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="rounded-lg bg-cream px-3 py-1 text-[14px] font-medium text-black transition-colors hover:bg-cream/85"
    >
      {children}
    </Link>
  );
}
