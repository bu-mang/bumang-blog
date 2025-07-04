"use client";

import ExpandModal from "@/components/modal/type/expand";
import useModalStore from "@/store/modal";
import { ImageItemType } from "@/types/playItem";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface PlayItemProps {
  title?: string;
  content?: string;
  width: number;
  height: number;
  items: ImageItemType[];
  imageOnly?: boolean;
  className?: string;
}

const PlayItem = ({
  title,
  content,
  width,
  height,
  imageOnly,
  className,
  items,
}: PlayItemProps) => {
  const textHeight = (title ? 1 : 0) + (content ? 1 : 0);
  const ref = useRef<HTMLDivElement | null>(null);

  const [containerWidth, setContainerWidth] = useState(200);

  useEffect(() => {
    if (!ref.current) return;

    const handleResize = () => {
      const width = ref.current?.getBoundingClientRect().width;
      setContainerWidth((width ?? 200) * 0.8);
    };

    ref.current.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      ref.current?.removeEventListener("resize", handleResize);
    };
  }, []);

  const openModal = useModalStore((state) => state.openModal);
  const handleClick = () => {
    openModal(ExpandModal, {
      title,
      content,
      items,
      imageOnly,
    });
  };

  return (
    <button onClick={handleClick} className="group flex flex-1">
      <div
        ref={ref}
        className={cn(
          "flex flex-1 flex-col justify-center transition-all",
          className,
        )}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        {/* IMAGE */}
        <div className="relative flex flex-1">
          <Image
            src={"/star.webp"}
            alt={title ?? "GalleryImage"}
            className="object-contain"
            fill
          />
        </div>

        {/* DESC */}
        <div
          className={cn(
            "flex-0 mt-2 flex h-0 w-full min-w-0 flex-col overflow-hidden opacity-0 transition-all group-hover:opacity-100",
            textHeight === 1 && "group-hover:h-5",
            textHeight === 2 && "group-hover:h-10",
          )}
          style={{
            transition: "opacity 0.3s ease-in, height 0.3s ease-out",
          }}
        >
          {title && (
            <div className="flex h-5 w-full items-center justify-center text-sm">
              <span
                className="truncate text-center"
                style={{ width: containerWidth }}
              >
                {title}
              </span>
            </div>
          )}

          {content && (
            <div className="flex h-5 w-full items-center justify-center text-sm text-gray-300">
              <span
                className="truncate text-center"
                style={{ width: containerWidth }}
              >
                {content}
              </span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default PlayItem;
