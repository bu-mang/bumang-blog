"use client";

import { PATHNAME } from "@/constants/routes";
import { useInteractiveStore } from "@/store/layout";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";

export default function InteractiveBackground() {
  const pathname = usePathname();
  const random = Math.floor(Math.random() * 10);

  const bgColor = useInteractiveStore((state) => state.backgroundColor);
  const bgImage = useInteractiveStore((state) => state.backgroundImage);

  const renderInteractiveBackground = () => {
    switch (pathname) {
      // INTERACTIVE
      case PATHNAME.WORK:
        return (
          <div
            className={cn(
              "fixed left-0 top-0 -z-10 h-screen w-screen",
              bgColor,
            )}
            style={{ backgroundImage: bgImage ? `url(${bgImage})` : "none" }}
          />
        );

      // STATIC RENDERS
      case PATHNAME.HOME:
      default:
        return null;
    }
  };

  const renderStaticBackground = () => {
    return (
      <div
        className={cn("fixed left-0 top-0 -z-10 h-screen w-screen", bgColor)}
        style={{ backgroundImage: bgImage ? `url(${bgImage})` : "none" }}
      />
    );
  };

  return renderInteractiveBackground() || renderStaticBackground();
}
