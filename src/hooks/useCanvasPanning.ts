"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface CanvasPanningOptions {
  canvasWidth: number;
  canvasHeight: number;
  /** 속도 전환 부드러움 (0~1). 낮을수록 부드럽게 전환. Lenis 스타일. */
  lerp?: number;
  /** 마우스 움직임 → 속도 변환 계수. 낮을수록 둔감. */
  speedFactor?: number;
  /** 가장자리 밀림 강도. 높을수록 빠르게 밀림. */
  edgeStrength?: number;
  /** 최대 속도 제한 (px/frame) */
  maxVelocity?: number;
}

interface CanvasPanningReturn {
  canvasRef: React.MutableRefObject<HTMLDivElement | null>;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
}

/**
 * 캔버스 패닝 훅 (Lusano.com 스타일)
 *
 * ## 동작 원리
 *
 * 1. **마우스 움직임 → targetVelocity 증가**
 *    - 마우스를 빠르게 움직이면 targetVelocity가 커짐
 *
 * 2. **Edge Push (가장자리 밀림)**
 *    - 마우스가 화면 가장자리에 있으면 지속적으로 힘이 가해짐
 *    - 중앙 30% 영역은 dead zone (힘 없음)
 *
 * 3. **Lerp로 부드러운 전환**
 *    - velocity가 targetVelocity를 향해 서서히 변화
 *    - Lenis 스크롤 라이브러리와 동일한 방식
 *
 * 4. **캔버스 이동**
 *    - velocity만큼 캔버스 위치 업데이트
 *    - 경계를 벗어나지 않도록 clamp
 *
 * ## 속도 조절 가이드
 * - 전체적으로 느리게: lerp↓, speedFactor↓, edgeStrength↓, maxVelocity↓
 * - 마우스 민감도: speedFactor
 * - 가장자리 밀림: edgeStrength
 * - 부드러움: lerp (낮을수록 부드러움)
 */
export function useCanvasPanning({
  canvasWidth,
  canvasHeight,
  lerp = 0.04,
  speedFactor = 0.065,
  edgeStrength = 1.0,
  maxVelocity = 4,
}: CanvasPanningOptions): CanvasPanningReturn {
  const containerRef = useRef<HTMLDivElement>(null); // 뷰포트 (화면 크기)
  const canvasRef = useRef<HTMLDivElement>(null); // 캔버스 (이동 대상)

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const viewportWidth = container.clientWidth;
    const viewportHeight = container.clientHeight;

    // ─────────────────────────────────────────────────────────────
    // 경계 계산
    // 캔버스가 뷰포트 밖으로 나가지 않도록 제한
    // 예: 캔버스 4000px, 뷰포트 1920px → minX = -2080, maxX = 0
    // ─────────────────────────────────────────────────────────────
    const minX = -(canvasWidth - viewportWidth);
    const maxX = 0;
    const minY = -(canvasHeight - viewportHeight);
    const maxY = 0;

    // ─────────────────────────────────────────────────────────────
    // 상태 변수
    // ─────────────────────────────────────────────────────────────
    // 캔버스 현재 위치 (초기값: 중앙)
    let posX = minX / 2;
    let posY = minY / 2;

    // 목표 속도 (마우스 움직임 + edge push에서 계산)
    let targetVelocityX = 0;
    let targetVelocityY = 0;

    // 현재 속도 (lerp로 targetVelocity를 향해 서서히 변화)
    let velocityX = 0;
    let velocityY = 0;

    // 마우스 위치 추적
    let mouseX = viewportWidth / 2;
    let mouseY = viewportHeight / 2;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let isMouseInside = false;
    let rafId: number;

    // 초기 위치 설정 (캔버스 중앙)
    gsap.set(canvas, { x: posX, y: posY });

    // ─────────────────────────────────────────────────────────────
    // 유틸리티 함수
    // ─────────────────────────────────────────────────────────────
    /** 값을 min~max 범위로 제한 */
    const clamp = (value: number, min: number, max: number) =>
      Math.max(min, Math.min(max, value));

    /**
     * Linear Interpolation (선형 보간)
     * start에서 end를 향해 factor 비율만큼 이동
     * @example lerp(0, 100, 0.1) = 10 (0에서 100 방향으로 10% 이동)
     */
    const lerpFn = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    // ─────────────────────────────────────────────────────────────
    // 이벤트 핸들러
    // ─────────────────────────────────────────────────────────────
    /** 마우스 움직임 → targetVelocity에 누적 */
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // 컨테이너 기준 마우스 위치 (edge push 계산용)
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      // 마우스 이동량 (이전 프레임 대비)
      const deltaX = e.clientX - lastMouseX;
      const deltaY = e.clientY - lastMouseY;

      // 이동량 * speedFactor → targetVelocity에 누적
      targetVelocityX += deltaX * speedFactor;
      targetVelocityY += deltaY * speedFactor;

      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    /** 마우스 진입 시 초기화 */
    const handleMouseEnter = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      isMouseInside = true;
    };

    /** 마우스 이탈 시 edge push 중지 */
    const handleMouseLeave = () => {
      isMouseInside = false;
    };

    // ─────────────────────────────────────────────────────────────
    // Dead Zone (중앙 영역 무시)
    // ─────────────────────────────────────────────────────────────
    const deadZone = 0.3; // 중앙 30%는 edge force 없음

    /**
     * Dead zone 적용
     * -1 ~ 1 범위의 값에서 중앙 부분을 0으로 만듦
     * @example deadZone=0.3일 때:
     *   - 입력 0.2 → 출력 0 (dead zone 내부)
     *   - 입력 0.5 → 출력 0.286 ((0.5-0.3)/(1-0.3))
     *   - 입력 1.0 → 출력 1.0
     */
    const applyDeadZone = (value: number) => {
      if (Math.abs(value) < deadZone) return 0;
      // dead zone 이후 구간을 0~1로 재매핑
      const sign = value > 0 ? 1 : -1;
      return sign * ((Math.abs(value) - deadZone) / (1 - deadZone));
    };

    // ─────────────────────────────────────────────────────────────
    // 메인 업데이트 루프 (requestAnimationFrame)
    // ─────────────────────────────────────────────────────────────
    const update = () => {
      // ① Edge Push: 마우스가 가장자리에 있으면 지속적으로 힘 가함
      if (isMouseInside) {
        // 마우스 위치를 -1 ~ 1로 정규화
        // 왼쪽/위 = -1, 중앙 = 0, 오른쪽/아래 = 1
        const normalizedX = (mouseX / viewportWidth) * 2 - 1;
        const normalizedY = (mouseY / viewportHeight) * 2 - 1;

        // Dead zone 적용 (중앙에선 힘 없음)
        const edgeForceX = applyDeadZone(normalizedX);
        const edgeForceY = applyDeadZone(normalizedY);

        // Edge force를 targetVelocity에 누적
        targetVelocityX += edgeForceX * edgeStrength;
        targetVelocityY += edgeForceY * edgeStrength;
      }

      // ② Target velocity 감쇠 (마찰)
      // 매 프레임 8%씩 감소 → 서서히 멈춤
      targetVelocityX *= 0.92;
      targetVelocityY *= 0.92;

      // ③ Lerp: 현재 속도를 목표 속도 방향으로 부드럽게 전환
      // lerp=0.04면 매 프레임 목표의 4%만큼 이동
      velocityX = lerpFn(velocityX, targetVelocityX, lerp);
      velocityY = lerpFn(velocityY, targetVelocityY, lerp);

      // ④ 최대 속도 제한
      velocityX = clamp(velocityX, -maxVelocity, maxVelocity);
      velocityY = clamp(velocityY, -maxVelocity, maxVelocity);

      // ⑤ 위치 업데이트 (마우스 반대 방향으로 이동)
      // 마우스를 오른쪽으로 → 캔버스는 왼쪽으로 (컨텐츠가 오른쪽으로 보임)
      posX -= velocityX;
      posY -= velocityY;

      // ⑥ 경계 제한
      posX = clamp(posX, minX, maxX);
      posY = clamp(posY, minY, maxY);

      // ⑦ GSAP으로 캔버스 위치 적용
      gsap.set(canvas, { x: posX, y: posY });

      // 다음 프레임 예약
      rafId = requestAnimationFrame(update);
    };

    // 애니메이션 루프 시작
    rafId = requestAnimationFrame(update);

    // 이벤트 리스너 등록
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // 클린업
    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [canvasWidth, canvasHeight, lerp, speedFactor, edgeStrength, maxVelocity]);

  return { canvasRef, containerRef };
}
