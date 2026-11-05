import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation, site } from "@/config/site";
import { Container } from "@/components/section";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-provider";
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <Container className="flex min-h-22 flex-wrap items-center justify-between gap-2 py-3">
        <Link href="/" aria-label="AIM Digital home" className="logo-window">
          <Image
            src="/brand/aim-digital.webp"
            alt="AIM Digital — Empowering Vision"
            width={1559}
            height={520}
            priority
            sizes="400px"
            className="logo-image"
          />
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 xl:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden sm:inline-flex">
            <a href={site.quoteUrl}>
              Let’s talk <ArrowUpRight className="size-4" />
            </a>
          </Button>
          <details className="relative xl:hidden">
            <summary className="cursor-pointer rounded-full border border-border px-4 py-3 text-sm">
              Menu
            </summary>
            <nav
              aria-label="Mobile navigation"
              className="absolute right-0 mt-3 w-64 rounded-2xl border border-border bg-background p-3 shadow-xl"
            >
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block rounded-lg px-4 py-3 hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={site.quoteUrl}
                className="block px-4 py-3 font-semibold text-primary"
              >
                Request a quote
              </a>
            </nav>
          </details>
        </div>
      </Container>
    </header>
  );
}
