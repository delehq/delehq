"use client";

import { useState, type ChangeEvent } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { getMediaUrl } from "@/lib/supabase/storage";

export function ImageUploader({
  name,
  label,
  folder,
  defaultPath,
}: {
  name: string;
  label: string;
  folder: string;
  defaultPath?: string | null;
}) {
  const [path, setPath] = useState(defaultPath ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      {previewUrl && (
        <div className="relative h-32 w-32 overflow-hidden rounded-xl border border-black/10">
          <Image src={previewUrl} alt="" fill className="object-cover" />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="text-[13px]"
      />
      <input type="hidden" name={name} value={path} />
      {uploading && <p className="text-[13px] text-black/40">Uploading…</p>}
      {error && <p className="text-[13px] text-red">{error}</p>}
    </div>
  );
}
