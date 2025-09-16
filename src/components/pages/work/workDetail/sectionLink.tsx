"use client";

import { Link } from "@/i18n/navigation";
import { LuMoveRight } from "react-icons/lu";

interface SectionLinkProps extends Partial<HTMLAnchorElement> {
  title: string;
  desc?: string;
}

export default function SectionLink({ title, desc, href }: SectionLinkProps) {
  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!href) return;

    const element = document.querySelector(href);
    const OFFSET = 160;

    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Link
      onClick={(e) => handleScroll(e)}
      href={href ?? "#"}
      className="group flex h-12 w-full cursor-pointer items-center justify-between gap-1 rounded-full border px-5 transition-all duration-200 hover:bg-gray-1/80 md:h-10"
    >
      <div className="flex flex-col md:flex-row md:items-center md:gap-2">
        <div>{title}</div>
        <span className="text-xs text-gray-200">{desc}</span>
      </div>

      <LuMoveRight className="animate-arrow text-gray-200 opacity-0 transition-all duration-500 group-hover:opacity-100" />
    </Link>
  );
}
