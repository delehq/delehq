"use server";

import { createClient } from "@/lib/supabase/server";
import { ContactFormSchema, type ContactFormState } from "@/lib/validation/contact";

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
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
