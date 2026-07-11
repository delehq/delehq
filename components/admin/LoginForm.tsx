"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { FormButton } from "@/components/ui/FormButton";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    });

    setPending(false);
    if (signInError) {
      setError("Invalid email or password.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[360px] flex-col gap-4 rounded-2xl bg-black p-6 text-cream"
    >
      <h1 className="text-[20px] font-semibold">Admin sign in</h1>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-[14px] text-cream/60">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-lg border border-cream/15 bg-transparent px-4 py-3 text-cream outline-none focus:border-cream/40"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-[14px] text-cream/60">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="rounded-lg border border-cream/15 bg-transparent px-4 py-3 text-cream outline-none focus:border-cream/40"
        />
      </div>
      {error && <p className="text-[13px] text-red">{error}</p>}
      <FormButton type="submit" state={pending ? "loading" : "default"}>
        Sign in
      </FormButton>
    </form>
  );
}
