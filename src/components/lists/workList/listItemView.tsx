import { StackTree } from "@/types/item";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Halftone from "../../../../public/halftone";
import PreviewDetail from "./previewDetail";
import Link from "next/link";

interface ListItemProps {
  id: string;
  title: string; // 제목
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
  participants: "Solo" | "Team";
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

  // const asd = useAnimationProp()

  return (
    <Link
      href={"/work/" + title.split(" ").join("")}
      className="group flex h-[300px] w-full cursor-pointer justify-center overflow-hidden rounded-12"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ border: `1px solid ${bgColor}` }}
    >
      <Halftone
        fillColor={bgColor}
        style={{ transform: `translateX(20px) scale(${halftoneScale})` }}
      />
      <div
        className={twMerge(
          "relative flex h-full w-1/3 flex-col items-center justify-center transition-all duration-300 group-hover:w-2/5",
        )}
        style={{ backgroundColor: bgColor }}
      >
        {!isHover && (
          <div className="flex items-center justify-center text-center text-80 font-semibold text-white">
            {title}
          </div>
        )}
        {isHover && (
          <PreviewDetail
            title={title}
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
        fillColor={bgColor}
        style={{
          position: "relative",
          zIndex: -1,
          transform: `translateX(-20px) scale(${halftoneScale}) rotate(180deg)`,
        }}
      />
    </Link>
  );
};

export default ListItemView;
