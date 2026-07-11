import Link from "next/link";
import { getSkillsGrouped } from "@/lib/data/skills";
import { deleteSkill } from "@/lib/actions/skills.actions";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { AdminListHeader } from "@/components/admin/AdminListHeader";

export default async function AdminSkillsPage() {
  const groups = await getSkillsGrouped();

  return (
    <div className="flex flex-col gap-6">
      <AdminListHeader title="Skills" newHref="/admin/skills/new" />
      <div className="flex flex-col gap-6">
        {groups.map((group) => (
          <div key={group.category} className="rounded-2xl border border-black/10 bg-white">
            <div className="border-b border-black/10 px-5 py-3 text-[13px] font-medium text-black/50">
              {group.category}
            </div>
            <div className="flex flex-col divide-y divide-black/10">
              {group.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 px-5 py-3">
                  <p className="text-[14px]">{item.name}</p>
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/skills/${item.id}`} className="text-[13px] underline">
                      Edit
                    </Link>
                    <DeleteForm action={deleteSkill.bind(null, item.id)}>
                      <button type="submit" className="text-[13px] text-red">
                        Delete
                      </button>
                    </DeleteForm>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {groups.length === 0 && (
          <p className="rounded-2xl border border-black/10 bg-white px-5 py-8 text-center text-black/40">
            No skills yet.
          </p>
        )}
      </div>
    </div>
  );
}
