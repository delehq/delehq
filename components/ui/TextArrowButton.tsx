import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type TextArrowButtonProps = {
  href: string;
  children: string;
  variant?: "primary" | "white";
  className?: string;
};

export function TextArrowButton({
  href,
  children,
  variant = "primary",
  className,
}: TextArrowButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-[16px] font-medium",
        isPrimary ? "text-black" : "text-cream",
        className,
      )}
    >
      <span className="border-b border-current/30 pb-0.5 transition-colors group-hover:border-current">
        {children}
      </span>
      <ArrowUpRight
        size={16}
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
