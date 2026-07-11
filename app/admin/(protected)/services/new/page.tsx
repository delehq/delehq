import { createService } from "@/lib/actions/services.actions";
import { TextField, TextAreaField } from "@/components/admin/fields";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";

export default function NewServicePage() {
  return (
    <form action={createService} className="flex max-w-[560px] flex-col gap-4">
      <h1 className="text-[24px] font-semibold">New service</h1>
      <TextField name="title" label="Title" required />
      <TextAreaField name="description" label="Description" rows={3} required />
      <TextField name="sort_order" label="Sort order" type="number" defaultValue={0} />
      <AdminSubmitButton>Create</AdminSubmitButton>
    </form>
  );
}
