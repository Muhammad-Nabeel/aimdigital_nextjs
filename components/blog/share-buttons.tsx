"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("Link copied.");
    } catch {
      setStatus("Copy failed. Select the link below to copy it manually.");
    }
  }
  return (
    <div className="mt-10 rounded-xl border border-border p-5">
      <p className="mb-3 font-semibold">Share this article</p>
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={copy}>
          Copy link
        </Button>
        <Button variant="outline" asChild>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a
            href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`}
          >
            Email
          </a>
        </Button>
      </div>
      <p role="status" className="mt-3 text-sm text-muted-foreground">
        {status}
      </p>
      {status.startsWith("Copy failed") && (
        <a href={url} className="break-all text-sm underline">
          {url}
        </a>
      )}
    </div>
  );
}
