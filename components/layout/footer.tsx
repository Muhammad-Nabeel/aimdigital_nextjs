import { ArrowUpRight, MessageCircle } from "lucide-react";
import { site, addressLine, navigation, legalNavigation } from "@/config/site";
import { Container } from "@/components/section";
import Link from "next/link";
export function Footer() {
  return (
    <>
      <footer className="border-t border-border pb-28 pt-16 sm:pb-8">
        <Container>
          <div className="grid gap-10 md:grid-cols-[2fr_1fr_1.5fr]">
            <div>
              <Link href="/" className="text-2xl font-bold tracking-tight">
                AIM<span className="text-primary"> DIGITAL</span>
              </Link>
              <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">
                Software, commerce and marketing.
                <br />
                Built around your next stage of growth.
              </p>
              <div className="mt-5 flex flex-wrap gap-5 text-sm">
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn ↗
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a
                  href={site.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook ↗
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a
                  href={site.socials.clutch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  View our Clutch profile
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
            <nav aria-label="Footer navigation" className="flex flex-col gap-3">
              {navigation.map((item) => (
                <Link key={item.label} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="space-y-3 text-sm">
              <a className="font-semibold" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              <p>
                <a href={`tel:${site.phone.replaceAll(" ", "")}`}>
                  {site.phone}
                </a>
              </p>
              <p className="leading-relaxed text-muted-foreground">
                {addressLine}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine)}`}
                className="inline-flex items-center gap-1 text-primary"
              >
                View address on map <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
            <p>
              © {new Date().getFullYear()} {site.name}. Registered in England &
              Wales: {site.companyNumber}.
            </p>
            <nav aria-label="Legal" className="flex flex-wrap gap-5">
              {legalNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </Container>
      </footer>
      <a
        href={site.whatsapp}
        aria-label="Contact AIM Digital on WhatsApp"
        className="fixed bottom-24 right-5 z-30 flex size-13 items-center justify-center rounded-full bg-foreground text-background shadow-lg sm:bottom-6"
      >
        <MessageCircle className="size-6" />
      </a>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-background p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-center text-sm font-semibold sm:hidden">
        <a
          className="rounded-full bg-action px-3 py-3 text-white"
          href={site.quoteUrl}
        >
          Request a quote
        </a>
        <a className="px-3 py-3" href={site.bookingUrl}>
          Free discovery ↗
        </a>
      </div>
    </>
  );
}
