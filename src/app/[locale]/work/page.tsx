"use client";

import {
  WorkInnerCompact,
  WorkInnerInteractive,
} from "@/components/pages/work/workInner";
import WorkTab from "@/components/pages/work/workTab";
import { LAYOUT_PADDING_ALONGSIDE } from "@/constants/layouts/layout";
import { cn } from "@/utils/cn";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function Work() {
  const [focusedTab, setFocusedTab] = useState<"Compact" | "Interactive">(
    "Interactive",
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFocusedTab = (tab: "Compact" | "Interactive") => {
    if (isAnimating || focusedTab === tab) return;
    const isCompact = focusedTab === "Compact";

    setIsAnimating(true);

    if (containerRef.current) {
      const tl = gsap.timeline({
        onStart: () => setFocusedTab(tab),
        onComplete: () => setIsAnimating(false),
      });

      // 현재 콘텐츠를 왼쪽으로 슬라이드아웃
      tl.to(containerRef.current, {
        x: isCompact ? 50 : -50,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      })
        // 탭 변경
        .call(() => {})
        // 새 콘텐츠를 오른쪽에서 슬라이드인
        .fromTo(
          containerRef.current,
          { x: isCompact ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          },
        );
    }
  };

  // 초기 마운트 애니메이션
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
      );
    }
  }, []);

  return (
    <main
      className={cn(
        "flex w-screen flex-col items-center justify-center overflow-hidden",
        LAYOUT_PADDING_ALONGSIDE,
      )}
    >
      {/* TABS */}
      <WorkTab onChangeTab={handleFocusedTab} focusedTab={focusedTab} />

      {/* TAB VIEWS */}
      <div ref={containerRef} className={cn("mt-5 w-full")}>
        {focusedTab === "Compact" && <WorkInnerCompact />}
        {focusedTab === "Interactive" && <WorkInnerInteractive />}
      </div>
    </main>
  );
}
