"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { signOut } from "@/lib/actions/auth.actions";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/certifications", label: "Certifications" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/submissions", label: "Submissions" },
];

function Brand() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-black text-cream">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M13 0 2 14h7l-2 10L22 8h-8l-1-8Z" />
      </svg>
    </span>
  );
}

export function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between border-b border-black/10 bg-white p-4 tablet:hidden">
        <Link href="/admin" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Brand />
          <span className="text-[15px] font-semibold tracking-tight text-black">Dele</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 tablet:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[260px] -translate-x-full flex-col justify-between overflow-y-auto border-r border-black/10 bg-white p-4 transition-transform duration-300",
          "tablet:sticky tablet:top-0 tablet:h-screen tablet:w-[220px] tablet:shrink-0 tablet:translate-x-0",
          open && "translate-x-0",
        )}
      >
        <div>
          <Link
            href="/admin"
            className="mb-6 flex items-center gap-2 px-3 py-1"
            onClick={() => setOpen(false)}
          >
            <Brand />
            <span className="text-[15px] font-semibold tracking-tight text-black">Dele</span>
          </Link>
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-[14px] font-medium text-black/70 transition-colors hover:bg-black/5 hover:text-black"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="w-full rounded-lg px-3 py-2 text-left text-[14px] text-black/50 hover:bg-black/5"
          >
            Sign out
          </button>
        </form>
      </aside>
    </>
  );
}
