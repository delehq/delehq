"use client";

import { useActionState } from "react";
import { FormButton } from "@/components/ui/FormButton";
import { submitNewsletterSignup } from "@/lib/actions/newsletter.actions";
import type { NewsletterFormState } from "@/lib/validation/newsletter";

const initialState: NewsletterFormState = undefined;

export function NewsletterForm() {
  const [state, action, pending] = useActionState(submitNewsletterSignup, initialState);

  if (state?.success) {
    return (
      <div className="rounded-2xl bg-black p-6 text-center text-cream">
        <p className="text-[16px] font-medium">
          {state.alreadySubscribed ? "You're already on the list!" : "You're in — thanks!"}
        </p>
        <p className="mt-1 text-[13px] text-cream/60">
          {state.alreadySubscribed
            ? "That email is already subscribed."
            : "Check your inbox to confirm your subscription."}
        </p>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="flex flex-col gap-4 rounded-2xl bg-black p-6 tablet:flex-row tablet:items-end tablet:gap-3"
    >
      {/* Honeypot — same pattern as ContactForm. Real visitors never see or
          fill this in; see lib/actions/newsletter.actions.ts. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 opacity-0"
        style={{ left: "-9999px" }}
      />
      <div className="flex flex-1 flex-col gap-1.5">
        <label htmlFor="newsletter-email" className="text-[14px] font-medium text-cream">
          Get new posts in your inbox
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          className="rounded-lg border border-cream/15 bg-transparent px-4 py-3 text-cream outline-none focus:border-cream/40"
        />
        {state?.error && <p className="text-[13px] text-red">{state.error}</p>}
      </div>
      <FormButton
        type="submit"
        state={pending ? "loading" : "default"}
        className="bg-cream text-black hover:bg-cream/90"
      >
        Subscribe
      </FormButton>
    </form>
  );
}
