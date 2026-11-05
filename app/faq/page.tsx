import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FAQSearch } from "@/components/faq-search";
import { FAQSchema } from "@/components/faq-schema";
import { CTABanner } from "@/components/cta-banner";
import { faqs } from "@/content/faqs";
export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Answers about AIM Digital projects, pricing, AI development, SEO, eBay, Etsy, digital marketing and technical support.",
  alternates: { canonical: "/faq" },
};
export default function FAQPage() {
  return (
    <Section>
      <Breadcrumbs items={[{ label: "FAQ", href: "/faq" }]} />
      <p className="eyebrow">Questions before a project</p>
      <h1 className="section-title">Clear answers. A better starting point.</h1>
      <p className="mb-10 mt-5 max-w-2xl text-lg text-muted-foreground">
        Search by topic or browse the categories below. Project-specific
        commitments belong in your agreed proposal.
      </p>
      <FAQSearch items={faqs} />
      <FAQSchema items={faqs} />
      <CTABanner title="Still have a question?" />
    </Section>
  );
}
