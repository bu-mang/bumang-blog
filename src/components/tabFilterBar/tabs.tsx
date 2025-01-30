"use client";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";

const TabBar = () => {
  const [indicatorX, setIndicatorX] = useState(0);
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const pathnames = usePathname()
    .split("/")
    .filter((item) => item !== "");
  const getTabStyle = (target: string) =>
    cn(
      "text-xl text-gray-300 font-medium",
      pathnames[1] === target.toLowerCase() && "text-black",
      pathnames[1] === undefined && target === "All" && "text-black",
    );

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

      const gaps = 8 * selectedIndex;
      setIndicatorX(mapped + gaps);
      setIndicatorWidth(rectWidth);
    }
  }, [allRef, devRef, lifeRef, pathnames]);

  const indicatorClass = clsx("absolute h-0.5 bg-black transition-all");

  return (
    <div className="relative border-t-[1px] border-gray-10">
      <div
        className={indicatorClass}
        style={{
          transform: `translateX(${indicatorX}px)`,
          width: indicatorWidth,
        }}
      />
      <div className="mb-2 flex w-full gap-2 py-2">
        <Link href={"/blog"} className={getTabStyle("All")} ref={allRef}>
          All
        </Link>
        <Link href={"/blog/dev"} className={getTabStyle("Dev")} ref={devRef}>
          Dev
        </Link>
        <Link href={"/blog/life"} className={getTabStyle("Life")} ref={lifeRef}>
          Life
        </Link>
      </div>
    </div>
  );
};

export default TabBar;
