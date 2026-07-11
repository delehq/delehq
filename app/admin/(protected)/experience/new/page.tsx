import { createExperience } from "@/lib/actions/experience.actions";
import { TextField, TextAreaField } from "@/components/admin/fields";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";

export default function NewExperiencePage() {
  return (
    <form action={createExperience} className="flex max-w-[560px] flex-col gap-4">
      <h1 className="text-[24px] font-semibold">New experience</h1>
      <TextField name="company" label="Company" required />
      <TextField name="role" label="Role" required />
      <TextField name="location" label="Location" />
      <TextField name="start_date" label="Start date" type="date" required />
      <TextField name="end_date" label="End date (leave blank for Present)" type="date" />
      <TextAreaField name="description" label="Description" rows={6} />
      <TextField name="sort_order" label="Sort order" type="number" defaultValue={0} />
      <AdminSubmitButton>Create</AdminSubmitButton>
    </form>
  );
}
