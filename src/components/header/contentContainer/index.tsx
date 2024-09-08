"use client";

import SubTabs from "./subTabs";
import Logo from "./logo";
import MainNavTabs from "./mainNavTabs";
import Link from "next/link";
import { useState } from "react";
import { PathnameNavType } from "@/types/menu";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

const ContentContainer = () => {
  const [menus, setMenus] = useState<PathnameNavType[]>([
    { title: "Landing", url: "/" },
    { title: "Guest Book", url: "/guest-book" },
    { title: "About Me", url: "/about-me" },
    {
      title: "Portfolio",
      url: "/portfolio",
      subTabs: ["total"],
    },
    {
      title: "Gallery",
      url: "/gallery",
      subTabs: ["total", "drawing", "graphic", "3D-design"],
    },
    { title: "Blog", url: "/blog" },
  ]);

  const LOGOMENU = menus[0];
  const GUESTBOOK = menus[1];
  const NAVMENUS = menus.slice(2);

  const pathname = usePathname();

  return (
    <div className="px-layout absolute top-5 z-10 flex w-full flex-col gap-3">
      <div className="flex w-full items-center justify-between">
        <div className="w-1/3">
          <Logo logoMenu={LOGOMENU} />
        </div>
        <div className="flex w-1/3 justify-center">
          <MainNavTabs>
            {NAVMENUS.map(({ title, url, subTabs }) => {
              return (
                <Link
                  key={title}
                  href={url + `/${subTabs?.[0] ?? ""}`}
                  className={twMerge(
                    "text-16 single-line-text flex w-20 justify-center",
                    pathname.startsWith(url) && "font-bold",
                  )}
                >
                  {title}
                </Link>
              );
            })}
          </MainNavTabs>
        </div>
        <div className="flex w-1/3 justify-end">
          <Link
            href={GUESTBOOK.url}
            className={twMerge(
              "text-16",
              pathname.startsWith(GUESTBOOK.url) && "font-bold",
            )}
          >
            {GUESTBOOK.title}
          </Link>
        </div>
      </div>

      <SubTabs menus={menus} />
    </div>
  );
};

export default ContentContainer;
