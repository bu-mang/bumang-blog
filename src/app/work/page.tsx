"use client";

import { WorkItem } from "@/components/pages";

export default function Work() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-[10vw]">
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
