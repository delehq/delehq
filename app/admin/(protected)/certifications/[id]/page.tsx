import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  updateCertification,
  deleteCertification,
} from "@/lib/actions/certifications.actions";
import { TextField } from "@/components/admin/fields";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { DeleteForm } from "@/components/admin/DeleteForm";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditCertificationPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: item } = await supabase
    .from("certifications")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!item) notFound();

  const updateWithId = updateCertification.bind(null, id);
  const deleteWithId = deleteCertification.bind(null, id);

  return (
    <div className="flex max-w-[560px] flex-col gap-4">
      <form action={updateWithId} className="flex flex-col gap-4">
        <h1 className="text-[24px] font-semibold">Edit certification</h1>
        <TextField name="name" label="Name" defaultValue={item.name} required />
        <TextField name="issuer" label="Issuer" defaultValue={item.issuer} required />
        <TextField
          name="issue_date"
          label="Issue date"
          type="date"
          defaultValue={item.issue_date ?? ""}
        />
        <TextField
          name="credential_url"
          label="Credential URL"
          type="url"
          defaultValue={item.credential_url ?? ""}
        />
        <TextField name="sort_order" label="Sort order" type="number" defaultValue={item.sort_order} />
        <AdminSubmitButton>Save changes</AdminSubmitButton>
      </form>
      <DeleteForm action={deleteWithId}>
        <button type="submit" className="text-[14px] text-red">
          Delete certification
        </button>
      </DeleteForm>
    </div>
  );
}
