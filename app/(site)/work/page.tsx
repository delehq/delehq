import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getPublishedProjectsPaged } from "@/lib/data/projects";
import { ProjectCard } from "@/components/site/ProjectCard";
import { H1b, Body18, Label } from "@/components/ui/typography";
import { RevealBlock } from "@/components/ui/RevealBlock";

const PAGE_SIZE = 6;

const title = "Work";
const description =
  "A showcase of Ayodele John's latest projects, highlighting thoughtful engineering, clear systems, and real-world results.";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  return {
    title,
    description,
    alternates: {
      canonical: page > 1 ? `/work?page=${page}` : "/work",
    },
    openGraph: {
      title: `${title} — Ayodele John`,
      description,
      url: "/work",
      type: "website",
    },
    // Paginated pages are thin/duplicate variants of page 1 — keep them
    // crawlable via links but out of the index.
    ...(page > 1 && { robots: { index: false, follow: true } }),
  };
}

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const { items: projects, count } = await getPublishedProjectsPaged(page, PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  return (
    <section className="mx-auto max-w-[1180px] px-5 pt-[180px] pb-20 tablet:px-10 desktop:px-5">
      <Label className="mb-4 block">
        /Work{count > 0 && ` · ${count} project${count === 1 ? "" : "s"}`}
      </Label>
      <H1b reveal className="max-w-[780px]">
        My Brightest Creations
      </H1b>
      <Body18
        reveal
        trigger="mount"
        className="mt-6 max-w-[460px] text-black/60"
      >
        A showcase of my latest projects, highlighting thoughtful engineering,
        clear systems, and real-world results.
      </Body18>

      {projects.length > 0 ? (
        <RevealBlock
          trigger="mount"
          className="mt-16 grid grid-cols-1 gap-5 tablet:grid-cols-2"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </RevealBlock>
      ) : (
        <p className="mt-16 text-black/40">Projects coming soon.</p>
      )}

      {totalPages > 1 && (
        <div className="mt-16 flex items-center justify-center gap-3">
          {page > 1 ? (
            <Link
              href={`/work?page=${page - 1}`}
              aria-label="Previous page"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-black transition-colors hover:bg-black hover:text-cream"
            >
              <ArrowLeft size={16} />
            </Link>
          ) : (
            <span
              aria-hidden
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-black/20"
            >
              <ArrowLeft size={16} />
            </span>
          )}
          <span className="min-w-24 text-center text-[13px] text-black/40">
            Page {page} of {totalPages}
          </span>
          {page < totalPages ? (
            <Link
              href={`/work?page=${page + 1}`}
              aria-label="Next page"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-black transition-colors hover:bg-black hover:text-cream"
            >
              <ArrowRight size={16} />
            </Link>
          ) : (
            <span
              aria-hidden
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-black/20"
            >
              <ArrowRight size={16} />
            </span>
          )}
        </div>
      )}
    </section>
  );
}
