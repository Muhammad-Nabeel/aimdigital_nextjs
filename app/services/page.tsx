import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ServiceCard } from "@/components/cards";
import { CTABanner } from "@/components/cta-banner";
import { services } from "@/content/services";
import { ServiceShowcase } from "@/components/service-showcase";
export const metadata: Metadata = {
  title: "Software, e-commerce and digital marketing services",
  description:
    "Explore AIM Digital services across AI-powered development, SaaS, digital products, search, digital marketing, marketplaces, commerce, copywriting and support.",
  alternates: { canonical: "/services" },
};
export default function ServicesPage() {
  return (
    <Section>
      <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />
      <p className="eyebrow">Connected digital services</p>
      <h1 className="section-title">
        Start with your goal.
        <br />
        Find the right solution.
      </h1>
      <p className="mb-12 mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        From a focused technical fix to a new digital platform, explore how we
        can support the next stage of your business.
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <ServiceCard key={service.slug} service={service} index={index} />
        ))}
      </div>
      {services
        .filter((service) => service.showcase)
        .map((service) => (
          <ServiceShowcase
            key={service.slug}
            showcase={service.showcase}
            compact
          />
        ))}
      <CTABanner />
    </Section>
  );
}
