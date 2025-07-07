"use client";

import { useCallback, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Bumang, Route53 } from "@/assets";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/utils/cn";
import { useInteractiveStore } from "@/store/background";

gsap.registerPlugin(ScrollTrigger);

const NavLogo = () => {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/");
  };

  const handleScrollTriggeredSize = useCallback(() => {
    const originalWidth = (window.innerWidth * 0.94) / 2;
    gsap.set(".BUMANG, .ROUTE53", { width: originalWidth });

    gsap.to(".BUMANG, .ROUTE53", {
      width: 80,
      scrollTrigger: {
        trigger: ".LETTER_CONTAINER",
        start: "top top", // 스크롤이 바로 시작되도록 설정
        end: "200px top",

        scrub: true,
      },
    });
  }, []);

  const handleSwitchVisibility = (type: "show" | "hide") => {
    gsap.to(".SUB", {
      opacity: type === "show" ? 1 : 0,
      stagger: 0.03,
      ease: "power1.inOut",
    });
  };

  useEffect(() => {
    handleSwitchVisibility("hide");
    handleScrollTriggeredSize();

    // 새로고침 시 스크롤 상태를 반영
    ScrollTrigger.refresh();
    // eslint-disable-next-line
  }, []);

  const headerBackgroundColor = useInteractiveStore(
    (state) => state.header.backgroundColor,
  );

  return (
    <div
      className={cn(
        "LETTER_CONTAINER top-0 grid w-full grid-cols-2 gap-[1.5vw] overflow-hidden px-[10vw] py-3",
        headerBackgroundColor,
      )}
      onMouseEnter={() => handleSwitchVisibility("show")}
      onMouseLeave={() => handleSwitchVisibility("hide")}
    >
      <div className="flex h-fit flex-1 items-center justify-start">
        <Bumang
          className="BUMANG relative z-50 h-auto w-auto cursor-pointer"
          viewBox="0 0 802 140"
          preserveAspectRatio="xMinYMin meet"
          onClick={handleNavigate}
        />
      </div>
      <div className="flex h-fit flex-1 items-center justify-start">
        <Route53
          className="ROUTE53 relative z-50 h-auto w-auto cursor-pointer"
          viewBox="0 0 802 140"
          preserveAspectRatio="xMinYMin meet"
          onClick={handleNavigate}
        />
      </div>
    </div>
  );
};

export default NavLogo;
