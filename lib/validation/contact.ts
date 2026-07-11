import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(120),
  email: z.string().trim().email("Enter a valid email."),
  message: z.string().trim().min(10, "Message should be at least 10 characters.").max(5000),
});

export type ContactFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        message?: string[];
      };
      success?: boolean;
    }
  | undefined;
