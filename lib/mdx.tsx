import "server-only";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import type { MDXComponents } from "mdx/types";
export type Heading = { id: string; title: string; level: number };
type Node = {
  type: string;
  value?: string;
  tagName?: string;
  children?: Node[];
  properties?: Record<string, unknown>;
};
function text(node: Node): string {
  return node.value || node.children?.map(text).join("") || "";
}
function safeMarkdown() {
  return (tree: Node) => {
    function walk(node: Node) {
      if (node.type === "image")
        throw new Error("Use the cover-image upload for article images. Inline Markdown images are not supported.");
      if (node.type.startsWith("mdx"))
        throw new Error(
          "Blog content must use Markdown only: imports, expressions and JSX are not permitted.",
        );
      if (
        node.type === "heading" &&
        (node as Node & { depth: number }).depth === 1
      )
        throw new Error(
          "Blog body must start at H2; the page provides the H1.",
        );
      node.children?.forEach(walk);
    }
    walk(tree);
  };
}
function headingPlugin(headings: Heading[]) {
  return () => (tree: Node) => {
    const used = new Set<string>();
    function walk(node: Node) {
      if (
        node.type === "element" &&
        (node.tagName === "h2" || node.tagName === "h3")
      ) {
        const title = text(node);
        const base =
          title
            .toLowerCase()
            .normalize("NFKD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "") || "section";
        let id = base;
        let i = 1;
        while (used.has(id)) id = `${base}-${i++}`;
        used.add(id);
        node.properties = { ...node.properties, id };
        headings.push({ id, title, level: node.tagName === "h2" ? 2 : 3 });
      }
      node.children?.forEach(walk);
    }
    walk(tree);
  };
}
function safeHref(href: string | undefined) {
  return href &&
    /^(https?:\/\/|mailto:|\/|#)/i.test(href) &&
    !href.startsWith("//")
    ? href
    : undefined;
}
const components: MDXComponents = {
  a: ({ href, children }) => <a href={safeHref(href)}>{children}</a>,
  img: () => {
    throw new Error(
      "Use the validated frontmatter cover image; inline blog images require an approved next/image component.",
    );
  },
  table: ({ children }) => (
    <div className="overflow-x-auto">
      <table>{children}</table>
    </div>
  ),
};
export async function renderMarkdown(source: string) {
  const headings: Heading[] = [];
  const result = await evaluate(source, {
    ...runtime,
    remarkPlugins: [safeMarkdown, remarkGfm],
    rehypePlugins: [headingPlugin(headings)],
  });
  const Content = result.default;
  return { headings, body: <Content components={components} /> };
}
