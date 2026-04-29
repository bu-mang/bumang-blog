import {
  readFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
  copyFileSync,
  statSync,
} from "fs";
import { join } from "path";

function syncImages(slug: string) {
  const srcDir = join(process.cwd(), "content", "work", slug, "images");
  if (!existsSync(srcDir)) return;

  const destDir = join(process.cwd(), "public", "images", "work", slug);
  if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });

  for (const file of readdirSync(srcDir)) {
    const src = join(srcDir, file);
    const dest = join(destDir, file);
    if (
      !existsSync(dest) ||
      statSync(src).mtimeMs > statSync(dest).mtimeMs
    ) {
      copyFileSync(src, dest);
    }
  }
}

export function getWorkMarkdown(slug: string, locale: string): string {
  syncImages(slug);

  const mdPath = join(process.cwd(), "content", "work", slug, `${locale}.md`);
  let content = readFileSync(mdPath, "utf-8");

  const target = `/images/work/${slug}/`;

  content = content.replace(
    /!\[([^\]]*)\]\(((?:[^()]*|\([^()]*\))*)\)/g,
    (_match, alt, src) => {
      if (src.startsWith("http")) return _match;
      if (src.includes(target)) return _match;
      const decoded = decodeURIComponent(src);
      const filename = decoded.split("/").pop() || decoded;
      return `![${alt}](${target}${encodeURIComponent(filename)})`;
    },
  );

  return content;
}
