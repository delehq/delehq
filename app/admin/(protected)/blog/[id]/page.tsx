import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateBlogPost, deleteBlogPost } from "@/lib/actions/blog.actions";
import { BlogForm } from "@/components/admin/BlogForm";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditBlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: item } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!item) notFound();

  return (
    <BlogForm
      heading="Edit blog post"
      submitLabel="Save changes"
      action={updateBlogPost.bind(null, id)}
      deleteAction={deleteBlogPost.bind(null, id)}
      defaults={item}
    />
  );
}
