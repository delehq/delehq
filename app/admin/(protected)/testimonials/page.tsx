import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteTestimonial } from "@/lib/actions/testimonials.actions";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { AdminListHeader } from "@/components/admin/AdminListHeader";

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="flex flex-col gap-6">
      <AdminListHeader title="Testimonials" newHref="/admin/testimonials/new" />
      <div className="flex flex-col divide-y divide-black/10 rounded-2xl border border-black/10 bg-white">
        {(items ?? []).map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-medium">
                {item.author_name}
                {!item.is_published && (
                  <span className="ml-2 rounded-full bg-black/10 px-2 py-0.5 text-[11px] text-black/50">
                    Hidden
                  </span>
                )}
              </p>
              <p className="truncate text-[13px] text-black/50">{item.quote}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link href={`/admin/testimonials/${item.id}`} className="text-[13px] underline">
                Edit
              </Link>
              <DeleteForm action={deleteTestimonial.bind(null, item.id)}>
                <button type="submit" className="text-[13px] text-red">
                  Delete
                </button>
              </DeleteForm>
            </div>
          </div>
        ))}
        {(items ?? []).length === 0 && (
          <p className="px-5 py-8 text-center text-black/40">No testimonials yet.</p>
        )}
      </div>
    </div>
  );
}
