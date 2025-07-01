"use client";

import { PATHNAME } from "@/constants/routes";
import { usePathname } from "@/i18n/navigation";
import { useInteractiveStore } from "@/store/background";
import { cn } from "@/utils/cn";
import WorkBackground from "./interactives/work";

export default function InteractiveBackground() {
  const pathname = usePathname();
  const random = Math.floor(Math.random() * 10);
  const bgColor = useInteractiveStore((state) => state.backgroundColor);

  const renderInteractiveBackground = () => {
    switch (pathname) {
      // INTERACTIVE
      case PATHNAME.WORK:
        return <WorkBackground />;

      // STATIC RENDERS
      case PATHNAME.HOME:
      default:
        return null;
    }
  };

  const renderStaticBackground = () => {
    return (
      <div
        className={cn(
          "fixed inset-0 -z-10 h-screen w-screen transition-all ease-in-out",
          bgColor,
        )}
      />
    );
  };

  const renderInteractives = renderInteractiveBackground();

  return renderInteractives || renderStaticBackground();
}
