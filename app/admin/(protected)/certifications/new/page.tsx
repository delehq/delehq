import { createCertification } from "@/lib/actions/certifications.actions";
import { TextField } from "@/components/admin/fields";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";

export default function NewCertificationPage() {
  return (
    <form action={createCertification} className="flex max-w-[560px] flex-col gap-4">
      <h1 className="text-[24px] font-semibold">New certification</h1>
      <TextField name="name" label="Name" required />
      <TextField name="issuer" label="Issuer" required />
      <TextField name="issue_date" label="Issue date" type="date" />
      <TextField name="credential_url" label="Credential URL" type="url" />
      <TextField name="sort_order" label="Sort order" type="number" defaultValue={0} />
      <AdminSubmitButton>Create</AdminSubmitButton>
    </form>
  );
}
