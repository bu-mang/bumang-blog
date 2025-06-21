"use client";

import Link from "next/link";
import { SectionBox, SubBox } from "../about/aboutSection";
import WorkItem from "./workItem";

export function WorkInnerInteractive() {
  return (
    <>
      <WorkItem onClick={() => {}} imgSrc="" imgAlt="">
        <div className="absolute -left-10 -top-10 flex h-20 w-20 items-center justify-center rounded-full bg-red">
          test
        </div>
      </WorkItem>
      <WorkItem onClick={() => {}} imgSrc="" imgAlt="" />
      <WorkItem onClick={() => {}} imgSrc="" imgAlt="" />
    </>
  );
}

export function WorkInnerCompact() {
  return (
    <>
      {/* Percent Hotel */}
      <SectionBox animated={false} className="fade-in-mount" borderTop={false}>
        {/* TITLE */}
        <div className="sticky top-20 col-span-3 mb-44 mt-8 flex h-fit flex-col font-semibold">
          <span className="mb-4 h-fit w-fit rounded-sm border border-gray-700 px-2 py-1 text-xs">
            Side Project
          </span>
          <div className="mb-4 flex flex-col text-6xl">
            <span className="mb-2">Bumang</span>
            <span>Route53</span>
          </div>

          <div className="flex items-center gap-2 font-normal">
            <span className="text-xs font-bold text-gray-200">
              2024.05.01. 2024.05.30.
            </span>
          </div>

          <div className="mb-0.5 flex items-center gap-2 font-normal">
            <span className="text-sm text-gray-200">Team Project</span>
            <div className="h-3 w-[1px] bg-gray-200" />
            <span className="text-sm text-gray-200">FrontEnd Leader</span>
          </div>
        </div>

        {/* CONTENTS */}
        <div className="col-start-4 col-end-9">
          <SubBox borderTop={false}>
            <div className="col-span-1 translate-y-1.5 font-semibold">1.</div>
            <div className="col-span-4">
              <div className="col-span-4 mb-3 text-2xl font-semibold">
                Custom Animated Carousel Library
              </div>

              <p className="col-span-4">
                Developed a useCarouselSize hook that dynamically updates the
                x-axis slide position in response to the parent container's
                width changes on resize events.
              </p>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">2.</div>
            <div className="col-span-4">
              <div className="col-span-4 mb-3 text-2xl font-semibold">
                Custom Animated Carousel Library
              </div>

              <p className="col-span-4">
                Developed a useCarouselSize hook that dynamically updates the
                x-axis slide position in response to the parent container's
                width changes on resize events.
              </p>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">3.</div>
            <div className="col-span-4">
              <div className="col-span-4 mb-3 text-2xl font-semibold">
                Custom Animated Carousel Library
              </div>

              <p className="col-span-4">
                Developed a useCarouselSize hook that dynamically updates the
                x-axis slide position in response to the parent container's
                width changes on resize events.
              </p>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">3.</div>
            <div className="col-span-4">
              <div className="col-span-4 mb-3 text-2xl font-semibold">
                Custom Animated Carousel Library
              </div>

              <p className="col-span-4">
                Developed a useCarouselSize hook that dynamically updates the
                x-axis slide position in response to the parent container's
                width changes on resize events.
              </p>
            </div>
          </SubBox>
        </div>
      </SectionBox>

      {/* AWARDS */}
      <SectionBox animated={false} className="fade-in-mount">
        {/* TITLE */}
        <div className="sticky top-20 col-span-3 mb-44 mt-8 flex h-fit flex-col font-semibold">
          <span className="mb-4 h-fit w-fit rounded-sm border border-gray-700 px-2 py-1 text-xs">
            Work Project
          </span>
          {/* <div className="mb-4 text-6xl">ANTTIME SWAP</div> */}
          <div className="mb-4 flex flex-col text-6xl">
            <span className="mb-2">ANTTIME</span>
            <span>SWAP</span>
          </div>

          <div className="flex items-center gap-2 font-normal">
            <span className="text-xs font-bold text-gray-200">
              2024.05.01. 2024.05.30.
            </span>
          </div>

          <div className="mb-0.5 flex items-center gap-2 font-normal">
            <span className="text-sm text-gray-200">Team Project</span>
            <div className="h-3 w-[1px] bg-gray-200" />
            <span className="text-sm text-gray-200">FrontEnd Leader</span>
          </div>
        </div>

        {/* CONTENTS */}
        <div className="col-start-4 col-end-9">
          <SubBox borderTop={false}>
            <div className="col-span-1 translate-y-1.5 font-semibold">1.</div>
            <div className="col-span-4">
              <div className="col-span-4 mb-3 text-2xl font-semibold">
                Custom Animated Carousel Library
              </div>

              <p className="col-span-4">
                Developed a useCarouselSize hook that dynamically updates the
                x-axis slide position in response to the parent container's
                width changes on resize events.
              </p>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">2.</div>
            <div className="col-span-4">
              <div className="col-span-4 mb-3 text-2xl font-semibold">
                Custom Animated Carousel Library
              </div>

              <p className="col-span-4">
                Developed a useCarouselSize hook that dynamically updates the
                x-axis slide position in response to the parent container's
                width changes on resize events.
              </p>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">3.</div>
            <div className="col-span-4">
              <div className="col-span-4 mb-3 text-2xl font-semibold">
                Custom Animated Carousel Library
              </div>

              <p className="col-span-4">
                Developed a useCarouselSize hook that dynamically updates the
                x-axis slide position in response to the parent container's
                width changes on resize events.
              </p>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">3.</div>
            <div className="col-span-4">
              <div className="col-span-4 mb-3 text-2xl font-semibold">
                Custom Animated Carousel Library
              </div>

              <p className="col-span-4">
                Developed a useCarouselSize hook that dynamically updates the
                x-axis slide position in response to the parent container's
                width changes on resize events.
              </p>
            </div>
          </SubBox>
        </div>
      </SectionBox>

      {/* Percent Hotel */}
      <SectionBox animated={false} className="fade-in-mount">
        {/* TITLE */}
        <div className="sticky top-20 col-span-3 mb-44 mt-8 flex h-fit flex-col font-semibold">
          <span className="mb-4 h-fit w-fit rounded-sm border border-gray-700 px-2 py-1 text-xs">
            Work Project
          </span>
          <div className="mb-4 flex flex-col text-6xl">
            <span className="mb-2">ANTTIME</span>
            <span>APP</span>
          </div>

          <div className="flex items-center gap-2 font-normal">
            <span className="text-xs font-bold text-gray-200">
              2024.05.01. 2024.05.30.
            </span>
          </div>

          <div className="mb-0.5 flex items-center gap-2 font-normal">
            <span className="text-sm text-gray-200">Team Project</span>
            <div className="h-3 w-[1px] bg-gray-200" />
            <span className="text-sm text-gray-200">FrontEnd Leader</span>
          </div>
        </div>

        {/* CONTENTS */}
        <div className="col-start-4 col-end-9">
          <SubBox borderTop={false}>
            <div className="col-span-1 translate-y-1.5 font-semibold">1.</div>
            <div className="col-span-4">
              <div className="col-span-4 mb-3 text-2xl font-semibold">
                Custom Animated Carousel Library
              </div>

              <p className="col-span-4">
                Developed a useCarouselSize hook that dynamically updates the
                x-axis slide position in response to the parent container's
                width changes on resize events.
              </p>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">2.</div>
            <div className="col-span-4">
              <div className="col-span-4 mb-3 text-2xl font-semibold">
                Custom Animated Carousel Library
              </div>

              <p className="col-span-4">
                Developed a useCarouselSize hook that dynamically updates the
                x-axis slide position in response to the parent container's
                width changes on resize events.
              </p>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">3.</div>
            <div className="col-span-4">
              <div className="col-span-4 mb-3 text-2xl font-semibold">
                Custom Animated Carousel Library
              </div>

              <p className="col-span-4">
                Developed a useCarouselSize hook that dynamically updates the
                x-axis slide position in response to the parent container's
                width changes on resize events.
              </p>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">3.</div>
            <div className="col-span-4">
              <div className="col-span-4 mb-3 text-2xl font-semibold">
                Custom Animated Carousel Library
              </div>

              <p className="col-span-4">
                Developed a useCarouselSize hook that dynamically updates the
                x-axis slide position in response to the parent container's
                width changes on resize events.
              </p>
            </div>
          </SubBox>
        </div>
      </SectionBox>

      {/* Percent Hotel */}
      <SectionBox animated={false} className="fade-in-mount">
        {/* TITLE */}
        <div className="sticky top-20 col-span-3 mb-44 mt-8 flex h-fit flex-col font-semibold">
          <span className="mb-4 h-fit w-fit rounded-sm border border-gray-700 px-2 py-1 text-xs">
            Yanolja Bootcamp
          </span>
          {/* <div className="mb-4 text-6xl">Percent Hotel</div> */}
          <div className="mb-4 flex flex-col text-6xl">
            <span className="mb-2">Percent</span>
            <span>Hotel</span>
          </div>

          <div className="flex items-center gap-2 font-normal">
            <span className="text-xs font-bold text-gray-200">
              2024.05.01. 2024.05.30.
            </span>
          </div>

          <div className="mb-0.5 flex items-center gap-2 font-normal">
            <span className="text-sm text-gray-200">Team Project</span>
            <div className="h-3 w-[1px] bg-gray-200" />
            <span className="text-sm text-gray-200">FrontEnd Leader</span>
          </div>
        </div>

        {/* CONTENTS */}
        <div className="col-start-4 col-end-9">
          <SubBox borderTop={false}>
            <div className="col-span-1 translate-y-1.5 font-semibold">1.</div>
            <div className="col-span-4">
              <div className="col-span-4 mb-3 text-2xl font-semibold">
                Custom Animated Carousel Library
              </div>

              <p className="col-span-4">
                Developed a useCarouselSize hook that dynamically updates the
                x-axis slide position in response to the parent container's
                width changes on resize events.
              </p>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">2.</div>
            <div className="col-span-4">
              <div className="col-span-4 mb-3 text-2xl font-semibold">
                Custom Animated Carousel Library
              </div>

              <p className="col-span-4">
                Developed a useCarouselSize hook that dynamically updates the
                x-axis slide position in response to the parent container's
                width changes on resize events.
              </p>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">3.</div>
            <div className="col-span-4">
              <div className="col-span-4 mb-3 text-2xl font-semibold">
                Custom Animated Carousel Library
              </div>

              <p className="col-span-4">
                Developed a useCarouselSize hook that dynamically updates the
                x-axis slide position in response to the parent container's
                width changes on resize events.
              </p>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">3.</div>
            <div className="col-span-4">
              <div className="col-span-4 mb-3 text-2xl font-semibold">
                Custom Animated Carousel Library
              </div>

              <p className="col-span-4">
                Developed a useCarouselSize hook that dynamically updates the
                x-axis slide position in response to the parent container's
                width changes on resize events.
              </p>
            </div>
          </SubBox>
        </div>
      </SectionBox>
    </>
  );
}
