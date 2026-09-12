"use client";

import { useState } from "react";
import Image from "next/image";
import { TextField, TextAreaField, CheckboxField } from "@/components/admin/fields";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { MarkdownEditor } from "@/components/admin/MarkdownEditor";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { MarkdownContent } from "@/components/site/MarkdownContent";
import { GradientPlaceholder } from "@/components/site/GradientPlaceholder";
import { getMediaUrl } from "@/lib/supabase/storage";
import { faqsToText, type Faq } from "@/lib/faq";

type BlogDefaults = {
  title: string;
  slug: string;
  summary: string;
  body: string;
  cover_image_path: string | null;
  read_time_minutes: number | null;
  faqs: Faq[] | null;
  published_at: string | null;
  is_published: boolean;
};

export function BlogForm({
  heading,
  submitLabel,
  action,
  deleteAction,
  defaults,
}: {
  heading: string;
  submitLabel: string;
  action: (formData: FormData) => void;
  deleteAction?: () => Promise<void>;
  defaults?: Partial<BlogDefaults>;
}) {
  const [title, setTitle] = useState(defaults?.title ?? "");
  const [summary, setSummary] = useState(defaults?.summary ?? "");
  const [body, setBody] = useState(defaults?.body ?? "");
  const [coverPath, setCoverPath] = useState(defaults?.cover_image_path ?? "");

  const coverUrl = coverPath ? getMediaUrl(coverPath) : null;

  return (
    <div className="flex flex-col gap-10 desktop:flex-row desktop:items-start">
      <div className="flex w-full max-w-[640px] flex-col gap-4">
        <form action={action} className="flex flex-col gap-4">
          <h1 className="text-[24px] font-semibold">{heading}</h1>
          <TextField
            name="title"
            label="Title"
            defaultValue={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField name="slug" label="Slug" defaultValue={defaults?.slug} required />
          <TextAreaField
            name="summary"
            label="Summary (card description)"
            rows={3}
            defaultValue={summary}
            required
            onChange={(e) => setSummary(e.target.value)}
          />
          <MarkdownEditor
            name="body"
            label="Body (markdown)"
            rows={16}
            defaultValue={body}
            required
            onChange={setBody}
          />
          <ImageUploader
            name="cover_image_path"
            label="Cover image"
            folder="blog"
            defaultPath={defaults?.cover_image_path}
            onPathChange={setCoverPath}
          />
          <TextField
            name="read_time_minutes"
            label="Read time (minutes)"
            type="number"
            defaultValue={defaults?.read_time_minutes ?? ""}
          />
          <TextAreaField
            name="faqs"
            label="FAQs (optional — shown as a FAQ section on the post, and helps it get quoted by AI answer engines)"
            rows={8}
            defaultValue={faqsToText(defaults?.faqs)}
            placeholder={"Q: Question, phrased the way someone would actually ask it?\nA: A plain, direct answer.\n\nQ: Second question?\nA: Second answer."}
          />
          <input type="hidden" name="published_at" defaultValue={defaults?.published_at ?? ""} />
          <CheckboxField
            name="is_published"
            label="Published (visible on the site)"
            defaultChecked={defaults?.is_published}
          />
          <AdminSubmitButton>{submitLabel}</AdminSubmitButton>
        </form>
        {deleteAction && (
          <DeleteForm action={deleteAction}>
            <button type="submit" className="text-[14px] text-red">
              Delete post
            </button>
          </DeleteForm>
        )}
      </div>

      <div className="w-full max-w-[420px] shrink-0 desktop:sticky desktop:top-8 desktop:max-h-[calc(100vh-4rem)] desktop:overflow-y-auto">
        <p className="mb-3 text-[13px] font-medium text-black/50">Live preview</p>
        <div className="rounded-2xl border border-black/10 bg-white p-5">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
            {coverUrl ? (
              <Image src={coverUrl} alt="" fill className="object-cover" />
            ) : (
              <GradientPlaceholder seed={title || "preview"} />
            )}
          </div>
          <h2 className="mt-4 text-[20px] font-semibold text-black">{title || "Post title"}</h2>
          <p className="mt-2 text-[14px] text-black/60">{summary || "Post summary"}</p>
          <div className="mt-6 border-t border-black/10 pt-6">
            <MarkdownContent content={body || "Post body will render here…"} />
          </div>
        </div>
      </div>
    </div>
  );
}
