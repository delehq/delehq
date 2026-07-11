import Link from "next/link";
import { signOut } from "@/lib/actions/auth.actions";

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

export function AdminSidebar() {
  return (
    <aside className="flex h-screen w-[220px] shrink-0 flex-col justify-between border-r border-black/10 bg-white p-4">
      <nav className="flex flex-col gap-1">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg px-3 py-2 text-[14px] font-medium text-black/70 transition-colors hover:bg-black/5 hover:text-black"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <form action={signOut}>
        <button
          type="submit"
          className="w-full rounded-lg px-3 py-2 text-left text-[14px] text-black/50 hover:bg-black/5"
        >
          Sign out
        </button>
      </form>
    </aside>
  );
}
