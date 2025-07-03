"use client";

import { ButtonBase } from "@/components/common";
import ExpandModal from "@/components/modal/type/expand";
import useModalStore from "@/store/modal";
import { cn } from "@/utils/cn";

interface PlayItemProps {
  title: string;
  content: string;
  height: number;
  className?: string;
}

const PlayItem = ({ title, content, height, className }: PlayItemProps) => {
  const openModal = useModalStore((state) => state.openModal);
  const handleClick = () => {
    openModal(ExpandModal, {
      title: "?",
    });
  };

  return (
    <button onClick={handleClick} className="group flex">
      <div
        className={cn(
          "flex-1 transition-all group-hover:-translate-y-2",
          className,
        )}
        style={{ height }}
      >
        <span>{title}</span>
        <span>{content}</span>
      </div>
    </button>
  );
};

export default PlayItem;
