import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateSkill, deleteSkill } from "@/lib/actions/skills.actions";
import { TextField } from "@/components/admin/fields";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { DeleteForm } from "@/components/admin/DeleteForm";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditSkillPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: item } = await supabase
    .from("skills")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!item) notFound();

  const updateWithId = updateSkill.bind(null, id);
  const deleteWithId = deleteSkill.bind(null, id);

  return (
    <div className="flex max-w-[560px] flex-col gap-4">
      <form action={updateWithId} className="flex flex-col gap-4">
        <h1 className="text-[24px] font-semibold">Edit skill</h1>
        <TextField name="category" label="Category" defaultValue={item.category} required />
        <TextField name="name" label="Skill name" defaultValue={item.name} required />
        <TextField name="sort_order" label="Sort order (within category)" type="number" defaultValue={item.sort_order} />
        <AdminSubmitButton>Save changes</AdminSubmitButton>
      </form>
      <DeleteForm action={deleteWithId}>
        <button type="submit" className="text-[14px] text-red">
          Delete skill
        </button>
      </DeleteForm>
    </div>
  );
}
