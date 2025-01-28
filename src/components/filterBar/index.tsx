"use client";

import { ROUTES } from "@/constants/routes";
import Tags from "../common/tags";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useEffect, useLayoutEffect } from "react";

const FilterBar = () => {
  const blogSubCategories = ROUTES.filter(
    (item) => item.title === "Blog",
  )[0].sub?.map((item) => item.title);
  const pathnames = usePathname()
    .split("/")
    .filter((item) => item !== "");

  const setUrl = (target: string) => {
    if (target !== "All") {
      return `/blog/${target.toLowerCase()}`;
    }
    return `/blog`;
  };

  const getTabStyle = (target: string) =>
    cn(
      "text-xl text-gray-300 font-medium",
      pathnames[1] === target.toLowerCase() && "text-black",
      pathnames[1] === undefined && target === "All" && "text-black",
    );

  useLayoutEffect(() => {
    gsap;
  }, []);

  return (
    <div className="mx-[3vw] border-t-[1px] border-gray-10">
      <div className="absolute h-1 w-6 bg-red" />
      <div className="flex w-full gap-2 py-2">
        {blogSubCategories?.map((item) => (
          <Link href={setUrl(item)} className={getTabStyle(item)}>
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
