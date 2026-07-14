import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateEducation, deleteEducation } from "@/lib/actions/education.actions";
import { TextField, TextAreaField } from "@/components/admin/fields";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { DeleteForm } from "@/components/admin/DeleteForm";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditEducationPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: item } = await supabase
    .from("education")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!item) notFound();

  const updateWithId = updateEducation.bind(null, id);
  const deleteWithId = deleteEducation.bind(null, id);

  return (
    <div className="flex max-w-[560px] flex-col gap-4">
      <form action={updateWithId} className="flex flex-col gap-4">
        <h1 className="text-[24px] font-semibold">Edit education</h1>
        <TextField name="institution" label="Institution" defaultValue={item.institution} required />
        <TextField name="credential" label="Credential" defaultValue={item.credential} required />
        <TextField name="start_date" label="Start date" type="date" defaultValue={item.start_date ?? ""} />
        <TextField name="end_date" label="End date" type="date" defaultValue={item.end_date ?? ""} />
        <TextAreaField
          name="description"
          label="Description"
          rows={4}
          defaultValue={item.description ?? ""}
        />
        <TextField name="sort_order" label="Sort order" type="number" defaultValue={item.sort_order} />
        <AdminSubmitButton>Save changes</AdminSubmitButton>
      </form>
      <DeleteForm action={deleteWithId}>
        <button type="submit" className="text-[14px] text-red">
          Delete education
        </button>
      </DeleteForm>
    </div>
  );
}
