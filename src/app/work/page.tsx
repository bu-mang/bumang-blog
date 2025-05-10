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
      <WorkItem onClick={() => {}} imgSrc="" imgAlt="">
        <div className="absolute -left-10 -top-10 flex h-20 w-20 items-center justify-center rounded-full bg-red">
          test
        </div>
      </WorkItem>
      <WorkItem onClick={() => {}} imgSrc="" imgAlt="" />
      <WorkItem onClick={() => {}} imgSrc="" imgAlt="" />
    </main>
  );
}
