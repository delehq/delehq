import { createBlogPost } from "@/lib/actions/blog.actions";
import { BlogForm } from "@/components/admin/BlogForm";

export default function NewBlogPostPage() {
  return <BlogForm heading="New blog post" submitLabel="Create" action={createBlogPost} />;
}
