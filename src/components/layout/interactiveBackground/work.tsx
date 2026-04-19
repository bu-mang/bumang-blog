import { cn } from "@/utils/cn";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as BackgroundImage from "@/assets/works";
import { useBackgroundStore } from "@/store/background";
import { StaticImageData } from "next/image";

const WORK_BACKGROUNDS: StaticImageData[] = [
  BackgroundImage.blai,
  BackgroundImage.bumangRoute53,
  BackgroundImage.seaPearl,
  BackgroundImage.anttimeSwap,
  BackgroundImage.anttimeApp,
  BackgroundImage.percentHotel,
];

export default function WorkBackground() {
  const bgColor = useBackgroundStore((state) => state.backgroundColor);
  const bgImage = useBackgroundStore((state) => state.backgroundImage);
  const { centerText } = useBackgroundStore((state) => state.work);

  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!bgRef.current) return;

    const tweens: gsap.core.Tween[] = [];

    gsap.utils.toArray(".WORK_BG").forEach((element) => {
      if (element instanceof HTMLDivElement) {
        const bg = element.dataset.bg;
        const tween = gsap.to(element, {
          opacity: bgImage === bg ? 1 : 0,
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
      {WORK_BACKGROUNDS.map((image) => (
        <div
          key={image.src}
          data-bg={image.src}
          ref={bgRef}
          className={cn(
            "WORK_BG fixed inset-0 -z-10 flex h-screen w-screen items-center justify-center opacity-0 transition-all ease-in-out",
            bgColor,
          )}
          style={{
            backgroundPosition: "center center",
            filter: "blur(20px)",
            backgroundImage: `url(${image.src})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            transform: "scale(1.3)",
            willChange: "opacity, transform",
          }}
        />
      ))}
      {centerText && (
        <div className="fixed inset-x-0 inset-y-10 -z-10 flex h-screen w-screen items-center justify-center text-2xl">
          [Work]
        </div>
      )}
    </>
  );
}
