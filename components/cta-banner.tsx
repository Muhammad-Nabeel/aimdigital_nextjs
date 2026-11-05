import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
export function CTABanner({
  title = "Ready to discuss your next step?",
}: {
  title?: string;
}) {
  return (
    <aside className="mt-14 rounded-3xl bg-action px-7 py-10 text-white">
      <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
      <p className="mb-6 mt-4 max-w-2xl leading-relaxed text-white/90">
        Share your goals, current setup and any timing or budget considerations.
        {site.pricing.discovery.message} We’ll discuss an appropriate scope with
        you.
      </p>
      <div className="flex flex-wrap items-center gap-5">
        <Button asChild className="bg-white text-blue-700 hover:bg-blue-50">
          <a href={site.quoteUrl}>Request a quote ↗</a>
        </Button>
        <a
          href={site.bookingUrl}
          className="font-semibold underline underline-offset-4"
        >
          Book free discovery ↗
        </a>
      </div>
    </aside>
  );
}
