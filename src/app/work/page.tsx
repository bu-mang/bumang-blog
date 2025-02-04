"use client";

import WorkCard from "@/components/workItem";

export default function Work() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-[3vw]">
      <WorkCard onClick={() => {}} imgSrc="" imgAlt="">
        <div className="absolute -left-10 -top-10 flex h-20 w-20 items-center justify-center rounded-full bg-red">
          test
        </div>
      </WorkCard>
      <WorkCard onClick={() => {}} imgSrc="" imgAlt="" />
      <WorkCard onClick={() => {}} imgSrc="" imgAlt="" />
    </main>
  );
}
