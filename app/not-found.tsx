import Link from "next/link";

// Root fallback for routes outside the (site) group. Rendered inside the
// root layout's <html>/<body>, so no need to redeclare them here.
// Deliberately static (no Supabase calls) so a broken data layer never
// breaks the 404 itself.
export default function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-5 text-center">
      <h1 className="text-[46px] font-semibold">Oops!</h1>
      <p className="max-w-[420px] text-[18px] text-black/60">
        We couldn&apos;t find the page you were looking for.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-lg bg-black px-6 py-3 text-[16px] font-medium text-cream"
      >
        Back to home
      </Link>
    </div>
  );
}
