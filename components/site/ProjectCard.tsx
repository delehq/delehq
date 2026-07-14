import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { H5, Body16 } from "@/components/ui/typography";
import { GradientPlaceholder } from "@/components/site/GradientPlaceholder";
import { getMediaUrl } from "@/lib/supabase/storage";

type Project = {
  slug: string;
  title: string;
  category: string;
  year?: number;
  cover_image_path: string | null;
};

export function ProjectCard({ project }: { project: Project }) {
  const imageUrl = getMediaUrl(project.cover_image_path);

  return (
    <Link href={`/work/${project.slug}`} className="group flex flex-col gap-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            sizes="(min-width: 1280px) 40vw, (min-width: 810px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <GradientPlaceholder
            seed={project.title}
            label={project.category}
            className="transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 flex items-end justify-end bg-black/0 p-4 transition-colors duration-300 group-hover:bg-black/10">
          <span className="flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-cream text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <H5 as="h3">{project.title}</H5>
          <Body16 className="text-black/50">{project.category}</Body16>
        </div>
        {project.year && (
          <Body16 className="shrink-0 text-black/40">{project.year}</Body16>
        )}
      </div>
    </Link>
  );
}
