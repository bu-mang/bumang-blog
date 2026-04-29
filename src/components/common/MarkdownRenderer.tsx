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
      className={[
        "prose prose-gray max-w-none",
        "prose-headings:font-semibold",
        "prose-h2:mb-3 prose-h2:mt-14 prose-h2:border-b prose-h2:border-gray-50 prose-h2:pb-3 prose-h2:text-2xl lg:prose-h2:text-3xl",
        "prose-h3:mb-2 prose-h3:mt-8 prose-h3:text-base lg:prose-h3:text-lg",
        "prose-p:text-sm prose-p:leading-relaxed prose-p:text-gray-400 lg:prose-p:text-base",
        "prose-li:text-sm prose-li:text-gray-400 prose-li:marker:text-gray-600 lg:prose-li:text-base [&>ul>li:has(>ul)]:mt-5 [&>ul>li:has(>ul)]:text-[20px] [&_ul_ul>li:has(>ul)]:mt-4",
        "prose-ul:my-2",
        "prose-blockquote:border-l-gray-200 prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-gray-300",
        "prose-hr:my-32 prose-hr:border-gray-50",
        "prose-strong:text-gray-600",
        "prose-code:rounded prose-code:bg-gray-5 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-normal prose-code:text-gray-500 prose-code:before:content-none prose-code:after:content-none",
        "prose-img:my-6 prose-img:w-full prose-img:rounded-xl prose-img:shadow-md",
        "prose-table:text-sm",
        "prose-th:bg-gray-5 prose-th:px-4 prose-th:py-2",
        "prose-td:px-4 prose-td:py-2",
      ].join(" ")}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
