import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Store } from "lucide-react";
import { site } from "@/config/site";
import type { Service } from "@/content/services";
import { Button } from "@/components/ui/button";

function EbayShowcase({ compact = false }: { compact?: boolean }) {
  const store = site.ebay;
  const reportedDate = new Date(store.reportedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/London",
  });
  return (
    <section
      aria-label="Our own eBay selling experience"
      className="mt-10 overflow-hidden rounded-3xl border border-primary/25 bg-muted/50 p-6 sm:p-9"
    >
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-2">
            <Store className="size-4" /> Our own eBay account
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            We sell on eBay, too.
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            We bring hands-on selling experience to individual and business
            account management. Explore{" "}
            <span className="font-semibold text-foreground">
              {store.username}
            </span>{" "}
            to see our listings and read feedback directly on eBay.
          </p>
        </div>
        <div className="grid w-full grid-cols-2 gap-4 sm:w-auto">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-3xl font-semibold tracking-tight text-primary">
              {store.feedbackCount.toLocaleString("en-GB")}
            </p>
            <p className="mt-2 text-sm font-medium">Feedback</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Team-reported figure
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-3xl font-semibold tracking-tight text-primary">
              {store.experienceYears}
            </p>
            <p className="mt-2 text-sm font-medium">Years of eBay experience</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Approximate, team-reported
            </p>
          </div>
        </div>
      </div>
      {!compact && (
        <div className="mt-7 grid gap-5 sm:grid-cols-3">
          {[
            {
              title: "See our listings",
              text: "Explore how we organise products and present information to buyers.",
            },
            {
              title: "Read feedback on eBay",
              text: "Visit the original profile for current ratings and buyer comments.",
            },
            {
              title: "Discuss the day-to-day work",
              text: "Ask how we handle listings, order workflows and buyer communication within an agreed scope.",
            },
          ].map((item) => (
            <div key={item.title} className="border-t border-border pt-5">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      )}
      {!compact && store.screenshot && (
        <figure className="mt-7">
          <Image
            src={store.screenshot.src}
            alt={store.screenshot.alt}
            width={store.screenshot.width}
            height={store.screenshot.height}
            sizes="(max-width: 1280px) 100vw, 1100px"
            className="w-full rounded-2xl border border-border"
          />
          <figcaption className="mt-3 text-xs text-muted-foreground">
            Our eBay account · Screenshot captured {store.screenshot.capturedAt}
            . View the live profile for current information.
          </figcaption>
        </figure>
      )}
      <div className="mt-7 flex flex-wrap gap-3">
        <Button asChild>
          <a href={store.profileUrl} target="_blank" rel="noopener noreferrer">
            View our eBay account <ArrowUpRight className="size-4" />
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href={store.feedbackUrl} target="_blank" rel="noopener noreferrer">
            Read feedback on eBay <ArrowUpRight className="size-4" />
          </a>
        </Button>
        {compact && (
          <Button asChild variant="ghost">
            <Link href="/services/ebay-store-optimisation">
              Explore account management ↗
            </Link>
          </Button>
        )}
      </div>
      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
        Figures supplied by AIM Digital on {reportedDate}. This is our own
        selling account; feedback changes over time. View the live profile for
        the latest information.
      </p>
    </section>
  );
}
const showcases = { ebay: EbayShowcase };
export function ServiceShowcase({
  showcase,
  compact = false,
}: {
  showcase: Service["showcase"];
  compact?: boolean;
}) {
  if (!showcase) return null;
  const Showcase = showcases[showcase];
  return <Showcase compact={compact} />;
}
