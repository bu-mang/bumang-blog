import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Modal from ".";

import Image from "next/image";
import { cn } from "@/utils/cn";
import { TfiClose } from "react-icons/tfi";
import { ButtonBase } from "@/components/common";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import playItems from "@/app/[locale]/play/playItemsData";
import { usePauseScroll } from "@/hooks/useLenis";
import { PlayItemType } from "@/types/playItem";

interface ExpandModalProps {
  id: number;

  onResolve: (value?: boolean) => void;
  canNotEscape: boolean;
}

const TRANSITION_MS = 300; // 좌우 슬라이드/스냅 시간
const AXIS_LOCK_PX = 8; // 이 이상 움직이면 드래그 축 결정

export default function ExpandModal({
  id,
  onResolve,
  canNotEscape = false,
}: ExpandModalProps) {
  // 순환 대상: null·blurred 제외한 유효 작품
  const validItems = useMemo(
    () => playItems.filter((it): it is PlayItemType => !!it && !it.isBlurred),
    [],
  );
  const len = validItems.length;

  const [index, setIndex] = useState(() =>
    Math.max(
      0,
      validItems.findIndex((it) => it.id === id),
    ),
  );
  const [visible, setVisible] = useState(false); // 진입 페이드(진입 시에만)
  const [containerW, setContainerW] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 0,
  );
  const [dragX, setDragX] = useState(0); // 트랙 가로 오프셋(px)
  const [transitioning, setTransitioning] = useState(false); // 슬라이드 트랜지션 on/off

  const containerRef = useRef<HTMLDivElement | null>(null);
  const dimRef = useRef<HTMLDivElement | null>(null);
  const closingRef = useRef(false);

  // 진입 페이드 인 (닫을 땐 페이드 없음)
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // 패널 너비 = 컨테이너 폭 (슬라이드 계산용)
  useLayoutEffect(() => {
    const measure = () =>
      setContainerW(containerRef.current?.clientWidth ?? window.innerWidth);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const handleClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    document.body.style.overflow = "unset";
    onResolve(); // 진입 페이드만 — 닫기는 즉시
  };

  // 좌우 슬라이드로 작품 전환(순환). direction 쪽으로 슬라이드 후 재중심.
  const goTo = (direction: "prev" | "next") => {
    if (len <= 1 || transitioning || containerW === 0) return;
    setTransitioning(true);
    setDragX(direction === "next" ? -containerW : containerW);
    window.setTimeout(() => {
      setIndex((i) =>
        direction === "next" ? (i + 1) % len : (i - 1 + len) % len,
      );
      setTransitioning(false);
      setDragX(0);
    }, TRANSITION_MS);
  };

  // 키보드: ← prev / → next / ESC 닫기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !canNotEscape) handleClose();
      if (e.key === "ArrowLeft") goTo("prev");
      if (e.key === "ArrowRight") goTo("next");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line
  }, [canNotEscape, len, transitioning, containerW]);

  usePauseScroll();

  // 유효 작품 없으면 닫기
  useEffect(() => {
    if (len === 0) handleClose();
    // eslint-disable-next-line
  }, [len]);

  // 마우스 포인터 드래그: 팔로우 + 축 감지 + 스냅
  const drag = useRef<{ x: number; y: number; axis: "none" | "x" | "y" } | null>(
    null,
  );
  const movedRef = useRef(false); // 드래그 직후 배경 클릭(닫힘) 무시용

  const onPointerDown = (e: React.PointerEvent) => {
    if (transitioning) return;
    drag.current = { x: e.clientX, y: e.clientY, axis: "none" };
    movedRef.current = false;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (d.axis === "none") {
      if (Math.abs(dx) > AXIS_LOCK_PX || Math.abs(dy) > AXIS_LOCK_PX) {
        d.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y"; // 가로 우세만 스와이프
      }
    }
    if (d.axis === "x") {
      movedRef.current = true;
      setDragX(dx); // 이미지가 커서를 따라 이동
    }
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.axis !== "x") return;
    const dx = e.clientX - d.x;
    const threshold = Math.max(60, containerW * 0.15);
    if (dx <= -threshold) goTo("next");
    else if (dx >= threshold) goTo("prev");
    else {
      // 임계값 미달 → 제자리로 스냅
      setTransitioning(true);
      setDragX(0);
      window.setTimeout(() => setTransitioning(false), TRANSITION_MS);
    }
  };
  const suppressClickAfterDrag = (e: React.MouseEvent) => {
    if (movedRef.current) {
      e.stopPropagation();
      movedRef.current = false;
    }
  };

  if (len === 0) return <></>;

  const buttonClassName =
    "fixed bottom-0 top-0 z-[110] m-auto h-fit w-fit cursor-pointer rounded-xl p-1 hover:bg-gray-100/10";

  const panelW = containerW || (typeof window !== "undefined" ? window.innerWidth : 0);

  const renderPanel = (item: PlayItemType) => {
    const {
      title,
      content,
      items,
      isCentered,
      imageOnly,
      containerClassName,
      fill,
      objectFit,
      maxWidth,
    } = item;
    return (
      <div
        className="flex h-full shrink-0 justify-center overflow-y-auto"
        style={{ width: panelW }}
      >
        <div
          className={cn(
            "flex h-fit select-none flex-col items-center gap-3 py-20",
            isCentered && "h-full justify-center",
            containerClassName,
          )}
          style={{ maxWidth: maxWidth ?? "60%" }}
          onClick={(e) => e.stopPropagation()}
        >
          {items.map((img, i) => (
            <div key={`${img.imgUrl.src ?? img.imgUrl}-${i}`}>
              <Image
                className="flex-1"
                src={img.imgUrl}
                width={!fill ? img.width : undefined}
                height={!fill ? img.height : undefined}
                alt={img.title ?? "galleryImage"}
                fill={fill}
                draggable={false}
                style={{
                  aspectRatio: `${img.width} / ${img.height}`,
                  objectFit,
                }}
                sizes={fill ? "100vw" : undefined}
                placeholder={img.placeholder ? "blur" : undefined}
              />
            </div>
          ))}

          {!imageOnly && (
            <div className="flex w-full flex-col items-center">
              <span className="text-white">{title}</span>
              <span className="text-gray-100">{content}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const prevItem = validItems[(index - 1 + len) % len];
  const currentItem = validItems[index];
  const nextItem = validItems[(index + 1) % len];

  return (
    <Modal
      open
      onClose={() => handleClose()}
      canNotEscape={canNotEscape}
      ref={dimRef}
      className={cn("duration-300", visible ? "opacity-100" : "opacity-0")}
    >
      {/* 스와이프 뷰포트 */}
      <div
        ref={containerRef}
        className="relative h-[100vh] w-full overflow-hidden"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onDragStart={(e) => e.preventDefault()}
        onClick={suppressClickAfterDrag}
      >
        {/* CLOSE_BUTTON */}
        <ButtonBase
          className="fixed right-10 top-10 z-[110]"
          onClick={() => handleClose()}
        >
          <TfiClose
            className="rounded-lg p-1 text-gray-200 transition-all hover:bg-gray-5/10"
            size={32}
          />
        </ButtonBase>

        {/* TRACK: [이전 · 현재 · 다음] */}
        <div
          className="flex h-full"
          style={{
            transform: `translateX(${-panelW + dragX}px)`,
            transition: transitioning
              ? `transform ${TRANSITION_MS}ms ease`
              : "none",
          }}
        >
          {renderPanel(prevItem)}
          {renderPanel(currentItem)}
          {renderPanel(nextItem)}
        </div>

        {/* 이전(왼쪽) / 다음(오른쪽) */}
        <ButtonBase
          onClick={(e) => {
            e.stopPropagation();
            goTo("prev");
          }}
          className={cn(buttonClassName, "left-[10%]")}
        >
          <BsChevronLeft className="text-white" size={32} />
        </ButtonBase>

        <ButtonBase
          onClick={(e) => {
            e.stopPropagation();
            goTo("next");
          }}
          className={cn(buttonClassName, "right-[10%]")}
        >
          <BsChevronRight className="text-white" size={32} />
        </ButtonBase>
      </div>
    </Modal>
  );
}

ExpandModal.displayName = "ExpandModal";
