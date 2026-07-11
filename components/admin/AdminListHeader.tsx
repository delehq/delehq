import Link from "next/link";

export function AdminListHeader({
  title,
  newHref,
}: {
  title: string;
  newHref: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-[28px] font-semibold">{title}</h1>
      <Link
        href={newHref}
        className="rounded-lg bg-black px-4 py-2 text-[14px] font-medium text-cream"
      >
        Add new
      </Link>
    </div>
  );
}
