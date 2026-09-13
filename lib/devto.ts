import "server-only";

// Cross-posts a published blog post to dev.to, with canonical_url pointing
// back to deledev.com so search engines credit the original, while dev.to's
// own audience can still discover and read it there.
//
// Deliberately does nothing (returns null) if DEVTO_API_KEY isn't set, same
// pattern as the Gmail notification and IndexNow helpers — this is a
// nice-to-have layered on top of publishing, never a requirement for it.
export async function crossPostToDevTo({
  title,
  bodyMarkdown,
  canonicalUrl,
  coverImageUrl,
  tags,
}: {
  title: string;
  bodyMarkdown: string;
  canonicalUrl: string;
  coverImageUrl?: string | null;
  tags: string[];
}): Promise<string | null> {
  const apiKey = process.env.DEVTO_API_KEY;
  if (!apiKey) return null;

  const res = await fetch("https://dev.to/api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      article: {
        title,
        body_markdown: bodyMarkdown,
        published: true,
        canonical_url: canonicalUrl,
        tags: tags.slice(0, 4).join(","),
        ...(coverImageUrl && { main_image: coverImageUrl }),
      },
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`dev.to API returned ${res.status}: ${detail}`);
  }

  const article = (await res.json()) as { url?: string };
  return article.url ?? null;
}
