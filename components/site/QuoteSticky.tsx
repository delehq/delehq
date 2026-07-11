"use client";

import { useRef } from "react";
import { useScroll } from "motion/react";
import { ScrollColorText } from "@/components/ui/ScrollColorText";

// Normal-flow scroll reveal — no sticky/pin wrapper. The sentence scrubs
// from pale to dark word-by-word as it scrolls through the viewport, tied to
// its OWN position (not an artificial extra-tall wrapper), so there's no
// leftover dead scroll distance before or after the reveal: the section is
// exactly as tall as its content, like any other section on the page.
export function QuoteSticky({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.35"],
  });

  return (
    <section className="px-5 py-32 tablet:py-40 desktop:py-48">
      <div ref={ref}>
        <ScrollColorText
          text={text}
          progress={scrollYProgress}
          range={[0, 1]}
          className="mx-auto max-w-[840px] text-center text-[28px] leading-[1.2] font-medium tracking-[-0.02em] tablet:text-[32px] desktop:text-[36px]"
        />
      </div>
    </section>
  );
}
