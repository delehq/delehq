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
      <div className="flex items-center gap-1 rounded-full bg-black p-1.5 text-cream shadow-lg">
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
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
              className="flex items-center gap-1 overflow-hidden"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap rounded-full px-4 py-2 text-[14px] font-medium text-cream/70 transition-colors hover:text-cream"
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
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream text-black"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>
    </RevealBlock>
  );
}
