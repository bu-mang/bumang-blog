"use client";

import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match?.[1] ?? null;
}

const components: Components = {
  a: ({ href, children }) => {
    // 서버(getWorkMarkdown)가 마스킹 구간을 [더미](#mask)로 내려준다 → 블러 span.
    if (href === "#mask") {
      return (
        <span className="work-masked" title="비공개 (면접 시 공개)">
          {children}
        </span>
      );
    }
    if (href) {
      const ytId = getYouTubeId(href);
      if (ytId) {
        return (
          <iframe
            className="my-6 aspect-video w-full rounded-xl shadow-md"
            src={`https://www.youtube.com/embed/${ytId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      }
      if (/\.(mp4|mov|webm)$/i.test(href)) {
        return (
          <video
            className="my-6 w-full rounded-xl shadow-md"
            src={href}
            autoPlay
            loop
            muted
            playsInline
          />
        );
      }
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article
      // 색상은 시맨틱 토큰(라이트/다크 자동 전환)에 --tw-prose-* 변수를 매핑해 처리.
      // 아래 className은 구조(크기·여백·배경 톤)만 담당한다.
      style={
        {
          "--tw-prose-body": "hsl(var(--muted-foreground))",
          "--tw-prose-headings": "hsl(var(--foreground))",
          "--tw-prose-lead": "hsl(var(--muted-foreground))",
          "--tw-prose-links": "hsl(var(--foreground))",
          "--tw-prose-bold": "hsl(var(--foreground))",
          "--tw-prose-counters": "hsl(var(--muted-foreground))",
          "--tw-prose-bullets": "hsl(var(--muted-foreground))",
          "--tw-prose-hr": "hsl(var(--border))",
          "--tw-prose-quotes": "hsl(var(--muted-foreground))",
          "--tw-prose-quote-borders": "hsl(var(--border))",
          "--tw-prose-code": "hsl(var(--foreground))",
          "--tw-prose-th-borders": "hsl(var(--border))",
          "--tw-prose-td-borders": "hsl(var(--border))",
        } as React.CSSProperties
      }
      className={[
        "prose max-w-none",
        "prose-headings:font-semibold",
        "prose-h2:mb-3 prose-h2:mt-14 prose-h2:border-b prose-h2:border-border prose-h2:pb-3 prose-h2:text-2xl lg:prose-h2:text-3xl",
        "prose-h3:mb-2 prose-h3:mt-8 prose-h3:text-base lg:prose-h3:text-lg",
        "prose-p:text-sm prose-p:leading-relaxed lg:prose-p:text-base",
        "prose-li:text-sm lg:prose-li:text-base [&>ul>li:has(>ul)]:mt-5 [&>ul>li:has(>ul)]:text-[20px] [&_ul_ul>li:has(>ul)]:mt-4",
        "prose-ul:my-2",
        "prose-blockquote:font-normal prose-blockquote:not-italic",
        "prose-hr:my-32",
        "prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none",
        "prose-img:my-6 prose-img:w-full prose-img:rounded-xl prose-img:shadow-md",
        "prose-table:text-sm",
        "prose-th:bg-muted prose-th:px-4 prose-th:py-2",
        "prose-td:px-4 prose-td:py-2",
      ].join(" ")}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
