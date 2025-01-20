"use client";

import Link from "next/link";
import { useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Bumang, Route53 } from "../../_assets";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const NavLogo = () => {
  const router = useRouter();
  const handleRouter = () => {
    router.push("/");
  };

  const handleScrollTriggeredSize = () => {
    gsap.to(".BUMANG, .ROUTE53", {
      width: 80,
      transformOrigin: "left top", // 좌측 상단 기준
      scrollTrigger: {
        start: "50px top",
        end: "300px top",

        scrub: true,
        markers: true,
      },
    });
  };

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
  }, []);

  return (
    <div
      className="LETTER_CONTAINER relative top-0 z-50 grid w-full grid-cols-2 gap-[5vw] overflow-hidden px-[1vw] py-3"
      onMouseEnter={() => handleSwitchVisibility("show")}
      onMouseLeave={() => handleSwitchVisibility("hide")}
    >
      <div className="relative flex h-fit flex-1 items-center justify-start">
        <Bumang
          className="BUMANG h-auto w-auto"
          viewBox="0 0 802 140"
          preserveAspectRatio="xMinYMin meet"
          onClick={handleRouter}
        />
      </div>
      <div className="relative flex h-fit flex-1 items-center justify-start">
        <Route53
          className="ROUTE53 h-auto w-auto"
          viewBox="0 0 802 140"
          preserveAspectRatio="xMinYMin meet"
          onClick={handleRouter}
        />
      </div>
    </div>
  );
};

export default NavLogo;
