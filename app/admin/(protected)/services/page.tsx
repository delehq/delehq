import Link from "next/link";
import { getServices } from "@/lib/data/services";
import { deleteService } from "@/lib/actions/services.actions";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { AdminListHeader } from "@/components/admin/AdminListHeader";

export default async function AdminServicesPage() {
  const items = await getServices();

  return (
    <div className="flex flex-col gap-6">
      <AdminListHeader title="Services" newHref="/admin/services/new" />
      <div className="flex flex-col divide-y divide-black/10 rounded-2xl border border-black/10 bg-white">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div>
              <p className="text-[15px] font-medium">{item.title}</p>
              <p className="max-w-[420px] text-[13px] text-black/50">{item.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href={`/admin/services/${item.id}`} className="text-[13px] underline">
                Edit
              </Link>
              <DeleteForm action={deleteService.bind(null, item.id)}>
                <button type="submit" className="text-[13px] text-red">
                  Delete
                </button>
              </DeleteForm>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="px-5 py-8 text-center text-black/40">No entries yet.</p>
        )}
      </div>
    </div>
  );
}
