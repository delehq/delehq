import Link from "next/link";
import { H2, Body18 } from "@/components/ui/typography";

export default function SiteNotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 px-5 text-center">
      <H2 as="h1" reveal trigger="mount" className="max-w-[620px]">
        Oops!
      </H2>
      <Body18 className="max-w-[420px] text-black/60">
        We couldn&apos;t find the page you were looking for.
      </Body18>
      <Link
        href="/"
        className="mt-2 rounded-lg bg-black px-6 py-3 text-[16px] font-medium text-cream"
      >
        Back to home
      </Link>
    </section>
  );
}
