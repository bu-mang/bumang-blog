"use client";

import { useCanvasPanning } from "@/hooks/useCanvasPanning";
import PlayCanvasItem from "./playCanvasItem";
import { PlayItemType } from "@/types/playItem";

interface PlayCanvasProps {
  items: PlayItemType[];
  canvasWidth?: number;
  canvasHeight?: number;
}

/**
 * 캔버스 기본 크기
 * - 뷰포트(약 1920x1080)보다 훨씬 큰 영역
 * - 마우스로 패닝하며 탐험하는 느낌을 줌
 */
const CANVAS_WIDTH = 4000;
const CANVAS_HEIGHT = 2000;

/**
 * Play 페이지의 캔버스 컨테이너
 *
 * 구조:
 * - containerRef: 뷰포트 역할 (화면 크기, overflow-hidden)
 * - canvasRef: 실제 캔버스 (4000x2000, 이동 대상)
 *
 * useCanvasPanning 훅이 canvasRef를 transform으로 이동시켜
 * 마우스 기반 패닝을 구현함
 */
export default function PlayCanvas({
  items,
  canvasWidth = CANVAS_WIDTH,
  canvasHeight = CANVAS_HEIGHT,
}: PlayCanvasProps) {
  const { canvasRef, containerRef } = useCanvasPanning({
    canvasWidth,
    canvasHeight,
  });

  return (
    // 뷰포트 (화면 크기, 캔버스를 감싸는 마스크 역할)
    <div
      ref={containerRef}
      className="relative h-screen w-screen overflow-hidden bg-background"
    >
      {/* 실제 캔버스 (4000x2000, GSAP으로 위치 이동) */}
      <div
        ref={canvasRef}
        className="absolute"
        style={{
          width: canvasWidth,
          height: canvasHeight,
        }}
      >
        {items.map((item) => (
          <PlayCanvasItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
