import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateBlogPost, deleteBlogPost } from "@/lib/actions/blog.actions";
import { TextField, TextAreaField, CheckboxField } from "@/components/admin/fields";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { DeleteForm } from "@/components/admin/DeleteForm";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditBlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: item } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!item) notFound();

  const updateWithId = updateBlogPost.bind(null, id);
  const deleteWithId = deleteBlogPost.bind(null, id);

  return (
    <form action={updateWithId} className="flex max-w-[640px] flex-col gap-4">
      <h1 className="text-[24px] font-semibold">Edit blog post</h1>
      <TextField name="title" label="Title" defaultValue={item.title} required />
      <TextField name="slug" label="Slug" defaultValue={item.slug} required />
      <TextAreaField
        name="summary"
        label="Summary (card description)"
        rows={3}
        defaultValue={item.summary}
        required
      />
      <TextAreaField name="body" label="Body (markdown)" rows={16} defaultValue={item.body} required />
      <ImageUploader
        name="cover_image_path"
        label="Cover image"
        folder="blog"
        defaultPath={item.cover_image_path}
      />
      <TextField
        name="read_time_minutes"
        label="Read time (minutes)"
        type="number"
        defaultValue={item.read_time_minutes ?? ""}
      />
      <input type="hidden" name="published_at" defaultValue={item.published_at ?? ""} />
      <CheckboxField
        name="is_published"
        label="Published (visible on the site)"
        defaultChecked={item.is_published}
      />
      <div className="flex items-center gap-4">
        <AdminSubmitButton>Save changes</AdminSubmitButton>
        <DeleteForm action={deleteWithId}>
          <button type="submit" className="text-[14px] text-red">
            Delete
          </button>
        </DeleteForm>
      </div>
    </form>
  );
}
