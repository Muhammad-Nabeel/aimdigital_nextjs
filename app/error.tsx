"use client";
import { Button } from "@/components/ui/button";
export default function ErrorBoundary({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-7xl px-8 py-24">
      <h1 className="text-4xl font-semibold">Something went wrong.</h1>
      <p className="my-6 text-muted-foreground">
        Please try loading this page again.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
