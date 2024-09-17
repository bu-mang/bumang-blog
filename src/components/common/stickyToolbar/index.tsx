"use client";

import Link from "next/link";
import Button from "../button";
import usePathProps from "@/hooks/usePathProps";

const StickyToolbar = () => {
  const handleButton = () => {};

  const { majorPathInfo } = usePathProps();

  return (
    <div className="sticky top-[56px] z-50 mt-4 flex h-header w-full px-4">
      <div className="flex h-full w-1/4 items-center gap-6">
        <Button
          classname="text-white font-light"
          onClick={handleButton}
          loading={false}
        >
          List View
        </Button>
        <Button
          classname="text-white font-light"
          onClick={handleButton}
          loading={false}
        >
          Grid View
        </Button>
      </div>
      <div className="flex h-full flex-1 items-center justify-center gap-8">
        {majorPathInfo?.subMenu?.map((item) => (
          <Link className="text-white" href={majorPathInfo.url + item.url}>
            {item.title}
          </Link>
        ))}
      </div>
      <div className="flex h-full w-1/4 items-center justify-end gap-6">
        <span className="font-light text-white">Sort by: </span>
        <Button
          classname="text-white font-light"
          onClick={handleButton}
          loading={false}
        >
          Recent
        </Button>
        <Button
          classname="text-white font-light"
          onClick={handleButton}
          loading={false}
        >
          Popular
        </Button>
      </div>
    </div>
  );
};

export default StickyToolbar;
