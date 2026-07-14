import Link from "next/link";
import Image from "next/image";
import { H5, Body16 } from "@/components/ui/typography";
import { GradientPlaceholder } from "@/components/site/GradientPlaceholder";
import { getMediaUrl } from "@/lib/supabase/storage";

type Post = {
  slug: string;
  title: string;
  summary: string;
  cover_image_path: string | null;
  published_at: string | null;
  read_time_minutes?: number | null;
};

export function BlogCard({ post }: { post: Post }) {
  const imageUrl = getMediaUrl(post.cover_image_path);
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 810px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <GradientPlaceholder
            seed={post.title}
            className="transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-col gap-1">
        {(date || post.read_time_minutes) && (
          <div className="flex items-center gap-2 text-black/40">
            {date && <Body16 className="text-black/40">{date}</Body16>}
            {date && post.read_time_minutes ? <span aria-hidden="true">·</span> : null}
            {post.read_time_minutes && (
              <Body16 className="text-black/40">{post.read_time_minutes} min read</Body16>
            )}
          </div>
        )}
        <H5 as="h3">{post.title}</H5>
        <Body16 className="text-black/50">{post.summary}</Body16>
      </div>
    </Link>
  );
}
