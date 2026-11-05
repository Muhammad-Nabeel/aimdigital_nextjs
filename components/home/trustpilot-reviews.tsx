"use client";

import { useRef } from "react";
import Script from "next/script";

export function TrustpilotReviews() {
  const widget = useRef<HTMLDivElement>(null);

  function loadWidget() {
    const trustpilot = (
      window as Window & {
        Trustpilot?: {
          loadFromElement: (element: HTMLElement, forceReload: boolean) => void;
        };
      }
    ).Trustpilot;

    if (widget.current && trustpilot) {
      trustpilot.loadFromElement(widget.current, true);
    }
  }

  return (
    <div className="mt-6 max-w-sm rounded-xl border border-border bg-white p-3 text-center text-slate-900">
      <Script
        id="trustpilot-bootstrap"
        src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        strategy="afterInteractive"
        onReady={loadWidget}
      />
      <div
        ref={widget}
        className="trustpilot-widget"
        data-locale="en-US"
        data-template-id="56278e9abfbbba0bdcd568bc"
        data-businessunit-id="6acee599c306c18a132fe9b4"
        data-style-height="52px"
        data-style-width="100%"
        data-token="7daa38e3-071f-46bd-a3f5-346ffbdb36fa"
        style={{ minHeight: 52 }}
      >
        <a
          href="https://www.trustpilot.com/review/aimdigitallimited.co.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-13 items-center justify-center gap-2 font-semibold underline underline-offset-4"
        >
          Review us on Trustpilot
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}
