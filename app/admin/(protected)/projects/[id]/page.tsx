import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateProject, deleteProject } from "@/lib/actions/projects.actions";
import { TextField, TextAreaField, CheckboxField } from "@/components/admin/fields";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { MarkdownEditor } from "@/components/admin/MarkdownEditor";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { DeleteForm } from "@/components/admin/DeleteForm";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: item } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!item) notFound();

  const updateWithId = updateProject.bind(null, id);
  const deleteWithId = deleteProject.bind(null, id);

  return (
    <div className="flex flex-col gap-4">
      <form action={updateWithId} className="flex max-w-[640px] flex-col gap-4">
        <h1 className="text-[24px] font-semibold">Edit project</h1>
        <TextField name="title" label="Title" defaultValue={item.title} required />
        <TextField name="slug" label="Slug" defaultValue={item.slug} required />
        <TextField name="category" label="Category" defaultValue={item.category} required />
        <TextField name="year" label="Year" type="number" defaultValue={item.year} required />
        <TextAreaField
          name="summary"
          label="Summary (card description)"
          rows={3}
          defaultValue={item.summary}
          required
        />
        <MarkdownEditor
          name="content"
          label="Full content (markdown)"
          rows={12}
          defaultValue={item.content}
        />
        <ImageUploader
          name="cover_image_path"
          label="Cover image"
          folder="projects"
          defaultPath={item.cover_image_path}
        />
        <TextField name="project_url" label="Live link" type="url" defaultValue={item.project_url ?? ""} />
        <TextField name="repo_url" label="Repository link" type="url" defaultValue={item.repo_url ?? ""} />
        <CheckboxField
          name="is_published"
          label="Published (visible on the site)"
          defaultChecked={item.is_published}
        />
        <TextField name="sort_order" label="Sort order" type="number" defaultValue={item.sort_order} />
        <AdminSubmitButton>Save changes</AdminSubmitButton>
      </form>
      <DeleteForm action={deleteWithId}>
        <button type="submit" className="text-[14px] text-red">
          Delete project
        </button>
      </DeleteForm>
    </div>
  );
}
