"use client";

import type { ReactNode } from "react";

export function DeleteForm({
  action,
  confirmText = "Delete this item? This can't be undone.",
  children,
}: {
  action: () => Promise<void>;
  confirmText?: string;
  children: ReactNode;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      {children}
    </form>
  );
}
