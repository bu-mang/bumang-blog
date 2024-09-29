"use client";

import usePathProps from "@/hooks/usePathProps";
import { MenuType } from "@/types/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabProps {
  children: React.ReactNode;
  pageUrl: string;
  url: string;
  isFocused: boolean;
}

const Category = ({ children, url, pageUrl, isFocused }: TabProps) => {
  const focusStyle = isFocused && "bg-gray-500";

  return (
    <Link
      href={pageUrl + url}
      className={`flex h-full flex-1 items-center justify-center rounded-12 border border-gray-400 text-14 text-white ${focusStyle}`}
    >
      {children}
    </Link>
  );
};

interface DeckProps {
  page: string;
  pageUrl: string;
  subMenu: MenuType[];
}

const CategorybarDeck = ({ subMenu, page, pageUrl }: DeckProps) => {
  const { minorPathname } = usePathProps();

  return (
    <div className="flex h-[60px] w-full gap-3">
      {subMenu.map((category) => (
        <Category
          key={category.title}
          url={category.url}
          pageUrl={pageUrl}
          isFocused={minorPathname === category.url}
        >
          {category.title}
        </Category>
      ))}
    </div>
  );
};

export default CategorybarDeck;
