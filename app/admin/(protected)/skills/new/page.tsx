import { createSkill } from "@/lib/actions/skills.actions";
import { TextField } from "@/components/admin/fields";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";

export default function NewSkillPage() {
  return (
    <form action={createSkill} className="flex max-w-[560px] flex-col gap-4">
      <h1 className="text-[24px] font-semibold">New skill</h1>
      <TextField
        name="category"
        label="Category"
        required
        placeholder="e.g. Languages & Frameworks"
      />
      <TextField name="name" label="Skill name" required placeholder="e.g. TypeScript" />
      <TextField name="sort_order" label="Sort order (within category)" type="number" defaultValue={0} />
      <AdminSubmitButton>Create</AdminSubmitButton>
    </form>
  );
}
