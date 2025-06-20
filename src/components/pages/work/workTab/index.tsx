"use client";

import { ButtonBase } from "@/components/common";
import { cn } from "@/utils/cn";
import gsap from "gsap";
import { useRef } from "react";

interface WorkTabProps {
  focusedTab: "Compact" | "Interactive";
  onChangeTab: (v: "Compact" | "Interactive") => void;
}

export default function WorkTab({ focusedTab, onChangeTab }: WorkTabProps) {
  const handleChangeTab = (tab: "Compact" | "Interactive") => {
    if (!compactRef.current || !interactiveRef.current) return;
    const tl = gsap.timeline();

    switch (tab) {
      case "Compact":
        tl.to(compactRef.current, {
          rotate: 10,
          translateX: -2,
          translateY: -6,
          duration: 0.05,
        })
          .to(compactRef.current, {
            rotate: -10,
            scale: 1.1,
            translateX: 5,
            translateY: -6,
            duration: 0.05,
          })
          .to(compactRef.current, {
            rotate: 0,
            scale: 1.0,
            translateX: 0,
            translateY: 0,
            duration: 0.05,
          });
        break;
      case "Interactive":
      default:
        tl.to(interactiveRef.current, {
          rotate: 10,
          translateX: -2,
          translateY: -6,
          duration: 0.05,
        })
          .to(interactiveRef.current, {
            rotate: -10,
            scale: 1.1,
            translateX: 5,
            translateY: -6,
            duration: 0.05,
          })
          .to(interactiveRef.current, {
            rotate: 0,
            scale: 1.0,
            translateX: 0,
            translateY: 0,
            duration: 0.05,
          });
        break;
    }

    onChangeTab(tab);
  };

  const compactRef = useRef<HTMLButtonElement | null>(null);
  const interactiveRef = useRef<HTMLButtonElement | null>(null);

  return (
    <section className="relative grid h-5 w-full flex-1 grid-cols-8 gap-[1.5vw]">
      <div className="relative col-start-2 col-end-8 grid grid-cols-2 gap-[1.5vw] rounded-sm bg-gray-5 px-[1.5vw] py-2 shadow-inner">
        <div
          className={cn(
            "absolute col-span-1 h-full w-1/2 py-2 pl-[1.5vw] pr-[0.75vw] transition-all",
            focusedTab === "Interactive" &&
              "translate-x-full pl-[0.75vw] pr-[1.5vw]",
          )}
        >
          <div className="h-full w-full rounded-md bg-white shadow-md" />
        </div>

        <ButtonBase
          ref={compactRef}
          className={cn(
            "relative z-10 flex justify-center rounded-md p-2 text-sm font-semibold",
          )}
          onClick={() => handleChangeTab("Compact")}
        >
          Compact
        </ButtonBase>

        <ButtonBase
          ref={interactiveRef}
          className={cn(
            "relative z-10 flex justify-center rounded-md p-2 text-sm font-semibold",
          )}
          onClick={() => handleChangeTab("Interactive")}
        >
          Interactive
        </ButtonBase>
      </div>
    </section>
  );
}
