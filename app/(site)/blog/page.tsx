import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/data/blog";
import { BlogCard } from "@/components/site/BlogCard";
import { H1b, Body18 } from "@/components/ui/typography";
import { RevealBlock } from "@/components/ui/RevealBlock";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on backend systems, fintech engineering, and product delivery from Ayodele John.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog — Ayodele John",
    description: "Writing on backend systems, fintech engineering, and product delivery from Ayodele John.",
    url: "/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <section className="mx-auto max-w-[1080px] px-5 pt-[180px] pb-20 tablet:px-10 desktop:px-5">
      <H1b reveal className="max-w-[620px]">
        My Brightest Thoughts
      </H1b>
      <Body18
        reveal
        trigger="mount"
        className="mt-6 max-w-[460px] text-black/60"
      >
        Discover ideas, perspectives, and lessons from building production
        systems.
      </Body18>

      {posts.length > 0 ? (
        <RevealBlock
          trigger="mount"
          className="mt-16 grid grid-cols-1 gap-5 tablet:grid-cols-3"
        >
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </RevealBlock>
      ) : (
        <p className="mt-16 text-black/40">No posts yet — check back soon.</p>
      )}
    </section>
  );
}
