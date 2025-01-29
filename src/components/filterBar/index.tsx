"use client";

import { ROUTES } from "@/constants/routes";
import Tags from "../common/tags";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const FilterBar = () => {
  const pathnames = usePathname()
    .split("/")
    .filter((item) => item !== "");
  const getTabStyle = (target: string) =>
    cn(
      "text-xl text-gray-300 font-medium",
      pathnames[1] === target.toLowerCase() && "text-black",
      pathnames[1] === undefined && target === "All" && "text-black",
    );

  return (
    <div className="mx-[3vw] border-t-[1px] border-gray-10">
      <div className="TAB_INDICATOR absolute h-1 w-5 bg-red" />
      <div className="flex w-full gap-2 py-2">
        <Link href={"/blog"} className={getTabStyle("All")}>
          All
        </Link>
        <Link href={"/blog/dev"} className={getTabStyle("Dev")}>
          Dev
        </Link>
        <Link href={"/blog/life"} className={getTabStyle("Life")}>
          Life
        </Link>
      </div>
    </div>
  );
};

export default FilterBar;
