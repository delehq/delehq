"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { PROFILE_ID } from "@/lib/constants";

const SOCIAL_PLATFORMS = ["x", "instagram", "linkedin", "github", "youtube", "website"] as const;

export async function updateProfile(formData: FormData) {
  await requireAdminSession();

  const socialLinks = SOCIAL_PLATFORMS.map((platform) => ({
    platform,
    url: String(formData.get(`social_${platform}`) ?? "").trim(),
  })).filter((link) => link.url);

  const data = {
    id: PROFILE_ID,
    full_name: String(formData.get("full_name") ?? "").trim(),
    tagline: String(formData.get("tagline") ?? "").trim(),
    bio: String(formData.get("bio") ?? "").trim(),
    headshot_path: (formData.get("headshot_path") as string) || null,
    resume_path: (formData.get("resume_path") as string) || null,
    footer_headline: String(formData.get("footer_headline") ?? "").trim() || null,
    location: (formData.get("location") as string) || null,
    contact_email: (formData.get("contact_email") as string) || null,
    social_links: socialLinks,
  };

  const supabase = await createClient();
  const { error } = await supabase.from("profile").upsert(data);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/profile");
  revalidatePath("/", "layout");
  redirect("/admin/profile");
}
