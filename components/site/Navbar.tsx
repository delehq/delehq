"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { RevealBlock } from "@/components/ui/RevealBlock";
import { SPRING_NAVBAR } from "@/lib/motion/presets";

type NavLink = { href: string; label: string };

export function Navbar({
  brand,
  showBlog,
}: {
  brand: string;
  showBlog: boolean;
}) {
  const [open, setOpen] = useState(false);

  const links: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/about", label: "Resume" },
    ...(showBlog ? [{ href: "/blog", label: "Blog" }] : []),
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <RevealBlock
      trigger="mount"
      transition={SPRING_NAVBAR}
      className="fixed top-[30px] left-1/2 z-50 -translate-x-1/2"
    >
      <div className="relative flex items-center gap-1 rounded-full bg-black p-1.5 text-cream shadow-lg">
        <Link
          href="/"
          className="whitespace-nowrap rounded-full px-4 py-2 text-[14px] font-medium"
          onClick={() => setOpen(false)}
        >
          {brand}
        </Link>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
              className="absolute top-[calc(100%+8px)] left-1/2 flex w-max max-w-[calc(100vw-32px)] min-w-[180px] -translate-x-1/2 flex-col items-stretch gap-2 rounded-2xl bg-black p-1.5 sm:static sm:left-auto sm:top-auto sm:w-auto sm:max-w-none sm:min-w-0 sm:translate-x-0 sm:flex-row sm:items-center sm:gap-1 sm:overflow-hidden sm:rounded-full sm:p-0"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap rounded-full px-4 py-3 text-center text-[14px] font-medium text-cream/70 transition-colors hover:bg-cream/10 hover:text-cream sm:py-2 sm:text-left sm:hover:bg-transparent"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream text-black before:absolute before:-inset-1.5 before:content-['']"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>
    </RevealBlock>
  );
}
