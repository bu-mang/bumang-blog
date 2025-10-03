"use client";

import { useHeaderStore } from "@/store/header";
import { cn } from "@/utils/cn";
import { useEffect } from "react";

export default function Main() {
  const mainPageClass = cn(
    "flex flex-1 gap-[1.5vw] justify-center w-full h-[100vh]",
  );

  const setHeaderBackgroundColor = useHeaderStore(
    (state) => state.setBackgroundColor,
  );
  const setDefaultSetting = useHeaderStore((state) => state.setDefaultSetting);

  useEffect(() => {
    setHeaderBackgroundColor("bg-transparent");

    return () => {
      setDefaultSetting();
    };

    // eslint-disable-next-line
  }, []);

  return <main className={mainPageClass}></main>;
}
