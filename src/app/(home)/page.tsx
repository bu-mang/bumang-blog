"use client";

import { LAYOUT_PADDING_TOP } from "@/constants/layout";
import { cn } from "@/lib/utils";

export default function Main() {
  const mainPageClass = cn(
    "flex flex-1 flex-col items-center justify-center",
    LAYOUT_PADDING_TOP,
  );

  return (
    <main className={mainPageClass}>
      <div>프레텐다드</div>
    </main>
  );
}
