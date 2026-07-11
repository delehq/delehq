"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

// Default (native-scroll) mode — Lenis smooths the real window scroll rather
// than transforming a wrapper, so CSS `position: sticky` sections (hero/bio,
// quote, blog sidebar) keep working natively. Do not switch to a
// content-wrapper/transform mode without re-testing every sticky section.
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
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
  );
}
