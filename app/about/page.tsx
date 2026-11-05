import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CTABanner } from "@/components/cta-banner";
import { Leadership } from "@/components/home/leadership";
import { LogoCloud } from "@/components/home/logo-cloud";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "AIM Digital is a UK company building websites, software, SaaS and e-commerce solutions, with search and marketing support around them.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Start with the goal",
    text: "We begin with what your business needs to achieve, then choose the technology that fits, not the other way round.",
  },
  {
    title: "Agree it before we build it",
    text: "Scope, estimated hours and deadlines are agreed before paid work begins, so you know what you are getting.",
  },
  {
    title: "Build to hand over",
    text: "Every project ends with documentation and a handover, so you stay in control of what we build.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section>
        <Breadcrumbs items={[{ label: "About", href: "/about" }]} />
        <p className="eyebrow">About AIM Digital</p>
        <h1 className="section-title max-w-3xl">
          One partner for software, commerce and growth.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {site.name} is a UK company based in {site.address.city},{" "}
          {site.address.county}. We build business websites, custom software,
          SaaS products and online stores, and support them with search,
          marketing and content, so the pieces of your digital presence work
          together.
        </p>
        <ul className="mt-8 space-y-3 text-sm">
          {[
            `Registered in England & Wales, company number ${site.companyNumber}`,
            `Transparent pricing from ${new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(site.pricing.hourlyRateGBP)} per hour`,
            site.pricing.discovery.message,
          ].map((text) => (
            <li key={text} className="flex items-start gap-3">
              <Check className="size-5 shrink-0 text-primary" />
              {text}
            </li>
          ))}
        </ul>
        <div className="mt-16">
          <SectionHeading
            eyebrow="How we work"
            title="Clear plans. Honest conversations."
            description="The principles behind every project, from a quick fix to a new platform."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {principles.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-border bg-card p-7"
              >
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
          <Link
            href="/#process"
            className="mt-6 inline-block text-primary underline"
          >
            See our five-step process
          </Link>
        </div>
      </Section>
      <Leadership />
      <LogoCloud />
      <Section className="pt-0 sm:pt-0">
        <CTABanner />
      </Section>
    </>
  );
}
