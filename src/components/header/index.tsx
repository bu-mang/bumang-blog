"use client";

import { menus } from "@/constants/menuTree";

// 아이콘
import { IoIosMenu as MenuIcon } from "react-icons/io";
import { TbUser as UserIcon } from "react-icons/tb";
import { TbBrightnessFilled as BrightIcon } from "react-icons/tb";
import { FiBookOpen as BookIcon } from "react-icons/fi";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HEADER_SCROLL } from "@/constants/scroll";
import { twMerge } from "tailwind-merge";
import usePathProps from "@/hooks/usePathProps";

const Header = () => {
  const LOGOMENU = menus[0];
  const GUESTBOOK = menus[1];
  const WORK = menus[2];
  const GALLERY = menus[3];
  const SIGNIN = menus[4];

  const [headerHeight, setHeaderHeight] = useState<"44px" | "88px">("44px");
  const { majorPathname } = usePathProps();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > HEADER_SCROLL) {
        setHeaderHeight("88px");
      } else {
        setHeaderHeight("44px");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 스크롤 이벤트 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 z-10 flex w-screen flex-col px-layout pt-layout">
      <div
        className="flex w-full justify-center rounded-12 bg-gray-700 transition-all"
        style={{ height: headerHeight }}
      >
        {/* Upper */}
        <div className="flex h-header w-full items-center">
          <div className="flex h-full w-1/4 items-center justify-start pl-header-margin">
            <MenuIcon color="white" size={24} />
          </div>
          <div className="flex w-1/2 justify-between text-14">
            <Link
              prefetch={true}
              href={WORK.url}
              className={
                majorPathname === WORK.url ? "text-white" : "text-gray-400"
              }
            >
              {WORK.title}
            </Link>
            <Link
              prefetch={true}
              href={LOGOMENU.url}
              className="font-semibold text-white"
            >
              {LOGOMENU.as}
            </Link>
            <Link //
              prefetch={true}
              href={GALLERY.url}
              className={
                majorPathname === GALLERY.url ? "text-white" : "text-gray-400"
              }
            >
              {GALLERY.title}
            </Link>
          </div>
          <div className="flex h-full w-1/4 items-center justify-end gap-5 pr-header-margin">
            <Link prefetch={true} href={GUESTBOOK.url}>
              <UserIcon color="white" size={22} />
            </Link>
            <Link prefetch={true} href={SIGNIN.url}>
              <BookIcon color="white" size={20} />
            </Link>
            <button>
              <BrightIcon color="white" size={20} />
            </button>
          </div>
        </div>
        {/* Bottom */}
        <div></div>
      </div>
    </div>
  );
};

export default Header;
