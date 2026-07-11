import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateTestimonial, deleteTestimonial } from "@/lib/actions/testimonials.actions";
import { TextField, TextAreaField, CheckboxField } from "@/components/admin/fields";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { DeleteForm } from "@/components/admin/DeleteForm";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditTestimonialPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: item } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!item) notFound();

  const updateWithId = updateTestimonial.bind(null, id);
  const deleteWithId = deleteTestimonial.bind(null, id);

  return (
    <form action={updateWithId} className="flex max-w-[560px] flex-col gap-4">
      <h1 className="text-[24px] font-semibold">Edit testimonial</h1>
      <TextField name="author_name" label="Author name" defaultValue={item.author_name} required />
      <TextField name="author_role" label="Author role" defaultValue={item.author_role ?? ""} />
      <TextField
        name="author_company"
        label="Author company"
        defaultValue={item.author_company ?? ""}
      />
      <TextAreaField
        name="quote"
        label="Quote (front of card)"
        rows={4}
        defaultValue={item.quote}
        required
      />
      <TextAreaField
        name="back_content"
        label="Back of card (optional, enables flip)"
        rows={4}
        defaultValue={item.back_content ?? ""}
      />
      <ImageUploader
        name="avatar_path"
        label="Avatar"
        folder="testimonials"
        defaultPath={item.avatar_path}
      />
      <CheckboxField
        name="is_published"
        label="Published (visible on the site)"
        defaultChecked={item.is_published}
      />
      <TextField name="sort_order" label="Sort order" type="number" defaultValue={item.sort_order} />
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
