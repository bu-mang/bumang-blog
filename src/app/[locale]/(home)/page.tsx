"use client";

import { useInteractiveStore } from "@/store/background";
import { cn } from "@/utils/cn";
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

  useEffect(() => {
    setHeaderBackgroundColor("bg-transparent");

    return () => {
      setDefaultSetting();
    };

    // eslint-disable-next-line
  }, []);

  return <main className={mainPageClass}></main>;
}
