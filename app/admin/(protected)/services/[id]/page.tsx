import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateService, deleteService } from "@/lib/actions/services.actions";
import { TextField, TextAreaField } from "@/components/admin/fields";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { DeleteForm } from "@/components/admin/DeleteForm";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditServicePage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: item } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!item) notFound();

  const updateWithId = updateService.bind(null, id);
  const deleteWithId = deleteService.bind(null, id);

  return (
    <div className="flex max-w-[560px] flex-col gap-4">
      <form action={updateWithId} className="flex flex-col gap-4">
        <h1 className="text-[24px] font-semibold">Edit service</h1>
        <TextField name="title" label="Title" defaultValue={item.title} required />
        <TextAreaField
          name="description"
          label="Description"
          rows={3}
          defaultValue={item.description}
          required
        />
        <TextField name="sort_order" label="Sort order" type="number" defaultValue={item.sort_order} />
        <AdminSubmitButton>Save changes</AdminSubmitButton>
      </form>
      <DeleteForm action={deleteWithId}>
        <button type="submit" className="text-[14px] text-red">
          Delete service
        </button>
      </DeleteForm>
    </div>
  );
}
