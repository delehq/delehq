import { createEducation } from "@/lib/actions/education.actions";
import { TextField, TextAreaField } from "@/components/admin/fields";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";

export default function NewEducationPage() {
  return (
    <form action={createEducation} className="flex max-w-[560px] flex-col gap-4">
      <h1 className="text-[24px] font-semibold">New education</h1>
      <TextField name="institution" label="Institution" required />
      <TextField name="credential" label="Credential" required placeholder="B.Sc. Biology" />
      <TextField name="start_date" label="Start date" type="date" />
      <TextField name="end_date" label="End date" type="date" />
      <TextAreaField name="description" label="Description" rows={4} />
      <TextField name="sort_order" label="Sort order" type="number" defaultValue={0} />
      <AdminSubmitButton>Create</AdminSubmitButton>
    </form>
  );
}
