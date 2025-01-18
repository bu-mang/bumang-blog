"use client";

import { useEffect, useRef } from "react";
import { LuGlobe, LuLayers2, LuMoonStar } from "react-icons/lu";

const NavBar = () => {
  const items = Array.from({ length: 10 }, (_, i) => i + 1); // 예제 데이터

  const colRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (colRef.current) {
      colRef.current.getBoundingClientRect();
    }
  }, []);

  const a = 0;

  return (
    <div className="mx-[1vw] grid grid-cols-4 gap-[5vw] overflow-hidden border-b-[1px] border-t-[1px] py-1 text-xs text-gray-200">
      <div className="relative grid grid-cols-2 gap-[1vw]">
        <div className="transition-all" ref={colRef}>
          <div>Login</div>
        </div>
        <div className="relative transition-all"></div>
      </div>
      <div className="grid grid-cols-2 gap-[1vw]">
        <div className="">
          <div className="flex gap-1">
            <span className="font-bold">About</span>
            <span>Work</span>
            <span>Blog</span>
            <span>Gallery</span>
          </div>
          <div className="flex gap-1">
            <span>All</span>
            <span>Dev</span>
            <span>Design</span>
          </div>
        </div>
        <div className=""></div>
      </div>
      <div className="grid grid-cols-2 gap-[1vw]">
        <div className="flex gap-1">
          <LuGlobe className="text-base" />
          <LuMoonStar className="text-base" />
          <LuLayers2 className="text-base" />
        </div>
        <div className=""></div>
      </div>
      <div className="grid grid-cols-2 gap-[1vw]">
        <div className=""></div>
        <div className="grid grid-cols-1 gap-[1vw] lg:grid-cols-2">
          <div className="flex flex-col">
            <span>Seoul</span>
            <span>12:30 pm</span>
          </div>
          <div className="flex flex-col">
            <span className="whitespace-nowrap">1728x958</span>
            <span className="hidden lg:flex">MacOS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
