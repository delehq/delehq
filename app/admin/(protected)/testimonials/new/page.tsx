import { createTestimonial } from "@/lib/actions/testimonials.actions";
import { TextField, TextAreaField, CheckboxField } from "@/components/admin/fields";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";

export default function NewTestimonialPage() {
  return (
    <form action={createTestimonial} className="flex max-w-[560px] flex-col gap-4">
      <h1 className="text-[24px] font-semibold">New testimonial</h1>
      <TextField name="author_name" label="Author name" required />
      <TextField name="author_role" label="Author role" />
      <TextField name="author_company" label="Author company" />
      <TextAreaField name="quote" label="Quote (front of card)" rows={4} required />
      <TextAreaField name="back_content" label="Back of card (optional, enables flip)" rows={4} />
      <ImageUploader name="avatar_path" label="Avatar" folder="testimonials" />
      <CheckboxField name="is_published" label="Published (visible on the site)" defaultChecked />
      <TextField name="sort_order" label="Sort order" type="number" defaultValue={0} />
      <AdminSubmitButton>Create</AdminSubmitButton>
    </form>
  );
}
