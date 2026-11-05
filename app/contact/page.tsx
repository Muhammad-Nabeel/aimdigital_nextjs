import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Section } from "@/components/section";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { addressLine, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Contact AIM Digital by email, phone or WhatsApp, or request a quote. Free discovery for every new client.",
  alternates: { canonical: "/contact" },
};

const methods = [
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone.replaceAll(" ", "")}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Message us on WhatsApp",
    href: site.whatsapp,
  },
  {
    icon: MapPin,
    label: "Registered office",
    value: addressLine,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine)}`,
  },
];

export default function ContactPage() {
  return (
    <Section>
      <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
      <p className="eyebrow">Get in touch</p>
      <h1 className="section-title">Let’s talk about your project.</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {site.pricing.discovery.message} {site.pricing.discovery.description}
      </p>
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <ul className="grid gap-4 sm:grid-cols-2">
          {methods.map(({ icon: Icon, label, value, href }) => (
            <li key={label}>
              <a
                href={href}
                className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <Icon className="size-6 text-primary" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="font-medium break-words">{value}</span>
              </a>
            </li>
          ))}
        </ul>
        <aside className="rounded-3xl bg-action p-8 text-white">
          <h2 className="text-2xl font-semibold tracking-tight">
            Ready to share the details?
          </h2>
          <p className="mt-4 leading-relaxed text-white/90">
            Tell us what you want to achieve, your timing and budget. We’ll come
            back to you to arrange your free discovery conversation.
          </p>
          <Button
            asChild
            className="mt-6 bg-white text-blue-700 hover:bg-blue-50"
          >
            <a href={site.quoteUrl}>
              Request a quote <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </aside>
      </div>
      <p className="mt-12 text-sm text-muted-foreground">
        {site.name} is registered in England & Wales, company number{" "}
        {site.companyNumber}.
      </p>
    </Section>
  );
}
