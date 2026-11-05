"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  quoteBudgets,
  quoteEmail,
  quoteServices,
  quoteTimelines,
} from "@/lib/quote";

const control =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground";

export function QuoteForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const requestId = useRef<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    requestId.current ??= crypto.randomUUID();
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, requestId: requestId.current }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setError(
          result.error || "We couldn’t send your request. Please try again.",
        );
        return;
      }
      setSuccess(true);
      form.reset();
      requestId.current = null;
    } catch {
      setError(
        "We couldn’t send your request. Please check your connection and try again, or email us directly.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mt-10 rounded-3xl border border-border bg-card p-6 sm:p-8">
      <div role="status" aria-live="polite">
        {success && (
          <div className="rounded-xl bg-muted p-6">
            <h2 className="text-xl font-semibold">
              Thank you — your quote request has been sent.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Our team will review your requirements and reply to the email
              address you provided.
            </p>
            <Button
              className="mt-5"
              variant="outline"
              onClick={() => setSuccess(false)}
            >
              Send another request
            </Button>
          </div>
        )}
      </div>
      {!success && (
        <form
          onSubmit={submit}
          onChange={() => {
            requestId.current = null;
          }}
          aria-busy={pending}
        >
          <p className="mb-6 text-sm text-muted-foreground">
            Fields marked * are required. Choose “Not sure yet” if you don’t
            have a budget.
          </p>
          <fieldset disabled={pending} className="grid gap-6 sm:grid-cols-2">
            <legend className="sr-only">
              Your contact and project details
            </legend>
            <label className="font-medium">
              Your name *
              <input
                className={control}
                name="name"
                autoComplete="name"
                required
                maxLength={100}
              />
            </label>
            <label className="font-medium">
              Email address *
              <input
                className={control}
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
              />
            </label>
            <label className="font-medium">
              Company (optional)
              <input
                className={control}
                name="company"
                autoComplete="organization"
                maxLength={150}
              />
            </label>
            <label className="font-medium">
              Phone (optional)
              <input
                className={control}
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={40}
              />
            </label>
            <label className="font-medium sm:col-span-2">
              What do you need help with? *
              <select
                className={control}
                name="service"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Choose a service
                </option>
                {quoteServices.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="font-medium">
              Estimated budget *
              <select
                className={control}
                name="budget"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Choose a budget
                </option>
                {quoteBudgets.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="font-medium">
              When do you need it? *
              <select
                className={control}
                name="timeline"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Choose a timeframe
                </option>
                {quoteTimelines.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="font-medium sm:col-span-2">
              Tell us what you need *
              <textarea
                className={control}
                name="details"
                rows={6}
                required
                minLength={10}
                maxLength={5000}
                aria-describedby="details-help"
                placeholder="What would you like us to build, improve or help with? Include your website link, key features or goals if you have them."
              />
              <span
                id="details-help"
                className="mt-2 block text-sm font-normal text-muted-foreground"
              >
                A few sentences are enough (10–5,000 characters). Please don’t
                include passwords or payment details.
              </span>
            </label>
            <div hidden aria-hidden="true">
              <label>
                Leave this blank
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
          </fieldset>
          {error && (
            <p
              role="alert"
              className="mt-6 rounded-xl border border-border p-4"
            >
              {error}{" "}
              <a
                className="text-primary underline"
                href={`mailto:${quoteEmail}`}
              >
                Email our team
              </a>
              .
            </p>
          )}
          <p className="mt-6 text-sm text-muted-foreground">
            We’ll use these details to respond to your enquiry and prepare your
            quote. See our{" "}
            <Link href="/privacy" className="text-primary underline">
              privacy policy
            </Link>
            .
          </p>
          <Button type="submit" disabled={pending} className="mt-5">
            {pending ? "Sending your request…" : "Send quote request"}
          </Button>
          <noscript>
            <p className="mt-4">
              Please enable JavaScript to submit this form, or email{" "}
              {quoteEmail} with your requirements.
            </p>
          </noscript>
        </form>
      )}
    </div>
  );
}
