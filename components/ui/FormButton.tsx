"use client";

import { Loader2, Check, X } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FormButtonState = "default" | "loading" | "disabled" | "success" | "error";

type FormButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  state?: FormButtonState;
  children: ReactNode;
};

export function FormButton({
  state = "default",
  children,
  className,
  disabled,
  ...props
}: FormButtonProps) {
  const isDisabled = disabled || state === "loading" || state === "disabled";

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-[16px] font-medium text-cream transition-colors disabled:opacity-50",
        state === "error" ? "bg-red" : "bg-black",
        className,
      )}
    >
      {state === "loading" && <Loader2 className="animate-spin" size={16} />}
      {state === "success" && <Check size={16} />}
      {state === "error" && <X size={16} />}
      {state === "success" ? "Sent" : state === "error" ? "Try again" : children}
    </button>
  );
}
