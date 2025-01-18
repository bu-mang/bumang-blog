"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../_utils/cn";
import gsap from "gsap";
import {
  B,
  U1,
  M,
  A,
  N,
  G,
  R,
  O,
  U2,
  T,
  E,
  THREE,
  FIVE,
} from "../../_assets/logoLetters";

import { CONTAINER, LETTERS } from "../../_constants/headerRatio";

const NavBanner = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [subTextAnimated, setSubTextAnimated] = useState(false);
  const [widthRatio, setWidthRatio] = useState(1);
  const [heightRatio, setHeightRatio] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth, "innerWidth");
      setWidthRatio(window.innerWidth / CONTAINER.width);
      setHeightRatio(window.innerHeight / CONTAINER.height);

      console.log("mount once?");
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    handleVisibility("hide");

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef]);

  // useEffect(() => {
  //   gsap.to(".LETTER", {
  //     width: "100px", // 최종 크기
  //     height: "100px",
  //     scrollTrigger: {
  //       trigger: ".LETTER", // 트리거 기준 요소
  //       start: "top top", // 스크롤 시작 지점 (요소의 top과 뷰포트의 top)
  //       end: "+=500", // 500px 스크롤 시점
  //       scrub: true, // 스크롤에 따라 부드럽게 애니메이션
  //     },
  //   });
  // }, []);

  const handleVisibility = (type: "show" | "hide") => {
    gsap.to(".SUB", {
      opacity: type === "show" ? 1 : 0,
      stagger: 0.02,
      ease: "power1.inOut",
    });
  };

  const mainTextClass = cn(
    "absolute flex",
    !subTextAnimated && "opacity-100",
    subTextAnimated && "opacity-0",
  );

  return (
    <Link
      href="#"
      className="bg- relative flex aspect-[864/83] h-full w-full gap-[5vw] px-[1vw]"
      onMouseEnter={() => handleVisibility("show")}
      onMouseLeave={() => handleVisibility("hide")}
    >
      <div className="BUMANG relative flex flex-1 items-center justify-start overflow-hidden">
        <B
          className="B main LETTER"
          width={LETTERS.B.width * widthRatio}
          height={LETTERS.B.height * heightRatio}
          viewBox="0 0 111 140" // 실제 SVG의 원래 크기
          preserveAspectRatio="xMidYMid meet"
        />
        <U1
          className="U1 SUB LETTER"
          width={LETTERS.U1.width * widthRatio}
          height={LETTERS.U1.height * heightRatio}
          viewBox="0 0 129 140" // 실제 SVG의 원래 크기
          preserveAspectRatio="xMidYMid meet"
        />
        <M
          className="M SUB LETTER"
          width={LETTERS.M.width * widthRatio}
          height={LETTERS.M.height * heightRatio}
          viewBox="0 0 152 140" // 실제 SVG의 원래 크기
          preserveAspectRatio="xMidYMid meet"
        />
        <A
          className="A SUB LETTER"
          width={LETTERS.A.width * widthRatio}
          height={LETTERS.A.height * heightRatio}
          viewBox="0 0 142 140" // 실제 SVG의 원래 크기
          preserveAspectRatio="xMidYMid meet"
        />
        <N
          className="N SUB LETTER"
          width={LETTERS.N.width * widthRatio}
          height={LETTERS.N.height * heightRatio}
          viewBox="0 0 131 140" // 실제 SVG의 원래 크기
          preserveAspectRatio="xMidYMid meet"
        />
        <G
          className="G SUB LETTER"
          width={LETTERS.G.width * widthRatio}
          height={LETTERS.G.height * heightRatio}
          viewBox="0 0 136 140" // 실제 SVG의 원래 크기
          preserveAspectRatio="xMidYMid meet"
        />
      </div>
      <div
        className="ROUTE53 relative flex flex-1 items-center justify-start overflow-hidden"
        ref={containerRef}
        // onClick={() => setSubTextAnimated((prev) => !prev)}
      >
        <div className={mainTextClass}>
          <R
            className="R main-letter"
            width={LETTERS.R.width * widthRatio}
            height={LETTERS.R.height * heightRatio}
            viewBox="0 0 105 140" // 실제 SVG의 원래 크기
            preserveAspectRatio="xMidYMid meet"
          />
          <O
            className="O SUB LETTER"
            width={LETTERS.O.width * widthRatio}
            height={LETTERS.O.height * heightRatio}
            viewBox="0 0 154 140" // 실제 SVG의 원래 크기
            preserveAspectRatio="xMidYMid meet"
          />
          <U2
            className="U2 SUB LETTER"
            width={LETTERS.U2.width * widthRatio}
            height={LETTERS.U2.height * heightRatio}
            viewBox="0 0 121 140" // 실제 SVG의 원래 크기
            preserveAspectRatio="xMidYMid meet"
          />
          <T
            className="T SUB LETTER"
            width={LETTERS.T.width * widthRatio}
            height={LETTERS.T.height * heightRatio}
            viewBox="0 0 119 140" // 실제 SVG의 원래 크기
            preserveAspectRatio="xMidYMid meet"
          />
          <E
            className="E SUB LETTER"
            width={LETTERS.E.width * widthRatio}
            height={LETTERS.E.height * heightRatio}
            viewBox="0 0 97 140" // 실제 SVG의 원래 크기
            preserveAspectRatio="xMidYMid meet"
          />
          <FIVE
            className="FIVE SUB LETTER"
            width={LETTERS.FIVE.width * widthRatio}
            height={LETTERS.FIVE.height * heightRatio}
            viewBox="0 0 105 140" // 실제 SVG의 원래 크기
            preserveAspectRatio="xMidYMid meet"
          />
          <THREE
            className="THREE SUB LETTER"
            width={LETTERS.THREE.width * widthRatio}
            height={LETTERS.THREE.height * heightRatio}
            viewBox="0 0 103 140" // 실제 SVG의 원래 크기
            preserveAspectRatio="xMidYMid meet"
          />
        </div>

        {/* <div className={subTextClass}>
            <div
              className="flex h-1/2 flex-1 items-center tracking-tight lg:tracking-normal"
              style={subTextStyle}
            >
              IS WATCHING ...
            </div>
            <div
              className="flex h-1/2 items-center truncate tracking-tight lg:tracking-normal"
              style={subTextStyle}
            >
              전원일기 (2014)
            </div>
          </div> */}
      </div>
    </Link>
  );
};

export default NavBanner;
