import { useInteractiveStore } from "@/store/background";
import { cn } from "@/utils/cn";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function WorkBackground() {
  const bgColor = useInteractiveStore((state) => state.backgroundColor);
  const bgImage = useInteractiveStore((state) => state.backgroundImage);
  const { centerText } = useInteractiveStore((state) => state.work);

  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!bgRef.current) return;

    const tweens: gsap.core.Tween[] = [];

    gsap.utils.toArray(".WORK_BG").forEach((element) => {
      if (element instanceof HTMLDivElement) {
        const bg = element.dataset.bg;
        const tween = gsap.to(element, {
          opacity: bgImage === bg ? 1 : 0, // 기본 -50에 랜덤값 추가
          duration: 0.3,
        });
        tweens.push(tween);
      }
    });

    return () => {
      tweens.forEach((tween: gsap.core.Tween) => tween?.kill());
    };
  }, [bgImage]);

  return (
    <>
      <div
        data-bg="/works/bumangRoute53.png"
        ref={bgRef}
        className={cn(
          "WORK_BG fixed inset-0 -z-10 flex h-screen w-screen items-center justify-center opacity-0 transition-all ease-in-out",
          bgColor,
        )}
        style={{
          backgroundPosition: "center center",
          filter: "blur(20px)",
          backgroundImage: "url(/works/bumangRoute53.png)",
          backgroundSize: "cover", // 추가: 이미지 크기 최적화
          backgroundRepeat: "no-repeat", // 추가: 반복 방지
          transform: "scale(1.3)",
          willChange: "opacity, transform", // 추가: GPU 가속
        }}
      />
      <div
        data-bg="/works/seaPearl.png"
        ref={bgRef}
        className={cn(
          "WORK_BG fixed inset-0 -z-10 flex h-screen w-screen items-center justify-center opacity-0 transition-all ease-in-out",
          bgColor,
        )}
        style={{
          backgroundPosition: "center center",
          filter: "blur(20px)",
          backgroundImage: "url(/works/seaPearl.png)",
          backgroundSize: "cover", // 추가: 이미지 크기 최적화
          backgroundRepeat: "no-repeat", // 추가: 반복 방지
          transform: "scale(1.3)",
          willChange: "opacity, transform", // 추가: GPU 가속
        }}
      />
      <div
        data-bg="/works/anttimeSwap.png"
        ref={bgRef}
        className={cn(
          "WORK_BG fixed inset-0 -z-10 flex h-screen w-screen items-center justify-center opacity-0 transition-all ease-in-out",
          bgColor,
        )}
        style={{
          backgroundPosition: "center center",
          filter: "blur(20px)",
          backgroundImage: `url(/works/anttimeSwap.png)`,
          backgroundSize: "cover", // 추가: 이미지 크기 최적화
          backgroundRepeat: "no-repeat", // 추가: 반복 방지
          transform: "scale(1.3)",
          willChange: "opacity, transform", // 추가: GPU 가속
        }}
      />
      <div
        data-bg="/works/anttimeApp.png"
        ref={bgRef}
        className={cn(
          "WORK_BG fixed inset-0 -z-10 flex h-screen w-screen items-center justify-center opacity-0 transition-all ease-in-out",
          bgColor,
        )}
        style={{
          backgroundPosition: "center center",
          filter: "blur(20px)",
          backgroundImage: "url(/works/anttimeApp.png)",
          backgroundSize: "cover", // 추가: 이미지 크기 최적화
          backgroundRepeat: "no-repeat", // 추가: 반복 방지
          transform: "scale(1.3)",
          willChange: "opacity, transform", // 추가: GPU 가속
        }}
      />
      <div
        data-bg="/works/percentHotel.png"
        ref={bgRef}
        className={cn(
          "WORK_BG fixed inset-0 -z-10 flex h-screen w-screen items-center justify-center opacity-0 transition-all ease-in-out",
          bgColor,
        )}
        style={{
          backgroundPosition: "center center",
          filter: "blur(20px)",
          backgroundImage: `url(/works/percentHotel.png)`,
          backgroundSize: "cover", // 추가: 이미지 크기 최적화
          backgroundRepeat: "no-repeat", // 추가: 반복 방지
          transform: "scale(1.3)",
          willChange: "opacity, transform", // 추가: GPU 가속
        }}
      />
      {centerText && (
        <div className="fixed inset-x-0 inset-y-10 -z-10 flex h-screen w-screen items-center justify-center text-2xl">
          [Work]
        </div>
      )}
    </>
  );
}
