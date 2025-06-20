"use client";

import { WorkItem } from "@/components/pages";
import { LAYOUT_PADDING_ALONGSIDE } from "@/constants/layouts/layout";
import { cn } from "@/utils/cn";

export default function Work() {
  return (
    <main
      className={cn(
        "flex flex-1 flex-col items-center justify-center",
        LAYOUT_PADDING_ALONGSIDE,
      )}
    >
      anttime-app
    </main>
  );
}
