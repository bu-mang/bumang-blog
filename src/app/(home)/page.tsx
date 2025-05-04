"use client";

import { LAYOUT_PADDING_TOP } from "@/constants/layout";
import { cn } from "@/utils/cn";

export default function Main() {
  const mainPageClass = cn(
    "flex flex-1 flex-col items-center justify-center w-full bg-red-500",
    LAYOUT_PADDING_TOP,
  );

  return (
    <main className={mainPageClass}>
      <div className="h-40 w-full bg-blue-500">프레텐다드</div>
    </main>
  );
}
