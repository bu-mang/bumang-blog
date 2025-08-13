"use client";

import { PATHNAME } from "@/constants/routes/pathnameRoutes";
import { usePathname } from "@/i18n/navigation";
import { useInteractiveStore } from "@/store/background";
import { cn } from "@/utils/cn";
import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/all";
import Ascii3DBackground from "./ascii";
import BlockMatters from "./blockMatters";
import WorkBackground from "./work";

export default function InteractiveBackground() {
  const pathname = usePathname();
  const bgColor = useInteractiveStore((state) => state.backgroundColor);

  // 부드러운 스크롤 애니메이션 init
  // /blog/edit은 제외
  useEffect(() => {
    let lenis: Lenis | null = null;
    if (pathname !== "/blog/edit") {
      lenis = new Lenis({
        duration: 1.2, // 스크롤 지속시간
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lerp: 0.1, // 선형 보간 값 (0-1, 낮을수록 부드러움)
        touchMultiplier: 2, // 터치 스크롤 민감도
      });

      lenis.on("scroll", ScrollTrigger.update);

      function raf(time: number) {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    return () => {
      lenis?.destroy();
    };
    // eslint-disable-next-line
  }, [pathname === "/blog/edit"]);

  // 특수 배경
  const renderInteractiveBackground = () => {
    switch (pathname) {
      // INTERACTIVE
      case PATHNAME.WORK:
        return <WorkBackground />;
      case PATHNAME.HOME:
        if (process.env.NODE_ENV === "production") {
          return <Ascii3DBackground />;
        } else if (process.env.NODE_ENV === "development") {
          // 개발중인 인터랙티브 배경!
          return <BlockMatters />;
        }

      // STATIC RENDERS
      default:
        return null;
    }
  };

  // 기본 배경
  const renderStaticBackground = () => {
    return (
      <div
        className={cn(
          "fixed inset-0 -z-10 h-screen w-screen transition-all ease-in-out",
          bgColor,
        )}
      />
    );
  };

  return renderInteractiveBackground() || renderStaticBackground();
}
