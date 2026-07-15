"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Default (native-scroll) mode — Lenis smooths the real window scroll rather
// than transforming a wrapper, so CSS `position: sticky` sections (hero/bio,
// quote, blog sidebar) keep working natively. Do not switch to a
// content-wrapper/transform mode without re-testing every sticky section.
//
// `reducedMotion="user"` makes every motion/react animation site-wide honor
// prefers-reduced-motion automatically (transforms/layout animations are
// disabled, opacity crossfades are kept) — one place instead of threading
// useReducedMotion() through each animated component.
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis
        root
        options={{
          duration: 1.2,
          smoothWheel: true,
          touchMultiplier: 1,
        }}
      >
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
