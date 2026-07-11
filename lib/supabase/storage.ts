// Public Storage URLs are deterministic — no client/auth needed to build one.
export function getMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return `${base}/storage/v1/object/public/media/${path}`;
}
