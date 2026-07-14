import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateTestimonial, deleteTestimonial } from "@/lib/actions/testimonials.actions";
import { TestimonialForm } from "@/components/admin/TestimonialForm";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditTestimonialPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: item } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!item) notFound();

  return (
    <TestimonialForm
      heading="Edit testimonial"
      submitLabel="Save changes"
      action={updateTestimonial.bind(null, id)}
      deleteAction={deleteTestimonial.bind(null, id)}
      defaults={item}
    />
  );
}
