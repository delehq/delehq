import { getProfile } from "@/lib/data/profile";
import { getServices } from "@/lib/data/services";
import { getPublishedProjects } from "@/lib/data/projects";
import { getPublishedTestimonials } from "@/lib/data/testimonials";
import { getPublishedPosts } from "@/lib/data/blog";
import { getMediaUrl } from "@/lib/supabase/storage";
import { HeroSticky } from "@/components/site/HeroSticky";
import { QuoteSticky } from "@/components/site/QuoteSticky";
import { ServiceCard } from "@/components/site/ServiceCard";
import { ProjectCard } from "@/components/site/ProjectCard";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { BlogCard } from "@/components/site/BlogCard";
import { ContactForm } from "@/components/site/ContactForm";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { H2, Body18 } from "@/components/ui/typography";
import { TextArrowButton } from "@/components/ui/TextArrowButton";
import { RevealBlock } from "@/components/ui/RevealBlock";
import { SPRING_LIST, listStagger } from "@/lib/motion/presets";
import { SITE_URL } from "@/lib/constants";

export default async function HomePage() {
  const [profile, services, projects, testimonials, posts] = await Promise.all([
    getProfile(),
    getServices(),
    getPublishedProjects(2),
    getPublishedTestimonials(),
    getPublishedPosts(2),
  ]);

  const headshotUrl = getMediaUrl(profile?.headshot_path);
  const socialLinks = (profile?.social_links ?? []).filter(
    (s) => s.url && s.url !== "#",
  );

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile?.full_name ?? "Ayodele John",
    jobTitle: profile?.tagline ?? "Software Engineer",
    url: SITE_URL,
    ...(headshotUrl && { image: headshotUrl }),
    ...(profile?.location && { address: profile.location }),
    ...(profile?.contact_email && { email: profile.contact_email }),
    ...(socialLinks.length > 0 && { sameAs: socialLinks.map((s) => s.url) }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <HeroSticky
        headshotUrl={headshotUrl}
        fullName={profile?.full_name ?? "Ayodele John"}
        tagline={profile?.tagline ?? "SOFTWARE ENGINEER"}
        bio={
          profile?.bio ??
          "I'm a software engineer building production-grade platforms end-to-end."
        }
      />

      <QuoteSticky text="From idea to launch. Clean, scalable systems built to move fast, stay simple, and perform in real-world use, driven by clarity, structured systems, and intentional design." />

      {services.length > 0 && (
        <section
          id="services"
          className="mx-auto max-w-[1180px] px-5 py-20 tablet:px-10 desktop:px-5"
        >
          <H2 reveal trigger="inView" className="mb-10">
            Services
          </H2>
          <div className="flex flex-col">
            {services.map((service, i) => (
              <RevealBlock key={service.id} y={16} transition={{ ...SPRING_LIST, delay: listStagger(i) }}>
                <ServiceCard title={service.title} description={service.description} />
              </RevealBlock>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mx-auto max-w-[1180px] px-5 py-20 tablet:px-10 desktop:px-5">
          <div className="mb-10 flex items-end justify-between gap-4">
            <H2 reveal trigger="inView">
              Featured Projects
            </H2>
            <TextArrowButton href="/work">View All Work</TextArrowButton>
          </div>
          <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
            {projects.map((project, i) => (
              <RevealBlock key={project.id} transition={{ ...SPRING_LIST, delay: listStagger(i) }}>
                <ProjectCard project={project} />
              </RevealBlock>
            ))}
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="mx-auto max-w-[1180px] px-5 py-20 tablet:px-10 desktop:px-5">
          <H2 reveal trigger="inView" className="mb-10">
            Testimonials
          </H2>
          <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
            {testimonials.map((testimonial, i) => (
              <RevealBlock key={testimonial.id} transition={{ ...SPRING_LIST, delay: listStagger(i) }}>
                <TestimonialCard testimonial={testimonial} />
              </RevealBlock>
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section className="mx-auto max-w-[1180px] px-5 py-20 tablet:px-10 desktop:px-5">
          <H2 reveal trigger="inView" className="mb-10">
            Thoughts
          </H2>
          <div className="grid grid-cols-1 gap-4 tablet:grid-cols-3">
            {posts.map((post, i) => (
              <RevealBlock key={post.id} transition={{ ...SPRING_LIST, delay: listStagger(i) }}>
                <BlogCard post={post} />
              </RevealBlock>
            ))}
          </div>
        </section>
      )}

      <section
        id="contact"
        className="mx-auto max-w-[1180px] px-5 py-20 tablet:px-10 desktop:px-5"
      >
        <div className="flex flex-col gap-10 desktop:flex-row desktop:justify-between">
          <div className="flex max-w-[640px] flex-col gap-4">
            <H2 reveal trigger="inView">
              Let&apos;s talk.
            </H2>
            <Body18 className="text-black/60">
              Have a project in mind, or just want to say hi? I&apos;d love to hear
              from you.
            </Body18>
            {socialLinks.length > 0 && (
              <div className="mt-6 flex gap-3 desktop:mt-auto">
                {socialLinks.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="flex h-11 w-11 items-center justify-center rounded-lg bg-black/5 text-black/70 transition-colors hover:bg-black/10"
                  >
                    <SocialIcon platform={s.platform} />
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="w-full max-w-[500px]">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
