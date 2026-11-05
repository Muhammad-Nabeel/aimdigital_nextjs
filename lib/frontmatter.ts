import matter from "gray-matter";
import { load, dump, JSON_SCHEMA } from "js-yaml";
const options = {
  engines: {
    yaml: {
      parse: (source: string): object => {
        const parsed: unknown = load(source, { schema: JSON_SCHEMA });
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
          throw new Error("Frontmatter must be a YAML object.");
        return parsed;
      },
      stringify: (data: object) =>
        dump(data, { schema: JSON_SCHEMA, lineWidth: -1, noRefs: true }),
    },
  },
};
export function parseFrontmatter(source: string) {
  if (!/^---\r?\n/.test(source))
    throw new Error("Posts must start with a standard YAML frontmatter block.");
  return matter(source, options);
}
export function stringifyFrontmatter(content: string, data: object) {
  return matter.stringify(content, data, options);
}
