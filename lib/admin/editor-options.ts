import "server-only";
import { authors } from "@/content/blog/schema";
import { services } from "@/content/services";

// Plain options so the client editor does not bundle the full service content.
export const editorOptions = {
  services: services.map((service) => ({ value: service.slug, label: service.title })),
  authors: Object.entries(authors).map(([value, author]) => ({ value, label: author.name })),
};
