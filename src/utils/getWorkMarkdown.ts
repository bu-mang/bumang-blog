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
    if (!existsSync(dest) || statSync(src).mtimeMs > statSync(dest).mtimeMs) {
      copyFileSync(src, dest);
    }
  }
}

export function getWorkMarkdown(slug: string, locale: string): string {
  syncImages(slug);

  const mdPath = join(process.cwd(), "content", "work", slug, `${locale}.md`);
  let content = readFileSync(mdPath, "utf-8");

  const target = `/images/work/${slug}/`;

  function resolveLocalPath(src: string): string {
    try {
      const decoded = decodeURIComponent(src);
      const filename = decoded.split("/").pop() || decoded;
      return target + encodeURIComponent(filename);
    } catch {
      const filename = src.split("/").pop() || src;
      return target + filename;
    }
  }

  // 이미지 경로 변환
  content = content.replace(
    /!\[([^\]]*)\]\(((?:[^()]*|\([^()]*\))*)\)/g,
    (_match, alt, src) => {
      if (src.startsWith("http")) return _match;
      if (src.includes(target)) return _match;
      return `![${alt}](${resolveLocalPath(src)})`;
    },
  );

  // 비디오 링크 경로 변환
  content = content.replace(
    /(?<!!)\[([^\]]*)\]\(([^)]*\.(?:mp4|mov|webm))\)/gi,
    (_match, text, src) => {
      if (src.startsWith("http")) return _match;
      if (src.includes(target)) return _match;
      return `[${text}](${resolveLocalPath(src)})`;
    },
  );

  return content;
}
