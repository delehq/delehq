"use client";

import { motion, type Transition } from "motion/react";
import type { ReactNode } from "react";
import { SPRING_CARD } from "@/lib/motion/presets";

type RevealBlockProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  transition?: Transition;
  trigger?: "mount" | "inView";
  viewportAmount?: number;
};

// Simple fade + slide-up used for cards, grids, and the navbar. Duration/delay
// vary by call site via `transition` (see lib/motion/presets).
export function RevealBlock({
  children,
  className,
  y = 20,
  transition = SPRING_CARD,
  trigger = "inView",
  viewportAmount = 0.5,
}: RevealBlockProps) {
  const triggerProps =
    trigger === "mount"
      ? { initial: { opacity: 0, y }, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: viewportAmount },
        };

  return (
    <motion.div className={className} transition={transition} {...triggerProps}>
      {children}
    </motion.div>
  );
}
