"use client";

import type { MotionValue } from "motion/react";
import { motion, useTransform } from "motion/react";

type ScrollColorTextProps = {
  text: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
};

// Per-word scroll-scrubbed color fill: each word ramps from a pale start
// color to full dark as `progress` sweeps across `range`, staggered by word
// index so the sentence fills left-to-right like a reading guide, tied
// directly to scroll position (not a one-shot reveal — it scrubs both ways).
export function ScrollColorText({ text, progress, range, className }: ScrollColorTextProps) {
  const words = text.split(" ");
  const [start, end] = range;
  const span = end - start;

  return (
    <p className={className}>
      {words.map((word, i) => {
        const wordStart = start + (span * i) / words.length;
        const wordEnd = start + (span * (i + 1)) / words.length;
        return (
          <Word
            key={i}
            word={word}
            isLast={i === words.length - 1}
            progress={progress}
            range={[wordStart, wordEnd]}
          />
        );
      })}
    </p>
  );
}

function Word({
  word,
  isLast,
  progress,
  range,
}: {
  word: string;
  isLast: boolean;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const color = useTransform(progress, range, ["rgba(17,17,17,0.15)", "rgba(17,17,17,1)"]);
  return (
    <motion.span style={{ color }}>
      {word}
      {isLast ? "" : " "}
    </motion.span>
  );
}
