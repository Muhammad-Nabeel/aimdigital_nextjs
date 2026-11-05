import type { Metadata } from "next";
import { site } from "@/config/site";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/content/services";
import { faqs } from "@/content/faqs";
import { projects } from "@/content/projects";
import { getPosts } from "@/lib/blog";
import { Section } from "@/components/section";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FAQAccordion } from "@/components/faq-accordion";
import { FAQSchema } from "@/components/faq-schema";
import { CTABanner } from "@/components/cta-banner";
import { ProjectCard } from "@/components/cards";
import { PostCard } from "@/components/blog/post-card";
import { ServiceShowcase } from "@/components/service-showcase";
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}
async function getService(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const service = services.find((entry) => entry.slug === slug);
  if (!service) notFound();
  return service;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const service = await getService(params);
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
  };
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = await getService(params);
  const questions = [
    ...faqs.filter((faq) => faq.relatedServices?.includes(service.slug)),
    ...faqs.filter(
      (faq) =>
        !faq.relatedServices?.length &&
        (faq.category === service.faqCategory || faq.category === "Pricing"),
    ),
  ].slice(0, 6);
  const related = (await getPosts()).filter((post) =>
    post.relatedServices.includes(service.slug),
  );
  const relevantProjects = projects.filter((project) =>
    project.services.includes(service.slug),
  );
  return (
    <Section>
      <Breadcrumbs
        items={[
          { label: "Services", href: "/services" },
          { label: service.shortTitle, href: `/services/${service.slug}` },
        ]}
      />
      <p className="eyebrow">{service.shortTitle}</p>
      <h1 className="section-title max-w-4xl">{service.title}</h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
        {service.answer}
      </p>
      <ServiceShowcase showcase={service.showcase} />
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-border p-7">
          <h2 className="text-2xl font-semibold">What is included?</h2>
          <ul className="mt-5 list-disc space-y-3 pl-5 text-muted-foreground">
            {service.included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl bg-muted p-7">
          <h2 className="text-2xl font-semibold">What will you receive?</h2>
          <ul className="mt-5 list-disc space-y-3 pl-5 text-muted-foreground">
            {service.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted-foreground">
            Final deliverables depend on the scope agreed in your proposal.
          </p>
        </section>
      </div>
      <section className="mt-14">
        <h2 className="text-3xl font-semibold">How does the project work?</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {service.process.map((step, index) => (
            <div key={step.title} className="border-t border-border pt-5">
              <p className="eyebrow">0{index + 1}</p>
              <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-14">
        <h2 className="text-3xl font-semibold">
          {service.comparison.question}
        </h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Comparison of approaches for {service.shortTitle}
            </caption>
            <thead>
              <tr className="bg-muted">
                <th scope="col" className="p-4">
                  Approach
                </th>
                <th scope="col" className="p-4">
                  What it means
                </th>
              </tr>
            </thead>
            <tbody>
              {service.comparison.rows.map((row) => (
                <tr key={row.option} className="border-b border-border">
                  <th scope="row" className="p-4 font-medium">
                    {row.option}
                  </th>
                  <td className="p-4 text-muted-foreground">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mt-14 rounded-2xl border border-border p-7">
        <h2 className="text-2xl font-semibold">How is pricing agreed?</h2>
        <p className="mt-4 font-semibold text-primary">
          {site.pricing.discovery.message}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {site.pricing.discovery.description}
        </p>
        <p className="mt-4 text-lg font-semibold text-primary">
          {service.pricing.mode === "from"
            ? `From £${service.pricing.fromGBP.toLocaleString("en-GB")}`
            : service.pricing.mode === "hourly"
              ? `Typically ${new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2 }).format(service.pricing.hourlyRateGBP)}/hour`
              : "Request a quote"}
        </p>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
          We discuss your requirements, estimated hours and project scope before
          work begins. {site.pricing.deadlineApproach} Platform fees,
          advertising spend and third-party subscriptions are identified
          separately where applicable. Milestones and any ongoing support are
          agreed for your project.
        </p>
      </section>
      <section className="mt-14">
        <h2 className="mb-6 text-3xl font-semibold">
          What could this look like?
        </h2>
        {relevantProjects.length ? (
          <div className="grid gap-8 md:grid-cols-3">
            {relevantProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-muted p-5 text-muted-foreground">
            Every project starts with a free discovery conversation, where we
            agree the goals, scope and what success looks like for you.{" "}
            <Link href="/work" className="text-primary underline">
              See the projects we have delivered
            </Link>
            .
          </p>
        )}
      </section>
      <section className="mt-14">
        <h2 className="mb-6 text-3xl font-semibold">
          What else should you know?
        </h2>
        <FAQAccordion items={questions} />
        <FAQSchema items={questions} />
        <Link href="/faq" className="mt-5 inline-block text-primary underline">
          Explore all project questions
        </Link>
      </section>
      <section className="mt-14">
        <h2 className="mb-6 text-3xl font-semibold">
          Which guides can help you plan?
        </h2>
        {related.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            More guidance for this service is in preparation.{" "}
            <Link href="/blog" className="text-primary underline">
              Browse our current guides
            </Link>
            .
          </p>
        )}
      </section>
      <CTABanner title={`Let’s discuss ${service.shortTitle.toLowerCase()}.`} />
    </Section>
  );
}
