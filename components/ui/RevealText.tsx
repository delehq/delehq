"use client";

import { motion, type Transition } from "motion/react";
import type { ElementType, ReactElement } from "react";
import { SPRING_HEADING } from "@/lib/motion/presets";

type RevealTextProps = {
  children: string;
  as?: ElementType;
  className?: string;
  splitBy?: "word" | "char";
  transition?: Transition;
  blur?: number;
  y?: number;
  staggerDelay?: number;
  trigger?: "mount" | "inView";
  viewportAmount?: number;
};

// Word/char-tokenized reveal: opacity 0->1, y offset -> 0, blur -> 0, on a
// spring transition. Covers the standard heading reveal, the slower hero
// title, and the description reveal by varying props (see lib/motion/presets).
export function RevealText({
  children,
  as: Tag = "span",
  className,
  splitBy = "word",
  transition = SPRING_HEADING,
  blur = 10,
  y = 10,
  staggerDelay = 0.05,
  trigger = "inView",
  viewportAmount = 0.5,
}: RevealTextProps): ReactElement {
  const tokens = children.split(" ");

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: transition.delay ?? 0,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y, filter: `blur(${blur}px)` },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { ...transition, delay: 0 },
    },
  };

  const triggerProps =
    trigger === "mount"
      ? { initial: "hidden", animate: "visible" as const }
      : {
          initial: "hidden",
          whileInView: "visible" as const,
          viewport: { once: true, amount: viewportAmount },
        };

  return (
    <Tag className={className}>
      <motion.span className="inline" variants={container} {...triggerProps}>
        {tokens.flatMap((word, wi) => {
          const el =
            splitBy === "char" ? (
              <span key={wi} className="inline-block whitespace-nowrap">
                {Array.from(word).map((char, ci) => (
                  <span key={ci} className="inline-block overflow-hidden">
                    <motion.span className="inline-block" variants={item}>
                      {char}
                    </motion.span>
                  </span>
                ))}
              </span>
            ) : (
              <span key={wi} className="inline-block overflow-hidden">
                <motion.span className="inline-block" variants={item}>
                  {word}
                </motion.span>
              </span>
            );
          // A separator space must live OUTSIDE any inline-block box: trailing
          // whitespace at the edge of an atomic inline box gets trimmed by the
          // browser, silently swallowing the space between words otherwise.
          return wi < tokens.length - 1 ? [el, " "] : [el];
        })}
      </motion.span>
    </Tag>
  );
}
