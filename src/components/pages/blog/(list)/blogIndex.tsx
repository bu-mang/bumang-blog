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
    // 글의 h1, h2, h3 태그 파싱
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

  const [isVisible, setIsVisible] = useState(true); // 가시성 상태 추가
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // 하단 30% 영역에 도달했는지 확인
      const scrollPercentage = (scrollTop + windowHeight) / documentHeight;
      setIsVisible(scrollPercentage < 0.8); // 80% 지점까지만 보이기
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className={cn(
        "fixed top-[360px] -z-10 ml-10 flex w-full flex-col gap-2.5 border-l-[2px] pr-10",
        isVisible ? "opacity-100" : "opacity-0",
      )}
    >
      {headings.map((heading) => (
        <ButtonBase
          key={heading.id}
          className={cn(
            "flex justify-start text-start text-sm text-gray-200 transition-all hover:text-gray-700 hover:underline",
            activeId === heading.id ? "text-foreground" : "text-gray-400",
          )}
          style={{
            paddingLeft: heading.level * 10,
            scale: activeId === heading.id ? 1.01 : 1,
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
