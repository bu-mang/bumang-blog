"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LuGlobe, LuLayers2, LuMoonStar } from "react-icons/lu";

gsap.registerPlugin(ScrollTrigger);

const NavBar = () => {
  useLayoutEffect(() => {
    // 타임라인으로 통함??
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
  }, []);

  const timeZone = Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone.split("/")[1];

  const [clock, setClock] = useState("00:00");
  useLayoutEffect(() => {
    const handleSetClock = () => {
      setClock((prevClock) => {
        let isAmPm = "am";
        let hours: number | string = new Date().getHours();

        if (hours > 12) {
          hours = String(hours % 12).padStart(2, "0");
          isAmPm = "pm";
        } else if (hours === 0) {
          hours = 12;
        }

        let semiColon = ":";
        const isSemiColonNow = prevClock.includes(":");
        if (isSemiColonNow) semiColon = " ";

        const minutes = String(new Date().getMinutes()).padStart(2, "0");

        return `${hours}${semiColon}${minutes} ${isAmPm}`;
      });
    };

    const interval = setInterval(() => {
      handleSetClock();
    }, 1000);
    handleSetClock();

    return () => clearInterval(interval);
  }, []);

  const [innerWidth, setInnerWidth] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);
  useLayoutEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const userAgent = navigator.userAgent;
  const os =
    userAgent.match(
      /(Windows NT|Mac OS|Linux|Android|iPhone OS|iPad OS)/,
    )?.[0] || "Unknown";

  return (
    <div className="NAVBAR_CONTAINER w-full">
      <div className="NAVBAR_BORDERBOX mx-[1vw] grid grid-cols-4 gap-[5vw] border-b-[1px] border-t-[1px] border-b-white py-1 pb-3 text-xs text-gray-200">
        <div className="NAVBAR_SWITCHING_PANEL relative grid grid-cols-2 gap-[1vw]">
          <div>Login</div>
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
              <span>{timeZone}</span>
              <span>{clock}</span>
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <span className="">
                {innerWidth}x{innerHeight}
              </span>
              <span className="">{os}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
