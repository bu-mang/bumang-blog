import { ButtonBase, FillButton } from "@/components/common/button";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Modal from ".";

import { IoClose } from "react-icons/io5";
import { cn } from "@/utils/cn";

interface ExpandModalProps {
  image?: React.ReactNode;
  title?: string;
  desc?: React.ReactNode;

  // 진행 버튼 텍스트 & 함수
  proceedLabel?: string;
  proceedFn?: (...args: unknown[]) => Promise<unknown> | unknown;

  // 취소 버튼 텍스트 & 함수
  noDismiss?: boolean;
  dismissLabel?: string;
  dismissFn?: (...args: unknown[]) => Promise<unknown> | unknown;

  onResolve: (value?: boolean) => void;
  canNotEscape: boolean;

  actionStyle?: string;
  hasXIcon?: boolean;
}

export default function ExpandModal({
  title,
  desc,
  proceedLabel,
  proceedFn,

  noDismiss = false,
  dismissLabel,
  dismissFn,
  image,

  onResolve,
  canNotEscape = false,

  actionStyle,

  hasXIcon = true,
}: ExpandModalProps) {
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // 진행 눌렀을 때 실행되는 함수
  const handleProceed = async () => {
    try {
      setIsLoading(true);
      if (!!proceedFn) {
        await proceedFn();
      }

      handleClose();
    } catch (error: unknown) {
      console.log(error, "error");
    }
  };

  // 끄기 눌렀을 때 실행되는 함수
  const handleDismiss = async () => {
    try {
      if (canNotEscape) return;
      setIsLoading(true);
      if (!!dismissFn) {
        await dismissFn();
      }

      handleClose();
    } catch (error: unknown) {
      console.log(error, "error");
    }
  };

  // 끄기 함수
  const handleClose = () => {
    setIsLoading(false);
    setOpen(false);
    onResolve();
  };

  // 애니메이션
  // TODO: 커스텀 훅으로 전환?
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dimRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const containerEl = containerRef.current;

    if (!containerEl) return;

    const duration = 0.5;
    const amplitude = 1;
    const period = 0.3;
    //
    const tween = gsap.fromTo(
      containerEl,
      {
        y: 100,
        scaleX: 0.2,
        scaleY: 1.8,
        opacity: 0,
        transformOrigin: "center center",
      },
      {
        y: 0,
        duration,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        ease: `elastic.out(${amplitude}, ${period})`,
        clearProps: "all",
      },
    );

    return () => {
      tween.kill();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !canNotEscape) {
        handleDismiss();
        // handleUnmountAnimation(handleDismiss);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canNotEscape]);

  const handleUnmountAnimation = (closeFn: () => void) => {
    const containerEl = containerRef.current;
    const dimEl = dimRef.current;

    gsap.to(containerEl, {
      duration: 0.2,
      scaleX: 1.5, // 가로로 늘어나게
      scaleY: 0.5, // 세로로 납작하게
      opacity: 0,
      ease: "back.in(3)", // 약간 튕기는 효과
      onComplete: () => closeFn(), // 애니메이션 완료 후 실제 언마운트
    });

    gsap.to(dimEl, {
      duration: 0.2,
      opacity: 0,
      ease: "back.in(3)", // 약간 튕기는 효과
    });
  };

  return (
    <Modal
      open={open}
      onClose={() => handleUnmountAnimation(handleDismiss)}
      canNotEscape={canNotEscape}
      ref={dimRef}
    >
      <></>
    </Modal>
  );
}

ExpandModal.displayName = "ExpandModal";
