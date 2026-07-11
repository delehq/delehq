import type { Metadata } from "next";
import { getPublishedProjects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/site/ProjectCard";
import { H1b, Body18 } from "@/components/ui/typography";
import { RevealBlock } from "@/components/ui/RevealBlock";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A showcase of Ayodele John's latest projects, highlighting thoughtful engineering, clear systems, and real-world results.",
};

export default async function WorkPage() {
  const projects = await getPublishedProjects();

  return (
    <section className="mx-auto max-w-[1180px] px-5 pt-[180px] pb-20 tablet:px-10 desktop:px-5">
      <H1b reveal className="max-w-[780px]">
        My Brightest Creations
      </H1b>
      <Body18
        reveal
        trigger="mount"
        className="mt-6 max-w-[460px] text-black/60"
      >
        A showcase of my latest projects, highlighting thoughtful engineering,
        clear systems, and real-world results.
      </Body18>

      {projects.length > 0 ? (
        <RevealBlock
          trigger="mount"
          className="mt-16 grid grid-cols-1 gap-5 tablet:grid-cols-2"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </RevealBlock>
      ) : (
        <p className="mt-16 text-black/40">Projects coming soon.</p>
      )}
    </section>
  );
}
