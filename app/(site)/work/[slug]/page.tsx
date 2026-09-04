import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getProjectBySlug, getRelatedProjects } from "@/lib/data/projects";
import { getMediaUrl } from "@/lib/supabase/storage";
import { GradientPlaceholder } from "@/components/site/GradientPlaceholder";
import { ProjectCard } from "@/components/site/ProjectCard";
import { MarkdownContent } from "@/components/site/MarkdownContent";
import { H1b, Body16, Body18, Label } from "@/components/ui/typography";
import { SITE_URL } from "@/lib/constants";

type PageProps = { params: Promise<{ slug: string }> };

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const related = await getRelatedProjects(project.id, 2);
  const imageUrl = getMediaUrl(project.cover_image_path);

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${SITE_URL}/work/${project.slug}`,
    ...(imageUrl && { image: imageUrl }),
    ...(project.year && { dateCreated: String(project.year) }),
    creator: { "@type": "Person", name: "Ayodele John" },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Work", item: `${SITE_URL}/work` },
      { "@type": "ListItem", position: 2, name: project.title, item: `${SITE_URL}/work/${project.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="mx-auto max-w-[1080px] px-5 pt-[160px] pb-20 tablet:px-10 desktop:px-5">
        <H1b reveal className="max-w-[780px] text-balance">
          {project.title}
        </H1b>

        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
          <div>
            <Body16 className="text-black/40">Category</Body16>
            <Body18 as="p">{project.category}</Body18>
          </div>
          <div>
            <Body16 className="text-black/40">Year</Body16>
            <Body18 as="p">{project.year}</Body18>
          </div>
          {project.project_url && (
            <a
              href={project.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              Live Link
            </a>
          )}
          {project.repo_url && (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              Source
            </a>
          )}
        </div>

        {(() => {
          const cover = imageUrl ? (
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              sizes="(min-width: 1280px) 1080px, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <GradientPlaceholder seed={project.title} label={project.category} />
          );

          const className = "relative mt-10 block aspect-[16/10] w-full overflow-hidden rounded-3xl";

          return project.project_url ? (
            <a
              href={project.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
              aria-label={`Open ${project.title} live site`}
            >
              {cover}
            </a>
          ) : (
            <div className={className}>{cover}</div>
          );
        })()}

        {project.content && (
          <div className="mt-16 max-w-[780px]">
            <MarkdownContent content={project.content} />
          </div>
        )}
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1080px] px-5 pb-20 tablet:px-10 desktop:px-5">
          <Label className="mb-6 block">/More Projects</Label>
          <div className="grid grid-cols-1 gap-5 tablet:grid-cols-2">
            {related.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    return { title: "Project not found", robots: { index: false, follow: true } };
  }

  const imageUrl = getMediaUrl(project.cover_image_path);
  const url = `/work/${project.slug}`;

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      url,
      type: "article",
      ...(imageUrl && { images: [{ url: imageUrl, width: 1200, height: 630, alt: project.title }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}
