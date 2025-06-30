"use client";

import { PATHNAME } from "@/constants/routes";
import { usePathname } from "@/i18n/navigation";
import { useInteractiveStore } from "@/store/background";
import { cn } from "@/utils/cn";

export default function InteractiveBackground() {
  const pathname = usePathname();
  const random = Math.floor(Math.random() * 10);

  const bgColor = useInteractiveStore((state) => state.backgroundColor);
  const bgImage = useInteractiveStore((state) => state.backgroundImage);
  const { centerText } = useInteractiveStore((state) => state.work);

  const renderInteractiveBackground = () => {
    switch (pathname) {
      // INTERACTIVE
      case PATHNAME.WORK:
        return (
          <>
            <div
              className={cn(
                "fixed inset-0 -z-10 flex h-screen w-screen items-center justify-center transition-all ease-in-out",
                bgColor,
              )}
              style={{
                backgroundImage: bgImage ? `url(${bgImage})` : "none",
                opacity: 0.4,
                filter: "blur(30px)",
                transform: "scale(1.1)",
              }}
            />
            {centerText && (
              <div className="fixed inset-x-0 inset-y-10 -z-10 flex h-screen w-screen items-center justify-center text-2xl">
                [Work]
              </div>
            )}
          </>
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
