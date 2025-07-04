import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Modal from ".";

import Image from "next/image";
import { ImageItemType } from "@/types/playItem";
import { cn } from "@/utils/cn";
import { TfiClose } from "react-icons/tfi";
import { ButtonBase } from "@/components/common";

interface ExpandModalProps {
  title?: string;
  content?: string;
  items: ImageItemType[];
  imageOnly?: boolean;

  containerClassName?: string;
  fill?: boolean;
  objectFit?: "cover" | "contain";

  onResolve: (value?: boolean) => void;
  canNotEscape: boolean;
}

export default function ExpandModal({
  title,
  content,
  items,
  imageOnly,

  containerClassName,
  fill,
  objectFit,

  onResolve,
  canNotEscape = false,
}: ExpandModalProps) {
  const [open, setOpen] = useState(true);

  // const maxWidth = Math.max(...items.map((item) => item.width));

  const dimRef = useRef<HTMLDivElement | null>(null);
  const handleUnmountAnimation = (closeFn: () => void) => {
    const dimEl = dimRef.current;

    gsap.to(dimEl, {
      duration: 0.2,
      opacity: 0,
      ease: "back.in(3)",
      onComplete: closeFn,
    });
  };

  // 끄기 함수
  const handleClose = () => {
    document.body.style.overflow = "unset";
    setOpen(false);
    onResolve();
  };

  useEffect(() => {
    // 또는 body에 Lenis 제어 클래스 추가
    document.body.classList.add("lenis-stopped");
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !canNotEscape) {
        handleUnmountAnimation(handleClose);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canNotEscape]);

  return (
    <Modal
      open={open}
      onClose={() => handleUnmountAnimation(handleClose)}
      canNotEscape={canNotEscape}
      ref={dimRef}
    >
      <div className="flex h-[100vh] w-full justify-center overflow-y-auto">
        <ButtonBase
          className="fixed right-10 top-10"
          onClick={() => {
            handleUnmountAnimation(handleClose);
          }}
        >
          <TfiClose
            className="rounded-lg p-1 text-gray-200 transition-all hover:bg-gray-5/10"
            size={32}
          />
        </ButtonBase>

        <div
          className={cn(
            "flex h-fit w-fit flex-col items-center gap-3 py-20",
            containerClassName,
          )}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {items.map((item) => {
            return (
              <Image
                className="flex-shrink-0"
                key={item.title}
                src={item.imgUrl}
                width={!fill ? item.width : undefined}
                height={!fill ? item.height : undefined}
                alt={item.title ?? "galleryImage"}
                fill={fill}
                objectFit={objectFit}
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
      </div>
    </Modal>
  );
}

ExpandModal.displayName = "ExpandModal";
