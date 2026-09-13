"use server";

import { subscribeToNewsletter } from "@/lib/newsletter";
import { NewsletterFormSchema, type NewsletterFormState } from "@/lib/validation/newsletter";

export async function submitNewsletterSignup(
  _prevState: NewsletterFormState,
  formData: FormData,
): Promise<NewsletterFormState> {
  // Honeypot field (see components/site/NewsletterForm.tsx) — same pattern
  // as the contact form. Any value here means a bot; report success without
  // actually subscribing anything, so the bot has no signal to adapt to.
  if (formData.get("company")) {
    return { success: true };
  }

  const validated = NewsletterFormSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors.email?.[0] };
  }

  const result = await subscribeToNewsletter(validated.data.email);

  if (!result.success) {
    return { error: result.error };
  }

  return { success: true, alreadySubscribed: result.alreadySubscribed };
}
