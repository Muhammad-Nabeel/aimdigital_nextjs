import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { LogoCloud } from "@/components/home/logo-cloud";
import { Pricing } from "@/components/home/pricing";
import { Section, SectionHeading } from "@/components/section";
import { ServiceCard, ProjectCard } from "@/components/cards";
import { FAQAccordion } from "@/components/faq-accordion";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { stats } from "@/content/testimonials";
import { faqs } from "@/content/faqs";
import { getPosts } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";
import { Leadership } from "@/components/home/leadership";
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "AIM Digital | AI Software, E-commerce & Digital Marketing",
};
const process = [
  {
    title: "Discover",
    text: `${site.pricing.discovery.message} Understand your business, customers and the challenge worth solving.`,
  },
  {
    title: "Plan",
    text: "Agree the priorities, scope, responsibilities and a realistic delivery plan.",
  },
  {
    title: "Build",
    text: "Develop the solution with clear communication and opportunities to review.",
  },
  {
    title: "Launch",
    text: "Test the experience, prepare the handover and bring your project online.",
  },
  {
    title: "Grow",
    text: "Review what is working and discuss the improvements that matter next.",
  },
];
// eBay is offered on /services but kept off the home page.
const homeServices = services.filter(
  (service) => service.slug !== "ebay-store-optimisation",
);
export default async function Home() {
  const posts = (await getPosts()).slice(0, 3);
  return (
    <>
      <Hero />
      <LogoCloud />
      <Section id="services" className="bg-muted/50">
        <SectionHeading
          eyebrow="What we do"
          title="One partner. Your whole digital picture."
          description="Start with a single challenge or connect the pieces. Our services work together around your business goals."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeServices.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </Section>
      <Pricing />
      <Section id="work">
        <Link
          href="/work"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          Explore our work <ArrowUpRight className="size-4" />
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <SectionHeading
            eyebrow="Selected client work"
            title="Real projects. Practical experience."
            description="From travel websites and broadcast graphics control to website improvements and ongoing ERP development, explore our work and our director’s personal project experience."
          />
          <span className="rounded-full border border-border px-4 py-2 text-xs text-muted-foreground">
            Client projects & director experience
          </span>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>
      <Section id="process" className="bg-[#0f172a] text-white">
        <p className="eyebrow text-blue-300">How we work</p>
        <h2 className="section-title max-w-2xl">
          A clear path from
          <br />
          “what if” to what’s next.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed opacity-75">
          Know what we are building, why it matters and where you fit in. We
          agree clear, simple deadlines and milestones around your project.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {process.map((step, index) => (
            <div key={step.title} className="border-t border-current/25 pt-6">
              <p className="font-mono text-sm text-blue-300">0{index + 1}</p>
              <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 opacity-75">{step.text}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <div className="max-w-3xl">
          <div>
            <SectionHeading
              eyebrow="Built on clarity"
              title="Trust starts with the details."
              description="A registered UK company, a direct conversation and a proposal shaped around what you actually need."
            />
            <ul className="space-y-4">
              {[
                "Registered in England & Wales",
                `Company number ${site.companyNumber}`,
                "Project scope and pricing discussed before work begins",
                "Data-handling requirements considered during discovery",
              ].map((text) => (
                <li key={text} className="flex items-start gap-3 text-sm">
                  <Check className="size-5 shrink-0 text-primary" />
                  {text}
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl font-semibold text-muted-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
      <Section id="faq" className="bg-muted/50">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <SectionHeading
            eyebrow="Before we begin"
            title="Good questions. Clear answers."
            description="A few things you may want to know before discussing your project."
          />
          <FAQAccordion
            items={faqs
              .filter((faq) => !faq.relatedServices?.length)
              .slice(0, 4)}
          />
        </div>
      </Section>
      {posts.length > 0 && (
        <Section id="insights">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            View all articles <ArrowUpRight className="size-4" />
          </Link>
          <SectionHeading
            eyebrow="Latest insights"
            title="Useful thinking for your next move."
            description="Practical guidance on building, selling and being found online."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </Section>
      )}
      <Leadership />
      <Section id="contact">
        <div className="relative overflow-hidden rounded-3xl bg-action px-6 py-14 text-white sm:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Let’s build what’s next
          </p>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-8">
            <div>
              <h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Your next chapter
                <br />
                starts with a conversation.
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-white/85">
                {site.pricing.discovery.message} Tell us what you want to
                achieve. We’ll discuss the approach, scope and next steps with
                you.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                asChild
                className="bg-white text-blue-700 hover:bg-blue-50"
              >
                <a href={site.quoteUrl}>
                  Request a quote <ArrowUpRight className="size-4" />
                </a>
              </Button>
              <a
                href={site.bookingUrl}
                className="px-6 py-3 text-center text-sm font-semibold underline underline-offset-4"
              >
                Book free discovery ↗
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
