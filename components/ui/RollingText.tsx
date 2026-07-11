"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Two stacked copies of the label; hovering the parent slides the stack up
// by one line, revealing the second copy — used on the fixed CTA buttons.
export function RollingText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={cn("inline-block h-[1.2em] overflow-hidden", className)}>
      <motion.span
        className="flex flex-col leading-[1.2em]"
        initial={{ y: 0 }}
        whileHover={{ y: "-1.2em" }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
      >
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </motion.span>
    </span>
  );
}
