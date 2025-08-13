"use client";

import { ButtonBase } from "@/components/common";
import type { BlogHeadingComponentType, BlogHeadingType } from "@/types";
import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";

interface BlogIndexProps {
  onStart: boolean;
}

const BlogIndex = ({ onStart }: BlogIndexProps) => {
  const [headings, setHeadings] = useState<BlogHeadingComponentType[]>([]);
  const [activeId, setActiveId] = useState<string>();
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll("h1, h2, h3"))
      .filter((el) => el.id) // id 없는 요소 제외
      .map((el) => ({
        id: el.id,
        // text: el.textContent || "",
        text: el.textContent || "",
        level: Number(el.tagName.charAt(1)), // h1, h2, h3 -> 숫자로 변환
      }));

    // Intersection Observer 설정
    observer.current = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) setActiveId(visibleEntry.target.id);
      },
      { rootMargin: "-50px 0px -60% 0px", threshold: 0.1 },
    );

    headingElements.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.current?.observe(element);
    });
    setHeadings(headingElements);

    return () => observer.current?.disconnect();
  }, [onStart]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    console.log(activeId, ": activeId");
  }, [activeId]);

  return (
    <div className="sticky top-[360px] ml-10 flex w-full flex-col gap-2.5 border-l-[2px] pr-10">
      {headings.map((heading) => (
        <ButtonBase
          key={heading.id}
          className={cn(
            "flex justify-start text-start text-sm text-gray-200 transition-all hover:text-gray-700 hover:underline",
          )}
          style={{
            paddingLeft: heading.level * 10,
            color: activeId === heading.id ? "#2c2c2c" : "#999999",
            scale: activeId === heading.id ? 1.03 : 1,
          }}
          onClick={() => handleScrollTo(heading.id)}
        >
          {heading.text}
        </ButtonBase>
      ))}
    </div>
  );
};

export default BlogIndex;
