import Link from "next/link";
import { Section } from "@/components/section";
export default function NotFound() {
  return (
    <Section>
      <p className="eyebrow">404</p>
      <h1 className="mt-5 text-4xl font-semibold">
        This page couldn’t be found.
      </h1>
      <p className="mt-5 text-muted-foreground">
        The address may have changed. Start from the home page to find what you
        need.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block font-semibold text-primary underline"
      >
        Return to home
      </Link>
    </Section>
  );
}
