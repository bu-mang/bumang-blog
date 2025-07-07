import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Modal from ".";

import Image from "next/image";
import { cn } from "@/utils/cn";
import { TfiClose } from "react-icons/tfi";
import { ButtonBase } from "@/components/common";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import playItems from "@/app/[locale]/play/playItemsData";

// export interface PlayItemMetaData {
//   id: number;
//   title?: string;
//   content?: string;
//   items: ImageItemType[];

//   thumnail: ImageItemType;

//   createdAt: string;
// }

// export interface PlayItemStyle {
//   isVisible?: boolean;
//   imageOnly?: boolean;
//   containerClassName?: string;
//   fill?: boolean;
//   objectFit?: "cover" | "contain";
// }

interface ExpandModalProps {
  id: number;

  onResolve: (value?: boolean) => void;
  canNotEscape: boolean;
}

export default function ExpandModal({
  id,
  onResolve,
  canNotEscape = false,
}: ExpandModalProps) {
  const [open, setOpen] = useState(true);
  const [currentId, setCurrentId] = useState(id);

  const contentsRef = useRef<null | HTMLDivElement>(null);

  // 끄기 함수
  const handleClose = () => {
    document.body.style.overflow = "unset";
    setOpen(false);
    onResolve();
  };

  const dimRef = useRef<HTMLDivElement | null>(null);
  let targetItem = playItems.find((item) => item && item.id === currentId);

  const handleChangeContents = (
    e: React.MouseEvent | React.KeyboardEvent | KeyboardEvent,
    direction: "prev" | "next",
  ) => {
    e.stopPropagation();
    const isPrev = direction === "prev";

    const changableItem = playItems.find(
      (item) => item && item.id === currentId + (isPrev ? -1 : 1),
    );

    if (changableItem) {
      setCurrentId(changableItem.id);
    }
  };

  useEffect(() => {
    console.log(targetItem, "targetItem");
    if (!targetItem) handleClose();
  }, [targetItem]);

  useEffect(() => {
    // 또는 body에 Lenis 제어 클래스 추가
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e, "keydown");
      if (e.key === "Escape" && !canNotEscape) {
        handleClose();
      }

      if (e.key === "ArrowRight") {
        handleChangeContents(e, "prev");
      }

      if (e.key === "ArrowLeft") {
        handleChangeContents(e, "next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canNotEscape, currentId]);

  if (!targetItem) {
    return <></>;
  }

  const {
    // id,
    title,
    content,
    items,
    thumnail,
    createdAt,
    isVisible,
    isCentered,
    imageOnly,
    containerClassName,
    fill,
    objectFit,
    maxWidth,
  } = targetItem;

  return (
    <Modal
      open={open}
      // onClose={() => handleUnmountAnimation(handleClose)}
      onClose={() => handleClose()}
      canNotEscape={canNotEscape}
      ref={dimRef}
    >
      <div className="relative flex h-[100vh] w-full justify-center overflow-y-auto">
        {/* CLOSE_BUTTON */}
        <ButtonBase
          className="fixed right-10 top-10"
          onClick={() => {
            handleClose();
          }}
        >
          <TfiClose
            className="rounded-lg p-1 text-gray-200 transition-all hover:bg-gray-5/10"
            size={32}
          />
        </ButtonBase>

        {/* CONTENTS */}
        <div
          ref={contentsRef}
          className={cn(
            "flex h-fit flex-col items-center gap-3 py-20",
            isCentered && "flex h-full flex-col justify-center",
            containerClassName,
          )}
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{ maxWidth: maxWidth ?? "60%" }}
        >
          {items.map((item) => {
            return (
              <Image
                className="flex-1"
                key={item.title}
                src={item.imgUrl}
                width={!fill ? item.width : undefined}
                height={!fill ? item.height : undefined}
                alt={item.title ?? "galleryImage"}
                fill={fill}
                objectFit={objectFit}
                style={{ aspectRatio: `${item.width} / ${item.height}` }}
              />
            );
          })}

          {!imageOnly && (
            <div className="flex w-full flex-col items-center">
              <span className="text-white">{title}</span>
              <span className="text-gray-100">{content}</span>
            </div>
          )}
        </div>

        {/* 이전/다음 */}
        <ButtonBase
          onClick={(e) => handleChangeContents(e, "next")}
          className="fixed bottom-0 left-[10%] top-0 z-[100] m-auto h-fit w-fit rounded-xl p-1 hover:bg-gray-100/10"
        >
          <BsChevronLeft className="text-white" size={32} />
        </ButtonBase>

        <ButtonBase
          onClick={(e) => handleChangeContents(e, "prev")}
          className="fixed bottom-0 right-[10%] top-0 z-[100] m-auto h-fit w-fit rounded-xl p-1 hover:bg-gray-100/10"
        >
          <BsChevronRight className="text-white" size={32} />
        </ButtonBase>
      </div>
    </Modal>
  );
}

ExpandModal.displayName = "ExpandModal";
