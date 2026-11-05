import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/section";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProjectCard } from "@/components/cards";
import { CTABanner } from "@/components/cta-banner";
import { ServiceShowcase } from "@/components/service-showcase";
import { projects } from "@/content/projects";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Our work",
  description:
    "Explore client projects for Faremakers, FastSports, Samir & Aly and Almarah Foundation UK, plus our director's BusyBees Dubai experience.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <Section>
      <Breadcrumbs items={[{ label: "Our work", href: "/work" }]} />
      <p className="eyebrow">Experience in practice</p>
      <h1 className="section-title">Our work</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Travel websites, broadcast graphics control, website improvements and an
        ERP system in progress. Explore our client projects and our director’s
        personal project experience.
      </p>
      <section className="mt-12">
        <SectionHeading
          eyebrow="Selected client work"
          title="Real projects. Practical experience."
          description="Explore the work we’ve contributed to, with ongoing projects and our director’s personal involvement clearly identified."
        />
        <div className="grid gap-10 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
      {services
        .filter((service) => service.showcase)
        .map((service) => (
          <ServiceShowcase key={service.slug} showcase={service.showcase} />
        ))}
      <CTABanner />
    </Section>
  );
}
