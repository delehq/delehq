"use client";

import { useRef } from "react";
import { useScroll } from "motion/react";
import { ScrollColorText } from "@/components/ui/ScrollColorText";

// 150vh outer wrapper + 100vh sticky content — a scroll-held quote moment.
// The sentence itself scrubs from pale to dark word-by-word as the section
// scrolls, rather than fading the whole block in at once.
export function QuoteSticky({ text }: { text: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={ref} className="relative h-[120vh] tablet:h-[150vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center px-5">
        <ScrollColorText
          text={text}
          progress={scrollYProgress}
          range={[0.15, 0.55]}
          className="mx-auto max-w-[840px] text-center text-[28px] leading-[1.2] font-medium tracking-[-0.02em] tablet:text-[32px] desktop:text-[36px]"
        />
      </div>
    </section>
  );
}
