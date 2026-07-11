"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RollingText } from "@/components/ui/RollingText";
import { cn } from "@/lib/utils";

// Hidden while the hero/bio scroll stage is in view: that section's wide,
// edge-to-edge editorial layout (large portrait + full-width text columns)
// needs the space these fixed buttons would otherwise sit on top of. They
// fade back in once the user scrolls past into Services/Projects/etc.
export function FixedCtaButtons({ resumeUrl }: { resumeUrl?: string | null }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const targets = [
      document.getElementById("hero-section"),
      document.getElementById("bio-section"),
    ].filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const states = new Map<Element, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          states.set(entry.target, entry.isIntersecting);
        }
        setHidden([...states.values()].some(Boolean));
      },
      { threshold: 0 },
    );

    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a
        href={resumeUrl ?? "#"}
        target={resumeUrl ? "_blank" : undefined}
        rel={resumeUrl ? "noopener noreferrer" : undefined}
        className={cn(
          "fixed right-5 bottom-[109px] z-40 hidden w-40 items-center justify-center rounded-lg bg-black py-3 text-center text-[14px] font-medium text-cream shadow-lg transition-opacity duration-300 tablet:flex",
          hidden && "pointer-events-none opacity-0",
        )}
      >
        <RollingText>Download CV</RollingText>
      </a>
      <Link
        href="/#contact"
        className={cn(
          "fixed right-5 bottom-[66px] z-40 hidden w-40 items-center justify-center rounded-lg bg-black py-3 text-center text-[14px] font-medium text-cream shadow-lg transition-opacity duration-300 tablet:flex",
          hidden && "pointer-events-none opacity-0",
        )}
      >
        <RollingText>Get in Touch</RollingText>
      </Link>
    </>
  );
}
