"use client";

import { useState } from "react";
import { TextField, TextAreaField, CheckboxField } from "@/components/admin/fields";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { TestimonialCard } from "@/components/site/TestimonialCard";

type TestimonialDefaults = {
  author_name: string;
  author_role: string | null;
  author_company: string | null;
  quote: string;
  back_content: string | null;
  avatar_path: string | null;
  is_published: boolean;
  sort_order: number;
};

export function TestimonialForm({
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
  defaults?: Partial<TestimonialDefaults>;
}) {
  const [authorName, setAuthorName] = useState(defaults?.author_name ?? "");
  const [authorRole, setAuthorRole] = useState(defaults?.author_role ?? "");
  const [quote, setQuote] = useState(defaults?.quote ?? "");
  const [backContent, setBackContent] = useState(defaults?.back_content ?? "");
  const [avatarPath, setAvatarPath] = useState(defaults?.avatar_path ?? "");

  return (
    <div className="flex flex-col gap-10 tablet:flex-row tablet:items-start">
      <div className="flex w-full max-w-[560px] flex-col gap-4">
        <form action={action} className="flex flex-col gap-4">
          <h1 className="text-[24px] font-semibold">{heading}</h1>
          <TextField
            name="author_name"
            label="Author name"
            defaultValue={authorName}
            required
            onChange={(e) => setAuthorName(e.target.value)}
          />
          <TextField
            name="author_role"
            label="Author role"
            defaultValue={authorRole ?? ""}
            onChange={(e) => setAuthorRole(e.target.value)}
          />
          <TextField
            name="author_company"
            label="Author company"
            defaultValue={defaults?.author_company ?? ""}
          />
          <TextAreaField
            name="quote"
            label="Quote (front of card)"
            rows={4}
            defaultValue={quote}
            required
            onChange={(e) => setQuote(e.target.value)}
          />
          <TextAreaField
            name="back_content"
            label="Back of card (optional, enables flip)"
            rows={4}
            defaultValue={backContent ?? ""}
            onChange={(e) => setBackContent(e.target.value)}
          />
          <ImageUploader
            name="avatar_path"
            label="Avatar"
            folder="testimonials"
            defaultPath={defaults?.avatar_path}
            onPathChange={setAvatarPath}
          />
          <CheckboxField
            name="is_published"
            label="Published (visible on the site)"
            defaultChecked={defaults?.is_published ?? true}
          />
          <TextField
            name="sort_order"
            label="Sort order"
            type="number"
            defaultValue={defaults?.sort_order ?? 0}
          />
          <AdminSubmitButton>{submitLabel}</AdminSubmitButton>
        </form>
        {deleteAction && (
          <DeleteForm action={deleteAction}>
            <button type="submit" className="text-[14px] text-red">
              Delete testimonial
            </button>
          </DeleteForm>
        )}
      </div>

      <div className="w-full max-w-[320px] shrink-0 tablet:sticky tablet:top-8 tablet:max-h-[calc(100vh-4rem)] tablet:overflow-y-auto">
        <p className="mb-3 text-[13px] font-medium text-black/50">Live preview</p>
        <TestimonialCard
          testimonial={{
            quote: quote || "Your quote will appear here.",
            back_content: backContent || null,
            author_name: authorName || "Author name",
            author_role: authorRole || null,
            avatar_path: avatarPath || null,
          }}
        />
      </div>
    </div>
  );
}
