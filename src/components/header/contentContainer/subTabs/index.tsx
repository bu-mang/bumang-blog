"use client";

import { PathnameNavType } from "@/types/menu";
import { useParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface TabProps {
  title: string;
  isFocused: boolean;
  onClick: (tab: string) => void;
}

const Tab = ({ title, isFocused, onClick }: TabProps) => {
  return (
    <button
      onClick={() => onClick(title)}
      className={twMerge(
        "rounded-4 bg-white px-3 py-2",
        isFocused && "font-bold",
      )}
    >
      {title}
    </button>
  );
};

interface SubTabProps {
  menus: PathnameNavType[];
}

const SubTabs = ({ menus }: SubTabProps) => {
  const { pathname } = useParams();
  menus.find((item) => item.title);

  return (
    <div className="rounded-8 flex h-12 w-full items-center justify-center gap-3 bg-gray-1">
      {/* {tabs.map(({ title, isFocused }) => (
        <Tab
          key={title}
          title={title}
          onClick={onClick}
          isFocused={isFocused}
        />
      ))} */}
    </div>
  );
};

export default SubTabs;
