import { createProject } from "@/lib/actions/projects.actions";
import { TextField, TextAreaField, CheckboxField } from "@/components/admin/fields";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";

export default function NewProjectPage() {
  return (
    <form action={createProject} className="flex max-w-[640px] flex-col gap-4">
      <h1 className="text-[24px] font-semibold">New project</h1>
      <TextField name="title" label="Title" required />
      <TextField name="slug" label="Slug" required placeholder="e.g. zetabrent-education" />
      <TextField name="category" label="Category" required placeholder="e.g. Study Abroad Platform" />
      <TextField name="year" label="Year" type="number" defaultValue={new Date().getFullYear()} required />
      <TextAreaField name="summary" label="Summary (card description)" rows={3} required />
      <TextAreaField
        name="content"
        label="Full content (markdown)"
        rows={12}
        placeholder="## Role&#10;...&#10;&#10;## Overview&#10;..."
      />
      <ImageUploader name="cover_image_path" label="Cover image" folder="projects" />
      <TextField name="project_url" label="Live link" type="url" />
      <TextField name="repo_url" label="Repository link" type="url" />
      <CheckboxField name="is_published" label="Published (visible on the site)" />
      <TextField name="sort_order" label="Sort order" type="number" defaultValue={0} />
      <AdminSubmitButton>Create</AdminSubmitButton>
    </form>
  );
}
