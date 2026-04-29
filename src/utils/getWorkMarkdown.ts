import { readFileSync } from "fs";
import { join } from "path";

export function getWorkMarkdown(slug: string, locale: string): string {
  const mdPath = join(process.cwd(), "content", "work", slug, `${locale}.md`);
  return readFileSync(mdPath, "utf-8");
}
