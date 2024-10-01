import { StackTree } from "@/types/item";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Halftone from "../../../../public/halftone";
import PreviewDetail from "./previewDetail";
import Link from "next/link";
import BackgroundImage from "./backgroundImage";
import { dateFormat } from "@/util/dateFormat";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface ListItemProps {
  id: string;
  title: string; // 제목
  desc?: string;
  categoryType: string;
  bgImage: string; // 배경
  bgColor: string;
  date: {
    startDate: Date;
    endDate?: Date;
  };
  createAt: Date;
  roleMain: "FullStack" | "Frontend" | "Backend";
  roleDetail: string[];
  stack: StackTree[];
  participants: "Solo Project" | "Team Project";
  platform: string[];

  link: {
    github: string;
    deploy: string;
  };

  admin?: {
    id: string;
    password: string;
  };
}

const ListItemView = ({
  id,
  title,
  desc,
  categoryType,
  bgImage,
  bgColor,
  date,
  roleMain,
  roleDetail,
  stack,
  participants,
  platform,
  link,
  admin,
}: ListItemProps) => {
  const [isHover, setIsHover] = useState(false);
  const [halftoneScale, setHalftoneScale] = useState(1);

  const boxRef = useRef(null);

  const handleEnter = () => {
    setIsHover(true);
    setHalftoneScale(2);
  };

  const handleLeave = () => {
    setIsHover(false);
    setHalftoneScale(1);
  };

  useEffect(() => {
    gsap.to(boxRef.current, {
      scrollTrigger: {
        trigger: boxRef.current, // boxRef.current 요소가 트리거가 됨
        start: "0% 100%", // 트리거가 시작되는 시점 (화면의 30% 지점에서 시작)
        end: "100% 0%", // 트리거가 끝나는 시점 (화면의 80% 지점에서 끝)
        scrub: true, // 스크롤과 애니메이션을 동기화
        // markers: true, // 개발 편의를 위한 가이드선
      },
      y: -200, // y축으로 -100px 이동
      // ease: "none", // 스크롤과 동기화된 애니메이션이므로 easing 없음
    });
  }, []);

  return (
    <Link
      href={`/work/${categoryType}/` + title.split(" ").join("")}
      className="group relative flex h-[360px] w-full cursor-pointer justify-center overflow-hidden rounded-12"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ border: `4px solid ${bgColor}` }}
    >
      <div className="absolute z-50 h-full w-full transition-all group-hover:opacity-70" />
      <BackgroundImage bgImage={bgImage} ref={boxRef} />
      {isHover && (
        <div className="absolute -z-0 h-full w-full bg-black opacity-30" />
      )}
      <Halftone
        fillColor={isHover ? bgColor : "none"}
        style={{
          transform: `translateX(20px) scale(${halftoneScale})`,
          transition: "all 0.1s ease-in-out",
          opacity: isHover ? 1 : 0,
        }}
      />
      <div
        className={twMerge(
          "relative flex w-full flex-col items-center justify-center transition-all group-hover:w-3/5",
        )}
      >
        {/* 태그 */}
        {!isHover && (
          <div className="flex h-full w-full items-center justify-center text-center font-semibold text-white">
            <div className="absolute left-0 top-6 text-16 font-normal text-white">
              {dateFormat(date.startDate, "year month")} -{" "}
              {dateFormat(date.endDate, "year month")}
            </div>
            <div className="absolute right-0 top-6 flex gap-4 text-16 font-normal text-white">
              <span>As a </span>
              <span className="border-b border-white px-2">{roleMain} Dev</span>
              <span>In</span>
              <span className="border-b border-white px-2">{participants}</span>
            </div>
            <div className="absolute top-4 rounded-16 border border-white px-6 py-2 text-16 font-normal">
              {categoryType.split("-").join(" ").toUpperCase()}
            </div>
            <span className="text-shadow text-120">{title}</span>
          </div>
        )}
        {isHover && (
          <PreviewDetail
            title={title}
            desc={desc}
            id={id}
            bgColor={bgColor}
            date={date}
            roleMain={roleMain}
            roleDetail={roleDetail}
            stack={stack}
            participants={participants}
            platform={platform}
            link={link}
            admin={admin}
          />
        )}
      </div>
      <Halftone
        fillColor={isHover ? bgColor : "none"}
        style={{
          position: "relative",
          zIndex: 0,
          transform: `translateX(-20px) scale(${halftoneScale}) rotate(180deg)`,
          transition: "all 0.1s ease-out",
          opacity: isHover ? 1 : 0,
        }}
      />
    </Link>
  );
};

export default ListItemView;
