"use client";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";

const Tabs = () => {
  /**
   * TAB INDICATOR 스타일
   */
  const pathnames = usePathname()
    .split("/")
    .filter((item) => item !== "");
  const getTabStyle = (target: string) =>
    cn(
      "text-xl text-gray-300 font-medium",
      pathnames[1] === target.toLowerCase() && "text-black",
      pathnames[1] === undefined && target === "All" && "text-black",
    );

  /**
   * TAB INDICATOR 애니메이션 로직
   */
  const [indicatorX, setIndicatorX] = useState(0);
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const allRef = useRef<HTMLAnchorElement | null>(null);
  const devRef = useRef<HTMLAnchorElement | null>(null);
  const lifeRef = useRef<HTMLAnchorElement | null>(null);

  useLayoutEffect(() => {
    if (allRef.current && devRef.current && lifeRef.current) {
      const arr = [allRef, devRef, lifeRef];
      const selectedIndex =
        pathnames[1] === undefined ? 0 : pathnames[1] === "dev" ? 1 : 2;
      const rectWidth =
        arr[selectedIndex].current?.getBoundingClientRect().width ?? 0;

      const mapped = arr.slice(0, selectedIndex).reduce((acc, cur) => {
        return (acc += cur.current?.getBoundingClientRect().width ?? 0);
      }, 0);

      const gaps = 16 * selectedIndex;
      setIndicatorX(mapped + gaps);
      setIndicatorWidth(rectWidth);
    }
  }, [allRef, devRef, lifeRef, pathnames]);

  const indicatorClass = clsx(
    "bottom-0 absolute h-0.5 bg-gray-700 transition-all",
  );

  return (
    <div className="flex rounded-lg px-2">
      <div className="relative flex h-full w-full border-b-[1px] py-1">
        {/* TAB INDICATOR */}
        <div
          className={indicatorClass}
          style={{
            transform: `translateX(${indicatorX}px)`,
            width: indicatorWidth,
          }}
        />

        {/* TABS */}
        <div className="flex h-full w-full gap-4">
          <Link href={"/blog"} className={getTabStyle("All")} ref={allRef}>
            All
          </Link>
          <Link href={"/blog/dev"} className={getTabStyle("Dev")} ref={devRef}>
            Dev
          </Link>
          <Link
            href={"/blog/life"}
            className={getTabStyle("Life")}
            ref={lifeRef}
          >
            Life
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
