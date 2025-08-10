"use client";

import { useInteractiveStore } from "@/store/background";
import { cn } from "@/utils/cn";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function Main() {
  const mainPageClass = cn(
    "flex flex-1 gap-[1.5vw] justify-center w-full h-[100vh]",
  );

  const setHeaderBackgroundColor = useInteractiveStore(
    (state) => state.header.setBackgroundColor,
  );
  const setDefaultSetting = useInteractiveStore(
    (state) => state.header.setDefaultSetting,
  );
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setHeaderBackgroundColor("bg-transparent");

    return () => {
      console.log(resolvedTheme, "resolvedTheme");
      setDefaultSetting(resolvedTheme ?? "light");
    };

    // eslint-disable-next-line
  }, []);

  return <main className={mainPageClass}></main>;
}
