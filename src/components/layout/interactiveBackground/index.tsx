"use client";

import { PATHNAME } from "@/constants/routes";
import { usePathname } from "@/i18n/navigation";
import { useInteractiveStore } from "@/store/background";
import { cn } from "@/utils/cn";
import WorkBackground from "./interactives/work";
import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/all";

export default function InteractiveBackground() {
  const pathname = usePathname();
  const random = Math.floor(Math.random() * 10);
  const bgColor = useInteractiveStore((state) => state.backgroundColor);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // 스크롤 지속시간
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1, // 선형 보간 값 (0-1, 낮을수록 부드러움)
      touchMultiplier: 2, // 터치 스크롤 민감도
    });

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const renderInteractiveBackground = () => {
    switch (pathname) {
      // INTERACTIVE
      case PATHNAME.WORK:
        return <WorkBackground />;

      // STATIC RENDERS
      case PATHNAME.HOME:
      default:
        return null;
    }
  };

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

  const renderInteractives = renderInteractiveBackground();

  return renderInteractives || renderStaticBackground();
}
