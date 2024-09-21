"use client";

import Link from "next/link";
import Button from "../button";
import usePathProps from "@/hooks/usePathProps";
import { useEffect, useState } from "react";
import { HEADER_SCROLL } from "@/constants/scroll";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import useQueryProps from "@/hooks/useQueryProps";

const StickyToolbar = () => {
  const { majorPathInfo, fullPathname, minorPathname } = usePathProps();
  const { list, sort } = useQueryProps();

  const router = useRouter();
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const listViewStyle =
    list === "list" || !list ? "text-white" : "text-gray-400";
  const gridViewStyle = list === "grid" ? "text-white" : "text-gray-400";

  const recentSortStyle =
    sort === "recent" || !sort ? "text-white" : "text-gray-400";
  const popularSortStyle = sort === "popular" ? "text-white" : "text-gray-400";

  const [visibility, setVisibility] = useState<"hidden" | "visible">("hidden");
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > HEADER_SCROLL) {
        setVisibility("visible");
      } else {
        setVisibility("hidden");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 스크롤 이벤트 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="sticky top-[56px] z-50 mt-4 flex h-header w-full px-4">
      <div className="flex h-full w-1/4 items-center gap-6">
        <Button
          onClick={() =>
            handleNavigation(
              fullPathname + "?list=list" + "&sort=" + (sort ?? "recent"),
            )
          }
          classname={listViewStyle}
          loading={false}
        >
          List View
        </Button>
        <Button
          classname={gridViewStyle}
          onClick={() =>
            handleNavigation(
              fullPathname + "?list=grid" + "&sort=" + (sort ?? "recent"),
            )
          }
          loading={false}
        >
          Grid View
        </Button>
      </div>
      <div
        className="flex h-full flex-1 items-center justify-center gap-8"
        style={{ visibility }}
      >
        {majorPathInfo?.subMenu?.map((item) => (
          <Link
            key={item.title}
            prefetch={true}
            className={twMerge(
              "text-14",
              item.url === minorPathname ? "text-white" : "text-gray-400",
            )}
            href={majorPathInfo.url + item.url}
          >
            {item.title}
          </Link>
        ))}
      </div>
      <div className="flex h-full w-1/4 items-center justify-end gap-6">
        <span className="text-gray-400">Sort by: </span>
        <Button
          classname={recentSortStyle}
          onClick={() =>
            handleNavigation(
              fullPathname + "?list=" + (list ?? "list") + "&sort=recent",
            )
          }
          loading={false}
        >
          Recent
        </Button>
        <Button
          classname={popularSortStyle}
          onClick={() =>
            handleNavigation(
              fullPathname + "?list=" + (list ?? "list") + "&sort=popular",
            )
          }
          loading={false}
        >
          Popular
        </Button>
      </div>
    </div>
  );
};

export default StickyToolbar;
