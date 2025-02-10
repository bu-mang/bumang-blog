"use client";

import { ROUTES } from "@/constants/routes";
import { MenuType } from "@/types/routes";
import { cn } from "@/utils/cn";
import { combinePaths } from "@/utils/combinePaths";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);
const gray = fullConfig.theme.colors.gray as Record<string, string>;

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { LuGlobe, LuLayers2, LuMoonStar } from "react-icons/lu";

gsap.registerPlugin(ScrollTrigger);

const NavBar = () => {
  /**
   * @HeaderAnimation
   */
  useEffect(() => {
    // 타임라인으로 통함??
    gsap.to(".NAVBAR_CONTAINER", {
      y: -32,
      scrollTrigger: {
        start: "top top",
        end: "200px top",

        scrub: true,
        markers: true,
      },
    });
    gsap.to(".NAVBAR_BORDERBOX", {
      borderTopColor: "white",
      borderBottomColor: gray?.["10"], // "#ede5e5", text-gray-10
      scrollTrigger: {
        start: "top top",
        end: "200px top",

        scrub: true,
        markers: true,
      },
    });
    gsap.to(".NAVBAR_SWITCHING_PANEL", {
      x: 88,
      scrollTrigger: {
        start: "top top",
        end: "200px top",

        scrub: true,
        markers: true,
      },
    });
  }, []);

  /**
   * @Clock
   */
  const [clock, setClock] = useState("00:00");
  useLayoutEffect(() => {
    const handleSetClock = () => {
      setClock((prevClock) => {
        let isAmPm = "am";
        let hours: number | string = new Date().getHours();

        if (hours >= 12) {
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

  /**
   * @screen_widthHeight
   */
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

  /**
   * @CurrentTimeZone
   */
  const currentTimeZone = Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone.split("/")[1];
  /**
   * @CurrentOS
   */
  const [currentOs, setCurrentOs] = useState("");
  useEffect(() => {
    const userAgent = navigator?.userAgent;
    const targetOs =
      userAgent.match(
        /(Windows NT|Mac OS|Linux|Android|iPhone OS|iPad OS)/,
      )?.[0] || "Unknown";
    setCurrentOs(targetOs);
  }, []);

  /**
   * @PATHLOGIC
   */
  const pathname = usePathname();
  const paths = pathname.split("/").filter((item) => item !== "");
  const currentRoute = ROUTES.filter(
    (item) => item.sub !== undefined && item.url.startsWith(`/${paths[0]}`),
  )[0];

  /**
   * @LINKHOVERSTYLE
   */
  const linkHoverStyle =
    "relative z-50 transition-colors duration-300 ease-in-out text-gray-200 hover:text-black cursor-pointer";
  const navStyleManager = (subItem: MenuType) => {
    return cn(
      linkHoverStyle,
      `/${pathname.split("/")[2]}` === subItem.url && "text-black",
      pathname.split("/")[2] === undefined &&
        subItem.url === "/" &&
        "text-black",
    );
  };

  return (
    <div className="NAVBAR_CONTAINER relative w-full cursor-default bg-white font-medium">
      <div className="NAVBAR_BORDERBOX mx-[10vw] grid grid-cols-4 gap-[1.5vw] border-b-[1px] border-t-[1px] border-b-white border-t-gray-10 py-1 pb-3 text-xs text-gray-200">
        <div className="NAVBAR_SWITCHING_PANEL relative grid grid-cols-2 gap-[1.5vw]">
          {/* <Link href="/login" className={linkHoverStyle}>
            Login
          </Link>
          <div className="relative transition-all"></div> */}
        </div>
        <div className="grid grid-cols-2 gap-[1.5vw]">
          <div className="">
            <div className="flex gap-1">
              {ROUTES.filter((item) => item.group === "NAVIGATOR").map(
                (item) => (
                  <Link
                    href={item.url}
                    key={item.title}
                    className={cn(
                      linkHoverStyle,
                      item.url.startsWith(`/${paths[0]}`) && "text-black",
                    )}
                  >
                    {item.title}
                  </Link>
                ),
              )}
            </div>
            <div className="flex gap-1">
              {currentRoute?.sub?.map((subItem) => (
                <Link
                  key={subItem.title}
                  href={combinePaths(subItem.url, subItem.parents)}
                  className={navStyleManager(subItem)}
                >
                  {subItem.title}
                </Link>
              ))}
            </div>
          </div>
          <div className=""></div>
        </div>
        <div className="NAVBAR_SWITCHING_PANEL grid grid-cols-2 gap-[1.5vw]">
          <div className="flex gap-1">
            <LuGlobe className={cn(linkHoverStyle, "text-base")} />
            <LuMoonStar className={cn(linkHoverStyle, "text-base")} />
            <LuLayers2 className={cn(linkHoverStyle, "text-base")} />
          </div>
          <div className=""></div>
        </div>
        <div className="grid grid-cols-2 gap-[1.5vw]">
          <div className=""></div>
          <div className="grid grid-cols-1 gap-[1.5vw] whitespace-nowrap lg:grid-cols-2">
            <div className="absolute hidden flex-col lg:relative lg:flex">
              <span>{currentTimeZone}</span>
              <span>{clock}</span>
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <span className="">
                {innerWidth}x{innerHeight}
              </span>
              <span className="">{currentOs}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
