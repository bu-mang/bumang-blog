"use client";

import Image from "next/image";
import { Character, Hand, RoarHair, Wrist } from "@/assets/play";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HandDeepInside() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      gsap.to(".ANIM_ALL", {
        y: -10,
        duration: 3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });

      // 손목 회전 애니메이션 (독립적)
      gsap.to(".ANIM_HAND", {
        rotation: -2,
        transformOrigin: "100% 25%",
        duration: 4,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });

      // 머리카락 애니메이션
      gsap.to(".ANIM_ROAR_HAIR", {
        rotation: -10,
        transformOrigin: "50% 0%",
        delay: 1,
        duration: 4,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, containerRef);

    return () => ctx.revert(); // <- 클린업
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed left-0 top-0 h-screen w-screen bg-gradient-to-tl from-red-700 to-red-900 will-change-transform"
    >
      {/* 전체 씬 */}
      <div className="ANIM_ALL relative -top-32 right-20 scale-125">
        <Image
          src={Wrist}
          alt="Wrist"
          width={716 / 2}
          height={440 / 2}
          className="absolute right-0 top-0"
        />

        {/* 손과 캐릭터 (손목 제외) */}
        <div className="ANIM_HAND absolute right-[300px] top-0 h-[894px] w-[1003px] will-change-transform">
          {/* <div className="absolute left-0 top-0 h-1/4 w-full bg-blue-500" /> */}
          <Image
            src={Hand}
            alt="Hand"
            width={2006 / 2}
            height={1788 / 2}
            className="absolute -top-[2px] right-0"
          />

          {/* 캐릭터만 */}
          <div className="ANIM_CHARACTER absolute -left-[64px] bottom-[144px] h-[312.5px] w-[174.5px] will-change-transform">
            <Image
              src={RoarHair}
              alt="RoarHair"
              width={69 / 2}
              height={67 / 2}
              className="ANIM_ROAR_HAIR absolute left-[24px] top-[48px] will-change-transform"
            />
            <Image
              src={Character}
              alt="Character"
              width={349 / 2}
              height={625 / 2}
              className="absolute left-0 top-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
