"use client";

import { MenuType } from "@/types/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabProps {
  children: React.ReactNode;
  pageUrl: string;
  url: string;
  isFocused: boolean;
}

const Tab = ({ children, url, pageUrl, isFocused }: TabProps) => {
  const focusStyle = isFocused && "bg-gray-500";

  return (
    <Link
      href={pageUrl + url}
      className={`flex h-full flex-grow items-center justify-center rounded-12 border border-gray-400 text-14 text-white ${focusStyle}`}
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

const TabbarDeck = ({ subMenu, page, pageUrl }: DeckProps) => {
  let subtractedUrl = usePathname().split(pageUrl)[1] || "/";

  return (
    <div className="flex h-[60px] w-full gap-3">
      {subMenu.map((tab) => (
        <Tab
          key={tab.title}
          url={tab.url}
          pageUrl={pageUrl}
          isFocused={subtractedUrl === tab.url}
        >
          {tab.title}
        </Tab>
      ))}
    </div>
  );
};

export default TabbarDeck;
