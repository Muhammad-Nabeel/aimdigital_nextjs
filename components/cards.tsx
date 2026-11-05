import Image from "next/image";
import {
  ArrowUpRight,
  Code2,
  Search,
  ChartNoAxesCombined,
  Store,
  Sparkles,
  ShoppingCart,
  PenTool,
  LifeBuoy,
  Layers,
  Package,
} from "lucide-react";
import type { Service } from "@/content/services";

import type { Project } from "@/content/projects";
import { clients } from "@/content/testimonials";
import Link from "next/link";
const icons = {
  code: Code2,
  search: Search,
  chart: ChartNoAxesCombined,
  store: Store,
  sparkles: Sparkles,
  cart: ShoppingCart,
  pen: PenTool,
  support: LifeBuoy,
  layers: Layers,
  package: Package,
};
export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const Icon = icons[service.icon];
  return (
    <article className="group rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/50">
      <div className="mb-8 flex items-center justify-between">
        <Icon className="size-7 text-primary" />
        <span className="font-mono text-xs text-muted-foreground">
          0{index + 1}
        </span>
      </div>
      <h3 className="text-xl font-semibold tracking-tight">
        {service.shortTitle}
      </h3>
      <p className="mb-6 mt-3 text-sm leading-7 text-muted-foreground">
        {service.description}
      </p>
      <Link
        href={`/services/${service.slug}`}
        className="inline-flex items-center gap-2 text-sm font-semibold"
      >
        Explore {service.shortTitle.toLowerCase()}{" "}
        <ArrowUpRight className="size-4 text-primary" />
      </Link>
    </article>
  );
}
export function ProjectCard({ project }: { project: Project }) {
  const client = clients.find((entry) => entry.name === project.clientName);
  if (!client)
    throw new Error(`Missing client details for ${project.clientName}`);
  const statusLabels = {
    "client-project": "Client project",
    "in-progress": "In progress",
    "director-experience": "Director experience",
  };
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="bg-muted/50 p-6">
        <a
          href={client.website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${client.name} website (opens in a new tab)`}
          className="flex h-28 items-center justify-center overflow-hidden rounded-xl bg-white p-5 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <Image
            src={client.logo.src}
            alt={client.logo.alt}
            width={client.logo.width}
            height={client.logo.height}
            sizes="200px"
            className={
              client.logo.padded
                ? "h-52 w-52 max-w-full shrink-0 object-contain"
                : "max-h-20 w-auto max-w-full object-contain"
            }
          />
        </a>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold">{project.clientName}</p>
          <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium">
            {statusLabels[project.status]}
          </span>
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-primary">
          {project.category}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <ul className="mt-5 list-disc space-y-2 pl-4 text-sm text-muted-foreground">
          {project.scope.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          <p className="border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
            {project.attribution}
          </p>
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"
            >
              Visit client website <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
