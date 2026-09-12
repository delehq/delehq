import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getPostBySlug, getRelatedPosts } from "@/lib/data/blog";
import { getProfile } from "@/lib/data/profile";
import { getMediaUrl } from "@/lib/supabase/storage";
import { GradientPlaceholder } from "@/components/site/GradientPlaceholder";
import { BlogCard } from "@/components/site/BlogCard";
import { BlogSidebar } from "@/components/site/BlogSidebar";
import { MarkdownContent } from "@/components/site/MarkdownContent";
import { H1b, H5, Body16, Body18, Label } from "@/components/ui/typography";
import { SITE_URL } from "@/lib/constants";

type PageProps = { params: Promise<{ slug: string }> };

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [related, profile] = await Promise.all([
    getRelatedPosts(post.id, 3),
    getProfile(),
  ]);
  const imageUrl = getMediaUrl(post.cover_image_path);
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    url: `${SITE_URL}/blog/${post.slug}`,
    ...(post.published_at && { datePublished: post.published_at }),
    dateModified: post.updated_at,
    ...(imageUrl && { image: imageUrl }),
    author: { "@type": "Person", name: profile?.full_name ?? "Ayodele John" },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 2, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  };

  const faqs = post.faqs ?? [];
  const faqJsonLd = faqs.length > 0 && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <section className="mx-auto max-w-[1080px] px-5 pt-[160px] pb-20 tablet:px-10 desktop:px-5">
        <div className="flex flex-col gap-10 desktop:flex-row desktop:items-start">
          <div className="min-w-0 flex-1">
            <H1b reveal className="max-w-[800px] text-balance">
              {post.title}
            </H1b>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-black/40">
              {date && <Body16>{date}</Body16>}
              {post.read_time_minutes && (
                <>
                  <span aria-hidden="true">·</span>
                  <Body16>{post.read_time_minutes} min read</Body16>
                </>
              )}
            </div>
            <Body18
              reveal
              trigger="mount"
              className="mt-6 max-w-[800px] text-black/60"
            >
              {post.summary}
            </Body18>

            <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-3xl">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1280px) 780px, 100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <GradientPlaceholder seed={post.title} />
              )}
            </div>

            <div className="mt-16">
              <MarkdownContent content={post.body} />
            </div>

            {faqs.length > 0 && (
              <div className="mt-16 border-t border-black/10 pt-10">
                <Label className="mb-6 block">/Frequently Asked Questions</Label>
                <div className="flex flex-col gap-6">
                  {faqs.map((faq) => (
                    <div key={faq.question}>
                      <H5 as="h3">{faq.question}</H5>
                      <Body16 className="mt-2 text-black/60">{faq.answer}</Body16>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <BlogSidebar contactEmail={profile?.contact_email ?? null} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1080px] px-5 pb-20 tablet:px-10 desktop:px-5">
          <Label className="mb-6 block">/More Articles</Label>
          <div className="grid grid-cols-1 gap-5 tablet:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "Post not found", robots: { index: false, follow: true } };
  }

  const imageUrl = getMediaUrl(post.cover_image_path);
  const url = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url,
      type: "article",
      ...(post.published_at && { publishedTime: post.published_at }),
      modifiedTime: post.updated_at,
      ...(imageUrl && { images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}
