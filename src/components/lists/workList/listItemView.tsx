import { StackTree } from "@/types/item";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Halftone from "../../../../public/halftone";
import PreviewDetail from "./previewDetail";
import Link from "next/link";

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
  roleMain: "FullStack" | "Front" | "Back";
  roleDetail: string[];
  stack: StackTree[];
  participants:
    | "Solo Project"
    | "Team Project - Teammate"
    | "Team Project - Leader";
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
  createAt,
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
  const [bgScale, setBgScale] = useState(1);

  const handleEnter = () => {
    setIsHover(true);
    setHalftoneScale(2);
  };

  const handleLeave = () => {
    setIsHover(false);
    setHalftoneScale(1);
  };

  return (
    <Link
      href={`/work/${categoryType}/` + title.split(" ").join("")}
      className="group flex h-[300px] w-full cursor-pointer justify-center overflow-hidden rounded-12"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ border: `1px solid ${bgColor}` }}
    >
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
          "relative flex w-fit flex-col items-center justify-center transition-all group-hover:w-3/5",
        )}
      >
        {!isHover && (
          <div className="text-120 flex h-full w-full items-center justify-center text-center font-semibold text-white">
            {title}
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
          zIndex: -1,
          transform: `translateX(-20px) scale(${halftoneScale}) rotate(180deg)`,
          transition: "all 0.1s ease-out",
          opacity: isHover ? 1 : 0,
        }}
      />
    </Link>
  );
};

export default ListItemView;
