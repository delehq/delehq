"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { getMediaUrl } from "@/lib/supabase/storage";

export function FileUploader({
  name,
  label,
  folder,
  accept,
  defaultPath,
}: {
  name: string;
  label: string;
  folder: string;
  accept: string;
  defaultPath?: string | null;
}) {
  const [path, setPath] = useState(defaultPath ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);

    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const filePath = `${folder}/${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(filePath, file, { upsert: true });

    setUploading(false);
    if (uploadError) {
      setError(uploadError.message);
      return;
    }
    setPath(filePath);
  }

  const previewUrl = path ? getMediaUrl(path) : null;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[14px] text-black/60">{label}</label>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-lg border border-black/15 bg-white px-4 py-2 text-[14px] font-medium text-black transition-colors hover:border-black/40 disabled:opacity-50"
        >
          {uploading ? "Uploading…" : previewUrl ? "Change file" : "Upload file"}
        </button>
        {previewUrl && (
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-[13px] text-black underline underline-offset-2"
          >
            {path.split("/").pop()}
          </a>
        )}
      </div>
      {error && <p className="text-[13px] text-red">{error}</p>}
      <input ref={inputRef} type="file" accept={accept} onChange={handleChange} className="sr-only" />
      <input type="hidden" name={name} value={path} />
    </div>
  );
}
