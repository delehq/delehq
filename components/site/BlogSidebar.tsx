import { Label, Body16 } from "@/components/ui/typography";

// Sticky companion card next to the article body. The source design used
// this slot for a newsletter signup; since v1 has no email service, it's
// repurposed as a direct contact prompt instead.
export function BlogSidebar({ contactEmail }: { contactEmail: string | null }) {
  return (
    <aside className="hidden shrink-0 desktop:sticky desktop:top-[100px] desktop:block desktop:w-[300px]">
      <div className="flex flex-col gap-3 rounded-2xl bg-black p-5 text-cream">
        <Label className="text-cream/50">/Get in touch</Label>
        <Body16 className="text-cream/80">
          Have a project in mind, or a question about this post? I&apos;d love to
          hear from you.
        </Body16>
        {contactEmail && (
          <a
            href={`mailto:${contactEmail}`}
            className="text-[14px] underline underline-offset-2"
          >
            {contactEmail}
          </a>
        )}
      </div>
    </aside>
  );
}
