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
