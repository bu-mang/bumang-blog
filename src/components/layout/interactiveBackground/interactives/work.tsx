import { useInteractiveStore } from "@/store/background";
import { cn } from "@/utils/cn";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function WorkBackground() {
  const bgColor = useInteractiveStore((state) => state.backgroundColor);
  const bgImage = useInteractiveStore((state) => state.backgroundImage);
  const { centerText } = useInteractiveStore((state) => state.work);

  const priorRef = useRef<HTMLDivElement | null>(null);
  const [prior, setPrior] = useState<string | undefined>();

  useEffect(() => {
    if (!priorRef.current) return;
    gsap.killTweensOf(priorRef.current);

    const tween = gsap.fromTo(
      priorRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 0.3,
        duration: 1.5,
      },
    );

    return () => {
      tween.kill();
    };
  }, [bgImage]);

  return (
    <>
      <div
        ref={priorRef}
        className={cn(
          "fixed inset-0 -z-10 flex h-screen w-screen items-center justify-center transition-all ease-in-out",
          bgColor,
        )}
        style={{
          backgroundPosition: "center center",
          filter: "blur(20px)",
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
          backgroundSize: "cover", // 추가: 이미지 크기 최적화
          backgroundRepeat: "no-repeat", // 추가: 반복 방지
          transform: "scale(1.3)",
          willChange: "opacity, transform", // 추가: GPU 가속
        }}
      />
      <div
        ref={priorRef}
        className={cn(
          "fixed inset-0 -z-10 flex h-screen w-screen items-center justify-center transition-all ease-in-out",
          bgColor,
        )}
        style={{
          backgroundPosition: "center center",
          filter: "blur(20px)",
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
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
