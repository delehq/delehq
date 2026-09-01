"use client";

import { useRef, useSyncExternalStore } from "react";
import type { SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { H1, H2, Title22, Body18 } from "@/components/ui/typography";

type HeroStickyProps = {
  headshotUrl: string | null;
  fullName: string;
  tagline: string;
  bio: string;
};

// 200vh outer wrapper. Two independent layers share it:
//  - a sticky, bottom-anchored avatar that stays pinned to the viewport for
//    the whole scroll, then shrinks/sinks/flips (grayscale front -> color
//    back, true CSS 3D card flip via two backface-hidden faces on a single
//    rotateY'd wrapper) as the bio section scrolls in;
//  - normal-flow hero (100vh) + bio (100vh) content stacked beneath it, no
//    cross-fade — they scroll like regular sections while the avatar stays
//    put and reacts to that scroll instead.
const FLIP_SPRING = { type: "spring" as const, duration: 2, bounce: 0 };

export function HeroSticky({ headshotUrl, fullName, tagline, bio }: HeroStickyProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const avatarY = useSpring(useTransform(scrollYProgress, [0.5, 0.75], [0, 40]), FLIP_SPRING);

  // Phone's avatar box is small enough that it never risked overlapping the
  // hero title in the first place (unlike tablet/desktop, where a much
  // bigger box needs the grow-from-small treatment below) — so on phone it
  // just starts at its real size.
  const isPhone = useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(max-width: 809px)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(max-width: 809px)").matches,
    () => false, // server snapshot — matches the pre-hydration default
  );

  // Starts small so it can't collide with the centered hero title at scroll
  // 0, grows to its actual (CSS-declared) size — timed to finish only once
  // the page has scrolled enough for the title to have cleared the growing
  // box's path (bigger box needs more scroll clearance than a small one).
  const avatarScale = useSpring(
    useTransform(
      scrollYProgress,
      isPhone ? [0.5, 0.75] : [0, 0.4, 0.5, 0.75],
      isPhone ? [1, 0.85] : [0.4, 1, 1, 0.85],
    ),
    FLIP_SPRING,
  );
  const avatarRotateY = useSpring(
    useTransform(scrollYProgress, [0.5, 0.75], [0, 180]),
    FLIP_SPRING,
  );

  const bioParagraphs = bio.split("\n\n").filter(Boolean);
  const [intro, ...rest] = bioParagraphs;

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="pointer-events-none absolute inset-0">
        <div className="sticky top-0 flex h-screen items-end justify-center overflow-hidden pb-5">
          {headshotUrl && (
            <div
              className="relative h-55 w-47.5 tablet:h-72 tablet:w-63 desktop:h-132 desktop:w-116"
              style={{ perspective: 1600 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  y: avatarY,
                  scale: avatarScale,
                  rotateY: avatarRotateY,
                  transformStyle: "preserve-3d",
                  transformOrigin: "bottom",
                }}
              >
                <div
                  className="absolute inset-0 overflow-hidden rounded-[20px]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Image
                    src={headshotUrl}
                    alt={fullName}
                    fill
                    sizes="400px"
                    className="object-cover object-[center_15%] grayscale"
                    priority
                  />
                </div>
                <div
                  className="absolute inset-0 overflow-hidden rounded-[20px]"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <Image
                    src={headshotUrl}
                    alt=""
                    fill
                    sizes="400px"
                    className="object-cover object-[center_15%]"
                  />
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      <div className="relative">
        <div
          id="hero-section"
          className="relative flex h-screen items-center justify-center px-5"
        >
          <div className="relative">
            {/* H1's box is forced to the full available width once the
                tagline wraps (fit-content resolves to available width, not
                the rendered line width, once max-content overflows it) —
                so these sit off percentages of that box rather than the
                text's own edges. */}
            <SparkleIcon className="absolute top-[6%] left-[8%] h-6 w-6 text-black tablet:h-9 tablet:w-9 desktop:h-12 desktop:w-12" />
            <BoltIcon className="absolute right-[8%] bottom-[6%] h-8 w-8 text-black tablet:h-12 tablet:w-12 desktop:h-16 desktop:w-16" />
            <H1 reveal trigger="mount">
              {tagline}
            </H1>
          </div>
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-[13px] tracking-[0.08em] text-black/50 tablet:inset-x-10 desktop:inset-x-16">
            <span>&copy;{new Date().getFullYear()}</span>
            <span className="hidden tablet:inline">/ENGINEERING SINCE 2024</span>
          </div>
        </div>

        <div
          id="bio-section"
          className="flex h-screen items-start justify-center px-5 pt-20 tablet:items-end tablet:pt-0 tablet:pb-5"
        >
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-16 tablet:flex-row tablet:items-end tablet:justify-between tablet:gap-6">
            <div className="flex flex-col gap-16 tablet:max-w-40 tablet:gap-40 desktop:max-w-75 desktop:gap-65">
              <H2 reveal trigger="inView">
                Hey!
              </H2>
              {intro && <Title22 className="text-black">{intro}</Title22>}
            </div>
            {rest.length > 0 && (
              <div className="flex flex-col gap-5 tablet:max-w-48 desktop:max-w-90">
                {rest.map((paragraph, i) => (
                  <Body18 key={i} className="text-black">
                    {paragraph}
                  </Body18>
                ))}
                <Link
                  href="/work"
                  className="group mt-2 inline-flex w-fit items-center gap-2 text-[16px] font-medium text-black"
                >
                  Get Started
                  <span className="flex h-7 w-7 items-center justify-center rounded-md border border-black/20 transition-colors group-hover:bg-black group-hover:text-cream">
                    <ArrowUpRight size={15} />
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SparkleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0c.9 5.7 2.3 9.1 4 10.8S20.1 12.9 24 12c-3.9.9-6.3 2.3-8 4S12.9 20.1 12 24c-.9-3.9-2.3-6.3-4-8S3.9 12.9 0 12c3.9-.9 6.3-2.3 8-4S11.1 3.9 12 0Z" />
    </svg>
  );
}

function BoltIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13 0 2 14h7l-2 10L22 8h-8l-1-8Z" />
    </svg>
  );
}
