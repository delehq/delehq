import type { Metadata } from "next";
import { getExperience } from "@/lib/data/experience";
import { getEducation } from "@/lib/data/education";
import { getCertifications } from "@/lib/data/certifications";
import { getSkillsGrouped } from "@/lib/data/skills";
import { getProfile } from "@/lib/data/profile";
import { getMediaUrl } from "@/lib/supabase/storage";
import { H1b, H4, H5, Body16, Body18, Label } from "@/components/ui/typography";
import { RevealBlock } from "@/components/ui/RevealBlock";
import { SPRING_LIST, listStagger } from "@/lib/motion/presets";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Ayodele John's work experience, education, certifications, and technical skills.",
};

function formatDate(date: string | null) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function DescriptionList({ description }: { description: string | null }) {
  if (!description) return null;
  const lines = description.split("\n").filter(Boolean);
  const isBulleted = lines.every((line) => line.trim().startsWith("- "));

  if (isBulleted) {
    return (
      <ul className="mt-3 list-disc space-y-2 pl-5">
        {lines.map((line, i) => (
          <Body16 key={i} as="li" className="text-black/60">
            {line.replace(/^-\s*/, "")}
          </Body16>
        ))}
      </ul>
    );
  }
  return <Body16 className="mt-3 text-black/60">{description}</Body16>;
}

export default async function AboutPage() {
  const [experience, education, certifications, skills, profile] = await Promise.all([
    getExperience(),
    getEducation(),
    getCertifications(),
    getSkillsGrouped(),
    getProfile(),
  ]);

  const resumeUrl = getMediaUrl(profile?.resume_path);

  return (
    <section className="mx-auto max-w-[1180px] px-5 pt-[180px] pb-20 tablet:px-10 desktop:px-5">
      <div className="flex flex-col gap-4 tablet:flex-row tablet:items-end tablet:justify-between">
        <H1b reveal className="max-w-[600px]">
          Experience &amp; Skills
        </H1b>
        {resumeUrl && (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center justify-center rounded-lg bg-black px-6 py-3 text-[14px] font-medium text-cream transition-colors hover:bg-black/85"
          >
            Download CV
          </a>
        )}
      </div>

      {experience.length > 0 && (
        <div className="mt-20">
          <Label className="mb-8 block">/Experience</Label>
          <div className="relative flex flex-col gap-12 border-l border-black/10 pl-8">
            {experience.map((item, i) => (
              <RevealBlock
                key={item.id}
                y={16}
                transition={{ ...SPRING_LIST, delay: listStagger(i) }}
                className="relative"
              >
                <span className="absolute top-1.5 -left-9.25 h-2.5 w-2.5 rounded-full bg-black" />
                <div className="flex flex-col gap-1 tablet:flex-row tablet:items-baseline tablet:justify-between">
                  <H5 as="h3">
                    {item.role} <span className="text-black/40">· {item.company}</span>
                  </H5>
                  <Body16 className="whitespace-nowrap text-black/40">
                    {formatDate(item.start_date)} — {formatDate(item.end_date) ?? "Present"}
                  </Body16>
                </div>
                {item.location && <Body16 className="mt-1 text-black/40">{item.location}</Body16>}
                <DescriptionList description={item.description} />
              </RevealBlock>
            ))}
          </div>
        </div>
      )}

      <div className="mt-20 grid grid-cols-1 gap-16 tablet:grid-cols-2">
        {education.length > 0 && (
          <div>
            <Label className="mb-8 block">/Education</Label>
            <div className="flex flex-col gap-8">
              {education.map((item, i) => (
                <RevealBlock
                  key={item.id}
                  y={16}
                  transition={{ ...SPRING_LIST, delay: listStagger(i) }}
                >
                  <H5 as="h3">{item.institution}</H5>
                  <Body16 className="mt-1 text-black/60">{item.credential}</Body16>
                  <Body16 className="mt-1 text-black/40">
                    {formatDate(item.start_date)}
                    {item.start_date && item.end_date ? " — " : ""}
                    {formatDate(item.end_date)}
                  </Body16>
                </RevealBlock>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <Label className="mb-8 block">/Certifications</Label>
            <div className="flex flex-col gap-8">
              {certifications.map((item, i) => (
                <RevealBlock
                  key={item.id}
                  y={16}
                  transition={{ ...SPRING_LIST, delay: listStagger(i) }}
                >
                  {item.credential_url ? (
                    <a
                      href={item.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5"
                    >
                      <H5 as="h3" className="transition-colors group-hover:text-red">
                        {item.name}
                      </H5>
                      <span
                        aria-hidden="true"
                        className="text-black/30 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        ↗
                      </span>
                    </a>
                  ) : (
                    <H5 as="h3">{item.name}</H5>
                  )}
                  <Body16 className="mt-1 text-black/60">{item.issuer}</Body16>
                  {item.issue_date && (
                    <Body16 className="mt-1 text-black/40">{formatDate(item.issue_date)}</Body16>
                  )}
                </RevealBlock>
              ))}
            </div>
          </div>
        )}
      </div>

      {skills.length > 0 && (
        <div className="mt-20">
          <Label className="mb-8 block">/Skills</Label>
          <div className="flex flex-col gap-10">
            {skills.map((group, gi) => (
              <RevealBlock
                key={group.category}
                y={16}
                transition={{ ...SPRING_LIST, delay: listStagger(gi) }}
              >
                <H4 as="h3">{group.category}</H4>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <span
                      key={item.id}
                      className="rounded-full border border-black/15 px-4 py-2 text-[14px] text-black/70 transition-colors hover:border-black/40 hover:bg-black/[0.03] hover:text-black"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      )}

      {experience.length === 0 &&
        education.length === 0 &&
        certifications.length === 0 &&
        skills.length === 0 && (
          <Body18 className="mt-16 text-black/40">Resume details coming soon.</Body18>
        )}
    </section>
  );
}
