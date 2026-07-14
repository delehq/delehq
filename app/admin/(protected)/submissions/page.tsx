import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { markSubmissionRead, deleteSubmission } from "@/lib/actions/submissions.actions";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 20;

export default async function AdminSubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();
  const { data: items, count } = await supabase
    .from("contact_submissions")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[28px] font-semibold">Submissions</h1>
      <div className="flex flex-col gap-3">
        {(items ?? []).map((item) => (
          <div
            key={item.id}
            className={cn(
              "rounded-2xl border p-5",
              item.is_read ? "border-black/10 bg-white" : "border-black/20 bg-black/[0.03]",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[15px] font-medium">
                  {item.name} <span className="text-black/40">· {item.email}</span>
                </p>
                <p className="text-[12px] text-black/40">
                  {new Date(item.created_at).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {!item.is_read && (
                  <form action={markSubmissionRead.bind(null, item.id)}>
                    <button type="submit" className="text-[13px] underline">
                      Mark read
                    </button>
                  </form>
                )}
                <DeleteForm action={deleteSubmission.bind(null, item.id)}>
                  <button type="submit" className="text-[13px] text-red">
                    Delete
                  </button>
                </DeleteForm>
              </div>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-[14px] text-black/70">{item.message}</p>
          </div>
        ))}
        {(items ?? []).length === 0 && <p className="text-black/40">No submissions yet.</p>}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-[13px]">
          {page > 1 ? (
            <Link href={`/admin/submissions?page=${page - 1}`} className="underline">
              Previous
            </Link>
          ) : (
            <span className="text-black/30">Previous</span>
          )}
          <span className="text-black/40">
            Page {page} of {totalPages}
          </span>
          {page < totalPages ? (
            <Link href={`/admin/submissions?page=${page + 1}`} className="underline">
              Next
            </Link>
          ) : (
            <span className="text-black/30">Next</span>
          )}
        </div>
      )}
    </div>
  );
}
