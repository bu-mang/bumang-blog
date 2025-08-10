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
  // const handleChangeTab = (tab: "Compact" | "Interactive") => {
  //   if (!compactRef.current || !interactiveRef.current) return;
  //   const tl = gsap.timeline();

  //   switch (tab) {
  //     case "Compact":
  //       tl.to(compactRef.current, {
  //         rotate: 10,
  //         translateX: -2,
  //         translateY: -6,
  //         duration: 0.05,
  //       })
  //         .to(compactRef.current, {
  //           rotate: -10,
  //           scale: 1.1,
  //           translateX: 5,
  //           translateY: -6,
  //           duration: 0.05,
  //         })
  //         .to(compactRef.current, {
  //           rotate: 0,
  //           scale: 1.0,
  //           translateX: 0,
  //           translateY: 0,
  //           duration: 0.05,
  //         });
  //       break;
  //     case "Interactive":
  //     default:
  //       tl.to(interactiveRef.current, {
  //         rotate: 10,
  //         translateX: -2,
  //         translateY: -6,
  //         duration: 0.05,
  //       })
  //         .to(interactiveRef.current, {
  //           rotate: -10,
  //           scale: 1.1,
  //           translateX: 5,
  //           translateY: -6,
  //           duration: 0.05,
  //         })
  //         .to(interactiveRef.current, {
  //           rotate: 0,
  //           scale: 1.0,
  //           translateX: 0,
  //           translateY: 0,
  //           duration: 0.05,
  //         });
  //       break;
  //   }

  //   onChangeTab(tab);
  // };

  const compactRef = useRef<HTMLButtonElement | null>(null);
  const interactiveRef = useRef<HTMLButtonElement | null>(null);

  const focusedStyle = "scale-x-105 font-black text-black dark:text-white";
  const hoverStyle =
    "hover:scale-x-105 hover:font-black hover:text-black dark:hover:text-white";

  return (
    <section className="relative grid w-full grid-cols-8 gap-[1.5vw]">
      <div className="relative col-start-1 col-end-9 grid grid-cols-2 gap-[1.5vw] border-b border-t border-gray-10 px-[1.5vw] py-2">
        <div
          className={cn(
            "absolute col-span-1 h-full w-1/2 py-2 pl-[1.5vw] pr-[0.75vw] transition-all",
            focusedTab === "Compact" &&
              "translate-x-full pl-[0.75vw] pr-[1.5vw]",
          )}
        >
          <div className="h-full w-full rounded-md border" />
        </div>

        <ButtonBase
          ref={interactiveRef}
          className={cn(
            "relative z-10 flex justify-center rounded-md p-2 text-sm font-semibold text-gray-200 transition-all",
            hoverStyle,
            focusedTab === "Interactive" && focusedStyle,
          )}
          onClick={() => onChangeTab("Interactive")}
        >
          Interactive
        </ButtonBase>

        <ButtonBase
          ref={compactRef}
          className={cn(
            "relative z-10 flex justify-center rounded-md p-2 text-sm font-semibold text-gray-200 transition-all",
            hoverStyle,
            focusedTab === "Compact" && focusedStyle,
          )}
          onClick={() => onChangeTab("Compact")}
        >
          Compact
        </ButtonBase>
      </div>
    </section>
  );
}
