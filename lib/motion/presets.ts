import type { Transition } from "motion/react";

// Named spring presets transcribed from the design audit's motion language.
// Duration here means "spring duration" (motion's duration-based spring, not
// a tween) — see RevealText/RevealBlock for how these are applied.

export const SPRING_HEADING: Transition = {
  type: "spring",
  duration: 1.8,
  bounce: 0.15,
  delay: 0.05,
};

export const SPRING_HERO: Transition = {
  type: "spring",
  duration: 2.8,
  bounce: 0.1,
  delay: 0.25,
};

export const SPRING_DESCRIPTION: Transition = {
  type: "spring",
  duration: 0.8,
  bounce: 0.15,
  delay: 0.2,
};

export const SPRING_CARD: Transition = {
  type: "spring",
  duration: 1.8,
  bounce: 0.15,
  delay: 0.2,
};

export const SPRING_NAVBAR: Transition = {
  type: "spring",
  duration: 1.6,
  bounce: 0.15,
  delay: 1.4,
};

// Snappier than SPRING_CARD — for dense list rows (resume entries, skill
// pills) where each item reveals close on the heels of the last one; a slow
// 1.8s spring per row reads as sluggish once several are cascading in.
export const SPRING_LIST: Transition = {
  type: "spring",
  duration: 0.6,
  bounce: 0.1,
};

// Cascading reveal delay for grid/list items — capped so long lists (8+
// items) don't leave the last one waiting on a sluggish tail.
export function listStagger(index: number, step = 0.07, cap = 8) {
  return Math.min(index, cap) * step;
}
