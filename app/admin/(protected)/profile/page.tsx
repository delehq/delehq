import { getProfile } from "@/lib/data/profile";
import { updateProfile } from "@/lib/actions/profile.actions";
import { TextField, TextAreaField } from "@/components/admin/fields";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { FileUploader } from "@/components/admin/FileUploader";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";

export default async function AdminProfilePage() {
  const profile = await getProfile();
  const links = new Map((profile?.social_links ?? []).map((l) => [l.platform, l.url]));

  return (
    <form action={updateProfile} className="flex max-w-[640px] flex-col gap-4">
      <h1 className="text-[24px] font-semibold">Profile</h1>
      <TextField name="full_name" label="Full name" defaultValue={profile?.full_name ?? ""} required />
      <TextField
        name="tagline"
        label="Tagline (hero title)"
        defaultValue={profile?.tagline ?? ""}
        required
      />
      <TextAreaField
        name="bio"
        label="Bio (leave a blank line between paragraphs)"
        rows={8}
        defaultValue={profile?.bio ?? ""}
        required
      />
      <ImageUploader
        name="headshot_path"
        label="Headshot"
        folder="headshots"
        defaultPath={profile?.headshot_path}
      />
      <FileUploader
        name="resume_path"
        label="Resume / CV (PDF)"
        folder="resume"
        accept="application/pdf"
        defaultPath={profile?.resume_path}
      />
      <TextField
        name="footer_headline"
        label="Footer headline (optional — falls back to the default if left blank)"
        defaultValue={profile?.footer_headline ?? ""}
      />
      <TextField name="location" label="Location" defaultValue={profile?.location ?? ""} />
      <TextField
        name="contact_email"
        label="Contact email"
        type="email"
        defaultValue={profile?.contact_email ?? ""}
      />
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
        <TextField name="social_x" label="X / Twitter URL" defaultValue={links.get("x") ?? ""} />
        <TextField name="social_instagram" label="Instagram URL" defaultValue={links.get("instagram") ?? ""} />
        <TextField name="social_linkedin" label="LinkedIn URL" defaultValue={links.get("linkedin") ?? ""} />
        <TextField name="social_github" label="GitHub URL" defaultValue={links.get("github") ?? ""} />
        <TextField name="social_youtube" label="YouTube URL" defaultValue={links.get("youtube") ?? ""} />
        <TextField name="social_website" label="Website URL" defaultValue={links.get("website") ?? ""} />
      </div>
      <AdminSubmitButton>Save changes</AdminSubmitButton>
    </form>
  );
}
