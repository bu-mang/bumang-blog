"use client";

import clsx from "clsx";
import Link from "next/link";
import { LAYOUT_NAV_HEIGHT, LAYOUT_PADDING } from "@/app/_constants/layout";
import { ButtonBase as Button } from "./common/button";

import { Avatar } from "@/components/ui/avatar";
import { LuGlobe as GlobeIcon } from "react-icons/lu";
import Switch from "./switch";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Navigator = () => {
  const navClass = clsx(
    "w-full flex flex-1 fixed top-0 bg-white",
    LAYOUT_NAV_HEIGHT,
    LAYOUT_PADDING,
  );

  const handleSwitch = () => {};

  const [darkMode, setDarkMode] = useState(false);

  const currentPathname = usePathname();

  const fixedClass =
    "rounded-full px-2 text-16 font-bold border-2 transition-all";

  const workClass = clsx(
    fixedClass,
    "/" === currentPathname ? "border-black" : "border-white",
  );
  const blogClass = clsx(
    fixedClass,
    currentPathname.startsWith("/blog") ? "border-black" : "border-white",
  );
  const playClass = clsx(
    fixedClass,
    currentPathname.startsWith("/play") ? "border-black" : "border-white",
  );

  return (
    <section className={navClass}>
      <div className="flex h-full w-1/3 items-center">
        <Link href="/" className="text-20 font-extrabold">
          BUMANG
        </Link>
      </div>
      <div className="px flex h-full w-1/3 items-center justify-between">
        <Link href="/" className={workClass}>
          WORK
        </Link>
        <Link href="/blog" className={blogClass}>
          BLOG
        </Link>
        <Link href="/play" className={playClass}>
          PLAY
        </Link>
      </div>
      <div className="flex h-full w-1/3 items-center justify-end gap-4">
        <Button
          onClick={handleSwitch}
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-gray-10"
        >
          <GlobeIcon size={24} />
        </Button>
        <Switch
          activate={darkMode}
          onActivate={() => setDarkMode((prev) => !prev)}
        />
        <Avatar size="xs" name="Bumang" src="https://bit.ly/sage-adebayo" />
      </div>
    </section>
  );
};

export default Navigator;
