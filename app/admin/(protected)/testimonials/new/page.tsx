import { createTestimonial } from "@/lib/actions/testimonials.actions";
import { TestimonialForm } from "@/components/admin/TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <TestimonialForm heading="New testimonial" submitLabel="Create" action={createTestimonial} />
  );
}
