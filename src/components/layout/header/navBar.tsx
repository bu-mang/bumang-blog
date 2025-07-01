"use client";

import type { MenuType } from "@/types";
import { ROUTES } from "@/constants/routes/navBarRoutes";
import { cn } from "@/utils/cn";

// import resolveConfig from "tailwindcss/resolveConfig";
// import tailwindConfig from "../../../../tailwind.config";

// const fullConfig = resolveConfig(tailwindConfig);
// const gray = fullConfig.theme.colors.gray as Record<string, string>;

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, usePathname } from "@/i18n/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { LuLanguages, LuLayers2, LuMoonStar } from "react-icons/lu";
import { ButtonBase as Button } from "@/components/common";
import { useMutation } from "@tanstack/react-query";
import { postLogout } from "@/services/api/auth/client";
import { useRouter } from "@/i18n/navigation";
import { useQueryParams } from "@/hooks/useQueryParams";

// import { Tooltip } from "radix-ui";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useInteractiveStore } from "@/store/background";
import { PATHNAME } from "@/constants/routes";

gsap.registerPlugin(ScrollTrigger);

interface NavBarProps {
  isAuthenticated: boolean;
  locale: string;
  isLoading?: boolean;
  nickname?: string;
}

// TODO: 사분면 마다 코드스플리팅 할까..
const NavBar = ({
  isAuthenticated,
  locale,
  isLoading,
  nickname,
}: NavBarProps) => {
  const pathname = usePathname();
  const headerBackgroundColor = useInteractiveStore(
    (state) => state.header.backgroundColor,
  );
  const headerBorderBottom = useInteractiveStore(
    (state) => state.header.borderBottom,
  );

  /**
   * @HEADER_ANIMATION
   */
  useEffect(() => {
    console.log(headerBorderBottom, "headerBorderBottom");
    // 타임라인으로 통함??
    gsap.to(".NAVBAR_CONTAINER", {
      y: -32,
      scrollTrigger: {
        start: "top top",
        end: "200px top",

        scrub: true,
        // markers: true,,
      },
    });
    gsap.to(".NAVBAR_BORDERBOX", {
      borderTopColor: "transparent",
      borderBottomColor: headerBorderBottom ?? "transparent", // "#ede5e5", text-gray-10
      scrollTrigger: {
        start: "top top",
        end: "200px top",

        scrub: true,
        // markers: true,,
      },
    });
    gsap.to(".NAVBAR_SWITCHING_PANEL", {
      x: 88,
      scrollTrigger: {
        start: "top top",
        end: "200px top",

        scrub: true,
        // markers: true,,
      },
    });
  }, [pathname, headerBorderBottom]);

  const router = useRouter();
  const logoutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      router.refresh();
    },
  });
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (err) {
      console.log(err, "logged out");
    }
  };

  // ---------------- 제 2사분면 로직 ----------------

  /**
   * @PATHLOGIC
   */
  const paths = pathname.split("/").filter((item) => item !== "");
  const currentRoute = ROUTES.filter(
    (item) => item.sub !== undefined && item.url.startsWith(`/${paths[0]}`),
  )[0];

  /**
   * @LINKHOVERSTYLE
   */
  const { hasQueryValue, hasQuery } = useQueryParams();
  const linkHoverStyle =
    "relative z-50 transition-colors duration-300 ease-in-out text-gray-200 hover:text-black cursor-pointer";
  const navStyleManager = (subItem: MenuType) => {
    return cn(
      linkHoverStyle,
      hasQueryValue("type", subItem.url) && "text-black",
      subItem.url === "all" && !hasQuery("type") && "text-black",
    );
  };

  // ---------------- 제 4사분면 로직 ----------------

  /**
   * @CLOCK_LOGIC
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
   * @SCREEN_WIDTH_HEIGHT_RESIZING
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
   * @CURRENT_TIMEZONE
   */
  const currentTimeZone = Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone.split("/")[1];
  /**
   * @CurrentOS
   */
  const [currentOs, setCurrentOs] = useState("OS");
  useEffect(() => {
    const userAgent = navigator?.userAgent;
    const targetOs =
      userAgent.match(
        /(Windows NT|Mac OS|Linux|Android|iPhone OS|iPad OS)/,
      )?.[0] || "Unknown";
    setCurrentOs(targetOs);
  }, []);

  // ---

  return (
    <div
      className={cn(
        "NAVBAR_CONTAINER relative w-full cursor-default font-medium",
        headerBackgroundColor,
      )}
    >
      <div className="NAVBAR_BORDERBOX mx-[10vw] grid grid-cols-4 gap-[1.5vw] border-b-[1px] border-t-[1px] border-b-white border-t-gray-10 py-1 pb-3 text-xs text-gray-200">
        {/* 1사분면 (로그인 / 인증 정보) */}
        <div className="NAVBAR_SWITCHING_PANEL relative grid grid-cols-2 gap-[1.5vw]">
          {isAuthenticated ? (
            <div className="flex h-fit items-center gap-1.5">
              <Button className={linkHoverStyle}>{nickname}</Button>

              <div className="h-2 w-[1px] bg-gray-100" />

              <Button className="h-fit w-fit" onClick={handleLogout}>
                <span className={linkHoverStyle}>Logout</span>
              </Button>
            </div>
          ) : isLoading ? (
            <div className={linkHoverStyle}>loading...</div>
          ) : (
            <Link href="/login" className={linkHoverStyle}>
              Login
            </Link>
          )}
        </div>

        {/* 2사분면 (메뉴) */}
        <div className="grid grid-cols-2 gap-[1.5vw]">
          <div className="col-start-1 col-end-3">
            {/* MENU */}
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

            {/* SUBMENU */}
            <div className="flex gap-1">
              {currentRoute?.sub?.map((subItem) => (
                <Link
                  key={subItem.title}
                  // href={combinePaths(subItem.url, subItem.parents)}
                  href={subItem?.parents?.[0] + "?type=" + subItem.url}
                  className={navStyleManager(subItem)}
                >
                  {subItem.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 3사분면 (아이콘) */}
        <div className="NAVBAR_SWITCHING_PANEL grid grid-cols-2 gap-[1.5vw]">
          <div className="col-start-1 col-end-2 flex gap-1">
            <LocaleSwitcher
              locale={locale}
              className={cn(linkHoverStyle, "text-base")}
            />
            <LuMoonStar className={cn(linkHoverStyle, "text-base")} />
            <LuLayers2 className={cn(linkHoverStyle, "text-base")} />
          </div>
        </div>

        {/* 4사분면 (타임존 / 해상도) */}
        <div className="grid grid-cols-2 gap-[1.5vw]">
          <div className="col-start-2 col-end-3 grid gap-[1.5vw] whitespace-nowrap lg:grid-cols-2">
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

interface LocaleSwitcherProps {
  locale: string;
  className?: string;
}

function LocaleSwitcher({ locale, className }: LocaleSwitcherProps) {
  const pathname = usePathname();

  return (
    <Tooltip>
      <TooltipTrigger className="group relative h-fit w-fit" asChild>
        <button>
          <LuLanguages className={cn(className, "group-hover:text-black")} />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="z-[1000] flex gap-2">
        <Link href={pathname} locale="ko">
          <p
            className={
              locale === "ko" ? "opacity-100" : "opacity-30 hover:opacity-100"
            }
          >
            Ko
          </p>
        </Link>
        <Link href={pathname} locale="en">
          <p
            className={
              locale === "en" ? "opacity-100" : "opacity-30 hover:opacity-100"
            }
          >
            En
          </p>
        </Link>
      </TooltipContent>
    </Tooltip>
  );
}
