"use client";

import { LAYOUT_PADDING_TOP } from "@/constants/layout";
import { cn } from "@/utils/cn";

export default function Main() {
  const mainPageClass = cn(
    "flex flex-1 flex-col items-center justify-center h-fit min-h-full w-full",
    LAYOUT_PADDING_TOP,
  );

  return (
    <main className={mainPageClass}>
      <div>프레텐다드</div>
    </main>
  );
}
