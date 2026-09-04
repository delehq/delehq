"use client";

import { useActionState } from "react";
import { FormButton } from "@/components/ui/FormButton";
import { submitContactForm } from "@/lib/actions/contact.actions";
import type { ContactFormState } from "@/lib/validation/contact";

const initialState: ContactFormState = undefined;

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContactForm, initialState);

  if (state?.success) {
    return (
      <div className="flex h-[456px] flex-col items-center justify-center gap-2 rounded-2xl bg-black p-8 text-center text-cream">
        <p className="text-[18px] font-medium">Message sent — thanks!</p>
        <p className="text-[14px] text-cream/60">I&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5 rounded-2xl bg-black p-4">
      {/* Honeypot: invisible to real visitors, but naive spam bots fill in
          every field they find. Any value here means it's a bot — see
          lib/actions/contact.actions.ts, which silently drops the submission
          without erroring so the bot has no signal to adapt to. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 opacity-0"
        style={{ left: "-9999px" }}
      />
      <Field
        id="name"
        name="name"
        label="Name"
        error={state?.errors?.name?.[0]}
      />
      <Field
        id="email"
        name="email"
        label="Email"
        type="email"
        error={state?.errors?.email?.[0]}
      />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-[14px] text-cream/60">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="resize-none rounded-lg border border-cream/15 bg-transparent px-4 py-3 text-cream outline-none focus:border-cream/40"
        />
        {state?.errors?.message && (
          <p className="text-[13px] text-red">{state.errors.message[0]}</p>
        )}
      </div>
      <FormButton
        type="submit"
        state={pending ? "loading" : "default"}
        className="bg-cream text-black hover:bg-cream/90"
      >
        Send message
      </FormButton>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[14px] text-cream/60">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        className="rounded-lg border border-cream/15 bg-transparent px-4 py-3 text-cream outline-none focus:border-cream/40"
      />
      {error && <p className="text-[13px] text-red">{error}</p>}
    </div>
  );
}
