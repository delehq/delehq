"use server";

import { createClient } from "@/lib/supabase/server";
import { ContactFormSchema, type ContactFormState } from "@/lib/validation/contact";

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot field (see components/site/ContactForm.tsx) — real visitors
  // never see or fill it in, so any value here means a bot. Report success
  // without writing anything, so the bot gets no signal to adapt to.
  if (formData.get("company")) {
    return { success: true };
  }

  const validated = ContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").insert(validated.data);

  if (error) {
    return { errors: { message: ["Something went wrong. Please try again."] } };
  }

  return { success: true };
}
