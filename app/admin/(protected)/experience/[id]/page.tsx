import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateExperience, deleteExperience } from "@/lib/actions/experience.actions";
import { TextField, TextAreaField } from "@/components/admin/fields";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { DeleteForm } from "@/components/admin/DeleteForm";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditExperiencePage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: item } = await supabase
    .from("experience")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!item) notFound();

  const updateWithId = updateExperience.bind(null, id);
  const deleteWithId = deleteExperience.bind(null, id);

  return (
    <form action={updateWithId} className="flex max-w-[560px] flex-col gap-4">
      <h1 className="text-[24px] font-semibold">Edit experience</h1>
      <TextField name="company" label="Company" defaultValue={item.company} required />
      <TextField name="role" label="Role" defaultValue={item.role} required />
      <TextField name="location" label="Location" defaultValue={item.location ?? ""} />
      <TextField
        name="start_date"
        label="Start date"
        type="date"
        defaultValue={item.start_date}
        required
      />
      <TextField
        name="end_date"
        label="End date (leave blank for Present)"
        type="date"
        defaultValue={item.end_date ?? ""}
      />
      <TextAreaField
        name="description"
        label="Description"
        rows={6}
        defaultValue={item.description ?? ""}
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
