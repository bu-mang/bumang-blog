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
import usePathProps from "@/hooks/usePathProps";
import Logo from "./logo";
import { twMerge } from "tailwind-merge";

const Header = () => {
  const GUESTBOOK = menus[1];
  const SIGNIN = menus[2];
  const WORK = menus[3];
  const GALLERY = menus[4];
  const LOG = menus[5];

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
    handleScroll();

    // 컴포넌트가 언마운트될 때 스크롤 이벤트 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 z-10 flex w-screen flex-col px-layout pt-layout">
      {/* Actual Contaniner Below */}
      <div
        className="flex w-full justify-center rounded-12 bg-gray-700 transition-all"
        style={{ height: headerHeight }}
      >
        <div className="flex h-header w-full items-center">
          <div className="flex h-full w-2/5 flex-1 items-center justify-start gap-4 pl-header-margin">
            <MenuIcon color="white" size={24} />
            <Logo />
          </div>
          <div className="flex w-[300px] justify-between text-14">
            <Link
              prefetch={true}
              href={WORK.url}
              className={twMerge(
                "w-20",
                majorPathname === WORK.url ? "text-white" : "text-gray-400",
              )}
            >
              {WORK.title}
            </Link>
            <Link //
              prefetch={true}
              href={GALLERY.url}
              className={twMerge(
                "flex w-20 justify-center",
                majorPathname === GALLERY.url ? "text-white" : "text-gray-400",
              )}
            >
              {GALLERY.title}
            </Link>
            <Link //
              prefetch={true}
              href={LOG.url}
              className={twMerge(
                "flex w-20 justify-end",
                majorPathname === LOG.url ? "text-white" : "text-gray-400",
              )}
            >
              {LOG.title}
            </Link>
          </div>
          <div className="flex h-full flex-1 items-center justify-end gap-5 pr-header-margin">
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
      </div>
    </div>
  );
};

export default Header;
