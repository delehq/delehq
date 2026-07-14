import Link from "next/link";
import { getCertifications } from "@/lib/data/certifications";
import { deleteCertification } from "@/lib/actions/certifications.actions";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { AdminListHeader } from "@/components/admin/AdminListHeader";

export default async function AdminCertificationsPage() {
  const items = await getCertifications();

  return (
    <div className="flex flex-col gap-6">
      <AdminListHeader title="Certifications" newHref="/admin/certifications/new" />
      <div className="flex flex-col divide-y divide-black/10 rounded-2xl border border-black/10 bg-white">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-medium">{item.name}</p>
              <p className="truncate text-[13px] text-black/50">{item.issuer}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link href={`/admin/certifications/${item.id}`} className="text-[13px] underline">
                Edit
              </Link>
              <DeleteForm action={deleteCertification.bind(null, item.id)}>
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
