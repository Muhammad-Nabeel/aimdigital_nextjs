import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Container } from "@/components/section";
import { Button } from "@/components/ui/button";
import { site, standardHourlyRate } from "@/config/site";
import { TrustpilotReviews } from "@/components/home/trustpilot-reviews";
export function Hero() {
  return (
    <section className="hero-grid relative overflow-hidden border-b border-border">
      <Container className="relative grid items-center gap-14 py-20 lg:grid-cols-[1.15fr_1fr] lg:py-28">
        <div>
          <p className="eyebrow flex items-center gap-2">
            <span className="size-2 rounded-full bg-primary" /> Your next
            chapter, built digitally
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.06] tracking-[-0.055em] sm:text-6xl xl:text-7xl">
            Big ambitions.
            <br />
            Smart solutions.
            <br />
            <span className="text-primary">Built for growth.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            AIM Digital brings AI-powered software, e-commerce and digital
            marketing together to help your business grow online. From your
            first website to a more connected digital operation, we shape
            practical, scalable solutions around your goals, your customers and
            the next step you want to take.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href={site.quoteUrl}>
                Request a quote <ArrowUpRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={site.bookingUrl}>
                Book free discovery <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
          <p className="mt-4 text-sm font-semibold text-primary">
            {site.pricing.discovery.message}
          </p>
          <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="size-4 shrink-0 text-primary" />
            <span>
              UK registered · Typically {standardHourlyRate} · Clear deadlines.
            </span>
          </p>
          <TrustpilotReviews />
        </div>
        <div
          className="relative mx-auto w-full max-w-lg"
          aria-label="Illustration of connected digital services"
        >
          <div className="orb-glow absolute inset-8 rounded-full" />
          <div className="relative rounded-3xl border border-border bg-card p-6 shadow-2xl shadow-primary/10 sm:p-8">
            <div className="flex items-center justify-between border-b border-border pb-5">
              <div className="flex gap-1.5">
                <span className="size-2 rounded-full bg-primary" />
                <span className="size-2 rounded-full bg-border" />
                <span className="size-2 rounded-full bg-border" />
              </div>
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                YOUR DIGITAL ECOSYSTEM
              </span>
            </div>
            <div className="flex justify-center py-10">
              <div className="flex size-36 items-center justify-center rounded-[2rem] border border-primary/30 bg-primary/10 text-4xl font-bold tracking-tighter text-primary">
                AIM<span className="text-foreground">.</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["Build", "Connect", "Grow"].map((label, i) => (
                <div
                  key={label}
                  className="rounded-xl border border-border bg-background px-2 py-5 text-center"
                >
                  <p className="font-mono text-xs text-primary">0{i + 1}</p>
                  <p className="mt-2 text-sm font-semibold">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-3 rounded-xl bg-muted px-4 py-4">
              <Sparkles className="size-5 shrink-0 text-primary" />
              <p className="text-sm">
                <span className="font-semibold">AI-assisted. Human-led.</span>
                <br />
                <span className="text-xs text-muted-foreground">
                  Technology with a business purpose.
                </span>
              </p>
            </div>
          </div>
          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Strategy → Experience → Technology → Growth
          </p>
        </div>
      </Container>
    </section>
  );
}
