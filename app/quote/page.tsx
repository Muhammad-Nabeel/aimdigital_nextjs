import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { QuoteForm } from "@/components/quote-form";
import { quoteEmail } from "@/lib/quote";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Tell AIM Digital what you need. Send your project details to our team for a quote.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <Section>
      <Breadcrumbs items={[{ label: "Request a quote", href: "/quote" }]} />
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Let’s discuss your project</p>
        <h1 className="section-title">Request a quote</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Tell us what you need using the simple form below. We’ll review your
          requirements and contact you to discuss your quote, scope and
          deadlines. Discovery is free for every new client.
        </p>
        <p className="mt-4 text-muted-foreground">
          Prefer email? Contact{" "}
          <a
            className="font-semibold text-primary underline"
            href={`mailto:${quoteEmail}`}
          >
            {quoteEmail}
          </a>
          .
        </p>
        <QuoteForm />
      </div>
    </Section>
  );
}
