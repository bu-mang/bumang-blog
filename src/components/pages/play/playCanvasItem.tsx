"use client";

import { PlayItemType } from "@/types/playItem";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

interface PlayCanvasItemProps {
  item: PlayItemType;
}

/**
 * 캔버스 위의 개별 아이템 컴포넌트
 *
 * 주요 기능:
 * 1. 절대 위치 배치 (position.x, y)
 * 2. 호버 시 제목 표시 애니메이션
 * 3. 마우스 거리 기반 스케일링 (Proximity-based scaling)
 */
export default function PlayCanvasItem({ item }: PlayCanvasItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null); // 제목 영역 (호버 애니메이션용)
  const itemRef = useRef<HTMLAnchorElement>(null); // 아이템 전체 (거리 계산용)
  const imageContainerRef = useRef<HTMLDivElement>(null); // 이미지 컨테이너 (스케일 애니메이션용)

  const { position, thumnail, title, content, id } = item;
  const { x, y, width = 200, height = 200, rotation = 0 } = position;

  /**
   * 제목 표시/숨김 애니메이션
   * - 호버 시: 아래에서 위로 페이드 인
   * - 호버 해제: 위에서 아래로 페이드 아웃
   */
  useEffect(() => {
    if (!titleRef.current) return;

    if (isHovered) {
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(titleRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isHovered]);

  /**
   * 마우스와 아이템 중심 사이 거리 기반 스케일 계산
   *
   * @param mouseX - 마우스 X 좌표 (viewport 기준)
   * @param mouseY - 마우스 Y 좌표 (viewport 기준)
   * @returns 스케일 값 (1.0 ~ 1.08)
   *
   * 동작 원리:
   * - 거리 0px → scale 1.08 (최대)
   * - 거리 400px 이상 → scale 1.0 (최소)
   * - 그 사이는 선형 보간
   */
  const calculateScale = useCallback(
    (mouseX: number, mouseY: number) => {
      if (!itemRef.current) return 1;

      // 아이템의 화면상 위치 (getBoundingClientRect는 viewport 기준)
      const rect = itemRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // 피타고라스 정리로 거리 계산
      const distance = Math.sqrt(
        Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
      );

      // 스케일 파라미터
      const maxDistance = 400; // 이 거리 이상이면 minScale
      const minScale = 1;
      const maxScale = 1.08;

      // 거리를 0~1로 정규화 (400px 이상은 1로 클램프)
      const normalizedDistance = Math.min(distance / maxDistance, 1);

      // 스케일 계산: 가까울수록 크게
      const scale = maxScale - normalizedDistance * (maxScale - minScale);

      return scale;
    },
    []
  );

  /**
   * 전역 마우스 움직임 감지
   * - 매 움직임마다 거리 계산 → 스케일 업데이트
   * - GSAP으로 부드럽게 전환 (duration: 0.4s)
   */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageContainerRef.current) return;

      const scale = calculateScale(e.clientX, e.clientY);

      gsap.to(imageContainerRef.current, {
        scale,
        duration: 0.4,
        ease: "power2.out",
        overwrite: true, // 이전 애니메이션 즉시 중단
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [calculateScale]);

  return (
    <Link
      ref={itemRef}
      href={`/play/${id}`}
      className="group absolute block cursor-pointer"
      style={{
        left: x,
        top: y,
        width,
        height,
        transform: `rotate(${rotation}deg)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 이미지 컨테이너 (스케일 애니메이션 대상) */}
      <div
        ref={imageContainerRef}
        className="relative h-full w-full overflow-hidden rounded-lg"
      >
        <Image
          src={thumnail.imgUrl}
          alt={title ?? "PlayItem"}
          fill
          className="object-cover"
          sizes={`${width}px`}
          placeholder={thumnail.placeholder === false ? undefined : "blur"}
          unoptimized={thumnail.unoptimized} // 애니메이션 이미지용
        />
      </div>

      {/* 제목 영역 (호버 시 표시) */}
      <div
        ref={titleRef}
        className="pointer-events-none absolute -bottom-12 left-0 right-0 text-center opacity-0"
      >
        <span className="text-sm font-medium text-foreground">{title}</span>
        {content && (
          <span className="block text-xs text-muted-foreground">{content}</span>
        )}
      </div>
    </Link>
  );
}
