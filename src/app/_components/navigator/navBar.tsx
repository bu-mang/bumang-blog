"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { LuGlobe, LuLayers2, LuMoonStar } from "react-icons/lu";

gsap.registerPlugin(ScrollTrigger);

const NavBar = () => {
  const colRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (colRef.current) {
      colRef.current.getBoundingClientRect();

      gsap.to(".NAVBAR_CONTAINER", {
        y: -32,
        scrollTrigger: {
          start: "350px top",
          end: "500px top",

          scrub: true,
          markers: true,
        },
      });
      gsap.to(".NAVBAR_BORDERBOX", {
        borderTopColor: "white",
        borderBottomColor: "#999999",
        scrollTrigger: {
          start: "350px top",
          end: "500px top",

          scrub: true,
          markers: true,
        },
      });

      gsap.to(".NAVBAR_SWITCHING_PANEL", {
        x: 88,
        scrollTrigger: {
          start: "350px top",
          end: "500px top",

          scrub: true,
          markers: true,
        },
      });
    }
  }, []);

  return (
    <div className="NAVBAR_CONTAINER w-full">
      <div className="NAVBAR_BORDERBOX mx-[1vw] grid grid-cols-4 gap-[5vw] border-b-[1px] border-t-[1px] border-b-white py-1 pb-3 text-xs text-gray-200">
        <div className="NAVBAR_SWITCHING_PANEL relative grid grid-cols-2 gap-[1vw]">
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
        <div className="NAVBAR_SWITCHING_PANEL grid grid-cols-2 gap-[1vw]">
          <div className="flex gap-1">
            <LuGlobe className="text-base" />
            <LuMoonStar className="text-base" />
            <LuLayers2 className="text-base" />
          </div>
          <div className=""></div>
        </div>
        <div className="grid grid-cols-2 gap-[1vw]">
          <div className=""></div>
          <div className="grid grid-cols-1 gap-[1vw] whitespace-nowrap lg:grid-cols-2">
            <div className="absolute hidden flex-col lg:relative lg:flex">
              <span>Seoul</span>
              <span>12:30 pm</span>
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <span className="">1728x958</span>
              <span className="">MacOS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
