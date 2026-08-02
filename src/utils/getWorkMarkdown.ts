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

// ── /work 상세 마스킹 ──────────────────────────────────────────
// 본문의 <mask>…</mask> 구간을, WORK_UNMASK!=="true"일 때 "같은 길이의 lorem 더미 +
// #mask 캐리어 링크"로 치환한다. 실제 원문은 응답에 실리지 않는다(진짜 숨김).
// 프론트(MarkdownRenderer)가 #mask 링크를 .work-masked span으로 렌더 → CSS 블러.
const MASK_RE = /<mask>([\s\S]*?)<\/mask>/g;
// 로케일별 더미 베이스: 한글 페이지엔 한글 로렘입숨(폭·질감이 자연스러움), 영문엔 lorem ipsum.
const LOREM_EN =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ";
const LOREM_KO =
  "나는 너를 먹을거야. 너를 먹고 아주 오랫동안 살아남을 거야. 우리를 사람 취급 안 하던 괴물 같은 놈들이 모조리 늙어죽고 병들어 죽고 버림받아 죽고 그 주검이 산산이 흩어져 이 땅에서 완전히 사라진 다음에도, 나는 살아 있을 거야. 죽은 너와 끝까지 살아남아 내가 죽어야 너도 죽게 만들거야. 너를 따라 죽는 게 아니라 나를 따라 죽게 만들거야. 네가 사라지도록 두고 보진 않을 거야. 살아남을 거야. 살아서 너를 기억할거야. ";

// 더미 길이 계산용: 마크다운 기호를 제거한 가시 텍스트 길이.
function visibleLen(md: string): number {
  return md
    .replace(/[*_`#>|~-]/g, "")
    .replace(/\s+/g, " ")
    .trim().length;
}

// 문자열 해시 — 구간마다 더미 시작 위치를 변주하되 요청 간 안정적으로(내용 기반).
function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

// base를 seed 위치부터 순환하며 len만큼 확보(짧으면 감싸서 반복). 시작점 변주로 균질감 완화.
function makeDummy(len: number, base: string, seed: number): string {
  if (len <= 0) return "…";
  const start = ((seed % base.length) + base.length) % base.length;
  let s = "";
  let i = start;
  while (s.length < len) {
    s += base[i];
    i = (i + 1) % base.length;
  }
  return s.slice(0, len).trimEnd();
}

function applyMask(content: string, locale: string): string {
  const reveal = process.env.WORK_UNMASK === "true";
  const base = locale === "en" ? LOREM_EN : LOREM_KO;
  return content.replace(MASK_RE, (_m, inner) =>
    reveal ? inner : `[${makeDummy(visibleLen(inner), base, hashStr(inner))}](#mask)`,
  );
}

export function getWorkMarkdown(slug: string, locale: string): string {
  syncImages(slug);

  const mdPath = join(process.cwd(), "content", "work", slug, `${locale}.md`);
  let content = readFileSync(mdPath, "utf-8");

  // 마스킹(<mask>…</mask>) 처리 — 이미지/비디오 경로 변환 전에.
  content = applyMask(content, locale);

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
