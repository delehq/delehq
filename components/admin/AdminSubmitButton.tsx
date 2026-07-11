"use client";

import { useFormStatus } from "react-dom";
import { FormButton } from "@/components/ui/FormButton";

export function AdminSubmitButton({ children = "Save" }: { children?: string }) {
  const { pending } = useFormStatus();
  return (
    <FormButton type="submit" state={pending ? "loading" : "default"}>
      {children}
    </FormButton>
  );
}
