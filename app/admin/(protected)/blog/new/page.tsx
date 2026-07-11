import { createBlogPost } from "@/lib/actions/blog.actions";
import { TextField, TextAreaField, CheckboxField } from "@/components/admin/fields";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";

export default function NewBlogPostPage() {
  return (
    <form action={createBlogPost} className="flex max-w-[640px] flex-col gap-4">
      <h1 className="text-[24px] font-semibold">New blog post</h1>
      <TextField name="title" label="Title" required />
      <TextField name="slug" label="Slug" required placeholder="e.g. building-trust-through-clear-design" />
      <TextAreaField name="summary" label="Summary (card description)" rows={3} required />
      <TextAreaField name="body" label="Body (markdown)" rows={16} required />
      <ImageUploader name="cover_image_path" label="Cover image" folder="blog" />
      <TextField name="read_time_minutes" label="Read time (minutes)" type="number" />
      <CheckboxField name="is_published" label="Published (visible on the site)" />
      <AdminSubmitButton>Create</AdminSubmitButton>
    </form>
  );
}
