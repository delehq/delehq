"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ToolbarAction = {
  label: string;
  title: string;
  className?: string;
  run: (value: string, start: number, end: number) => { next: string; cursor: number };
};

function wrapSelection(before: string, after = before): ToolbarAction["run"] {
  return (value, start, end) => {
    const selected = value.slice(start, end);
    const next = value.slice(0, start) + before + selected + after + value.slice(end);
    return { next, cursor: start + before.length + selected.length + after.length };
  };
}

function prefixLines(prefix: string): ToolbarAction["run"] {
  return (value, start, end) => {
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const lineEndIdx = value.indexOf("\n", end);
    const lineEnd = lineEndIdx === -1 ? value.length : lineEndIdx;
    const block = value.slice(lineStart, lineEnd);
    const transformed = block
      .split("\n")
      .map((line) => (line ? prefix + line : line))
      .join("\n");
    const next = value.slice(0, lineStart) + transformed + value.slice(lineEnd);
    return { next, cursor: lineStart + transformed.length };
  };
}

const BUTTONS: ToolbarAction[] = [
  { label: "B", title: "Bold", className: "font-bold", run: wrapSelection("**") },
  { label: "I", title: "Italic", className: "italic", run: wrapSelection("_") },
  { label: "H2", title: "Heading", run: prefixLines("## ") },
  { label: "H3", title: "Subheading", run: prefixLines("### ") },
  { label: "❝", title: "Quote", run: prefixLines("> ") },
  { label: "•", title: "Bullet list", run: prefixLines("- ") },
  { label: "1.", title: "Numbered list", run: prefixLines("1. ") },
  { label: "🔗", title: "Link", run: wrapSelection("[", "](https://)") },
];

export function MarkdownEditor({
  name,
  label,
  defaultValue = "",
  required,
  rows = 14,
  onChange,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  required?: boolean;
  rows?: number;
  onChange?: (value: string) => void;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const ref = useRef<HTMLTextAreaElement>(null);

  function update(next: string) {
    setValue(next);
    onChange?.(next);
  }

  function runAction(action: ToolbarAction) {
    const el = ref.current;
    if (!el) return;
    const { selectionStart, selectionEnd } = el;
    const { next, cursor } = action.run(value, selectionStart, selectionEnd);
    update(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(cursor, cursor);
    });
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[14px] text-black/60">{label}</label>
      <div className="flex flex-wrap gap-1 rounded-t-lg border border-b-0 border-black/15 bg-black/[0.03] p-1.5">
        {BUTTONS.map((action) => (
          <button
            key={action.title}
            type="button"
            title={action.title}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => runAction(action)}
            className={cn(
              "flex h-7 min-w-7 items-center justify-center rounded px-1.5 text-[13px] text-black/70 hover:bg-black/10",
              action.className,
            )}
          >
            {action.label}
          </button>
        ))}
      </div>
      <textarea
        ref={ref}
        name={name}
        required={required}
        rows={rows}
        value={value}
        onChange={(e) => update(e.target.value)}
        className="rounded-b-lg border border-black/15 bg-white px-4 py-2.5 text-[15px] outline-none focus:border-black/40"
      />
    </div>
  );
}
