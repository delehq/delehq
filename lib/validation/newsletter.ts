import { z } from "zod";

export const NewsletterFormSchema = z.object({
  email: z.string().trim().email("Enter a valid email."),
});

export type NewsletterFormState =
  | {
      error?: string;
      success?: boolean;
      alreadySubscribed?: boolean;
    }
  | undefined;
