import { Clock3, CalendarCheck, ListChecks } from "lucide-react";
import { site, standardHourlyRate } from "@/config/site";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
export function Pricing() {
  return (
    <Section id="pricing">
      <div className="grid gap-10 rounded-3xl border border-border bg-muted/50 p-7 sm:p-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="eyebrow">Straightforward pricing</p>
          <h2 className="section-title">
            Fair hourly rates.
            <br />
            Clear, simple deadlines.
          </h2>
          <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/10 p-5">
            <p className="font-semibold text-primary">
              {site.pricing.discovery.message}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {site.pricing.discovery.description}
            </p>
          </div>
          <p className="mt-6 text-5xl font-semibold tracking-tight text-primary">
            {standardHourlyRate}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Our typical rate for agreed project work.
          </p>
          <Button asChild className="mt-7">
            <a href={site.bookingUrl}>Book free discovery ↗</a>
          </Button>
        </div>
        <div className="flex flex-col justify-center gap-7">
          {[
            {
              icon: ListChecks,
              title: "A clear scope",
              text: "We discuss what you need and agree the work involved before starting.",
            },
            {
              icon: Clock3,
              title: "Estimated hours",
              text: "Your project estimate is based on the agreed scope and expected time required.",
            },
            {
              icon: CalendarCheck,
              title: "Simple deadlines",
              text:
                site.pricing.deadlineApproach +
                " We discuss the effect of scope changes on cost and delivery dates.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <Icon className="mt-1 size-6 shrink-0 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
