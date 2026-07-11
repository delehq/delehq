import Link from "next/link";
import Image from "next/image";
import { H5, Body16 } from "@/components/ui/typography";
import { GradientPlaceholder } from "@/components/site/GradientPlaceholder";
import { getMediaUrl } from "@/lib/supabase/storage";

type Project = {
  slug: string;
  title: string;
  category: string;
  cover_image_path: string | null;
};

export function ProjectCard({ project }: { project: Project }) {
  const imageUrl = getMediaUrl(project.cover_image_path);

  return (
    <Link href={`/work/${project.slug}`} className="group flex flex-col gap-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
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
      </div>
      <div>
        <H5 as="h3">{project.title}</H5>
        <Body16 className="text-black/50">{project.category}</Body16>
      </div>
    </Link>
  );
}
