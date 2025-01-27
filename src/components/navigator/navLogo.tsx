"use client";

import { useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Bumang, Route53 } from "../../assets";
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
      scrollTrigger: {
        trigger: ".LETTER_CONTAINER",
        start: "top top", // 스크롤이 바로 시작되도록 설정
        end: "200px top",

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
      className="LETTER_CONTAINER top-0 grid w-full grid-cols-2 gap-[1vw] overflow-hidden bg-white px-[3vw] py-3"
      onMouseEnter={() => handleSwitchVisibility("show")}
      onMouseLeave={() => handleSwitchVisibility("hide")}
    >
      <div className="flex h-fit flex-1 items-center justify-start">
        <Bumang
          className="BUMANG relative z-50 h-auto w-auto cursor-pointer"
          viewBox="0 0 802 140"
          preserveAspectRatio="xMinYMin meet"
          onClick={handleRouter}
        />
      </div>
      <div className="flex h-fit flex-1 items-center justify-start">
        <Route53
          className="ROUTE53 relative z-50 h-auto w-auto cursor-pointer"
          viewBox="0 0 802 140"
          preserveAspectRatio="xMinYMin meet"
          onClick={handleRouter}
        />
      </div>
    </div>
  );
};

export default NavLogo;
