"use client";

import Link from "next/link";
import { SectionBox, SubBox } from "../about/aboutSection";
import WorkItem from "./workItem";
import { cn } from "@/utils/cn";

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

      {/* ANTTIME APP */}

      <SectionBox animated={false} className="fade-in-mount">
        {/* ANTTIME - TITLE */}
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

        {/* ANTTIME - CONTENTS */}
        <div className="col-start-4 col-end-9">
          <SubBox borderTop={false}>
            <div className="col-span-1 translate-y-1.5 font-semibold">1.</div>
            <div className="col-span-4">
              <Title>Separated production and development Environment</Title>

              <OrderedList order={"a."}>
                <p className="mb-3 font-bold">Implemented Slide Animation~~</p>

                <OrderedList order={"i."} className="mb-2">
                  Developed a custom hook to determine whether the user can
                  proceed to the next step, based on various business rules such
                  as: 1st transfer price, 2nd price configuration status, 2nd
                  price timing, 2nd price value, bank account registration
                  status, Yanolja verification, and terms agreement status
                </OrderedList>

                <OrderedList order={"ii."} className="mb-2">
                  Calculated the delta between mousedown and mouseup pageX
                  values to determine the swipe direction; if the delta exceeded
                  a certain threshold, the carousel advanced to the next slide
                </OrderedList>

                <OrderedList order={"iii."}>
                  Used useEffect and setInterval to create an infinite slide
                  animation that runs every 3 seconds, with mouseenter and
                  mouseleave events used to pause and resume the animation.
                  Cleaned up the interval on page unmount to prevent memory
                  leaks
                </OrderedList>
              </OrderedList>

              <Divider />

              <OrderedList order={"a."}>
                <p className="mb-3 font-bold">
                  Provided a Consistent User Experience Across Mobile and
                  Desktop
                </p>

                <OrderedList order={"i."} className="mb-2">
                  Enabled drag functionality for both mobile and desktop
                  environments by supporting both TouchEvent and MouseEvent
                </OrderedList>

                <OrderedList order={"ii."}>
                  Prevented unintended clicks by canceling mouse events when a
                  touch event was detected
                </OrderedList>
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">2.</div>
            <div className="col-span-4">
              <Title>Updated React Native version</Title>

              <OrderedList order={"a."}>
                <p className="mb-3 font-bold">Implemented Slide Animation</p>

                <OrderedList order={"i."} className="mb-2">
                  Developed a custom hook to determine whether the user can
                  proceed to the next step, based on various business rules such
                  as: 1st transfer price, 2nd price configuration status, 2nd
                  price timing, 2nd price value, bank account registration
                  status, Yanolja verification, and terms agreement status
                </OrderedList>

                <OrderedList order={"ii."} className="mb-2">
                  Calculated the delta between mousedown and mouseup pageX
                  values to determine the swipe direction; if the delta exceeded
                  a certain threshold, the carousel advanced to the next slide
                </OrderedList>

                <OrderedList order={"iii."}>
                  Used useEffect and setInterval to create an infinite slide
                  animation that runs every 3 seconds, with mouseenter and
                  mouseleave events used to pause and resume the animation.
                  Cleaned up the interval on page unmount to prevent memory
                  leaks
                </OrderedList>
              </OrderedList>

              <Divider />

              <OrderedList order={"a."}>
                <p className="mb-3 font-bold">
                  Provided a Consistent User Experience Across Mobile and
                  Desktop
                </p>

                <OrderedList order={"i."} className="mb-2">
                  Enabled drag functionality for both mobile and desktop
                  environments by supporting both TouchEvent and MouseEvent
                </OrderedList>

                <OrderedList order={"ii."}>
                  Prevented unintended clicks by canceling mouse events when a
                  touch event was detected
                </OrderedList>
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">3.</div>
            <div className="col-span-4">
              <Title>Integrated Google Play Store Referral API</Title>

              <OrderedList order={"a."}>
                <p className="mb-3 font-bold">Implemented Slide Animation</p>

                <OrderedList order={"i."} className="mb-2">
                  Developed a custom hook to determine whether the user can
                  proceed to the next step, based on various business rules such
                  as: 1st transfer price, 2nd price configuration status, 2nd
                  price timing, 2nd price value, bank account registration
                  status, Yanolja verification, and terms agreement status
                </OrderedList>

                <OrderedList order={"ii."} className="mb-2">
                  Calculated the delta between mousedown and mouseup pageX
                  values to determine the swipe direction; if the delta exceeded
                  a certain threshold, the carousel advanced to the next slide
                </OrderedList>

                <OrderedList order={"iii."}>
                  Used useEffect and setInterval to create an infinite slide
                  animation that runs every 3 seconds, with mouseenter and
                  mouseleave events used to pause and resume the animation.
                  Cleaned up the interval on page unmount to prevent memory
                  leaks
                </OrderedList>
              </OrderedList>

              <Divider />

              <OrderedList order={"a."}>
                <p className="mb-3 font-bold">
                  Provided a Consistent User Experience Across Mobile and
                  Desktop
                </p>

                <OrderedList order={"i."} className="mb-2">
                  Enabled drag functionality for both mobile and desktop
                  environments by supporting both TouchEvent and MouseEvent
                </OrderedList>

                <OrderedList order={"ii."}>
                  Prevented unintended clicks by canceling mouse events when a
                  touch event was detected
                </OrderedList>
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">4.</div>
            <div className="col-span-4">
              <Title>Updated animation work skins</Title>

              <OrderedList order={"a."}>
                <p className="mb-3 font-bold">Implemented Slide Animation</p>

                <OrderedList order={"i."} className="mb-2">
                  Developed a custom hook to determine whether the user can
                  proceed to the next step, based on various business rules such
                  as: 1st transfer price, 2nd price configuration status, 2nd
                  price timing, 2nd price value, bank account registration
                  status, Yanolja verification, and terms agreement status
                </OrderedList>

                <OrderedList order={"ii."} className="mb-2">
                  Calculated the delta between mousedown and mouseup pageX
                  values to determine the swipe direction; if the delta exceeded
                  a certain threshold, the carousel advanced to the next slide
                </OrderedList>

                <OrderedList order={"iii."}>
                  Used useEffect and setInterval to create an infinite slide
                  animation that runs every 3 seconds, with mouseenter and
                  mouseleave events used to pause and resume the animation.
                  Cleaned up the interval on page unmount to prevent memory
                  leaks
                </OrderedList>
              </OrderedList>

              <Divider />

              <OrderedList order={"a."}>
                <p className="mb-3 font-bold">
                  Provided a Consistent User Experience Across Mobile and
                  Desktop
                </p>

                <OrderedList order={"i."} className="mb-2">
                  Enabled drag functionality for both mobile and desktop
                  environments by supporting both TouchEvent and MouseEvent
                </OrderedList>

                <OrderedList order={"ii."}>
                  Prevented unintended clicks by canceling mouse events when a
                  touch event was detected
                </OrderedList>
              </OrderedList>
            </div>
          </SubBox>
        </div>
      </SectionBox>

      {/* Percent Hotel */}

      <SectionBox animated={false} className="fade-in-mount">
        {/* Percent Hotel - TITLE */}
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

          {/* DESCRIPTION */}
          <div className="mt-10">
            <span className="text-xl">
              Book non-refundable stays quickly and safely
            </span>
            <span className="text-xl">with Percent Hotel!</span>
            <span className="text-base font-normal">
              (Ranked 2nd out of 12 teams in evaluation by Yanolja mentors)
            </span>
          </div>
        </div>

        {/* Percent Hotel - CONTENTS */}
        <div className="col-start-4 col-end-9">
          <SubBox borderTop={false}>
            <div className="col-span-1 translate-y-1.5 font-semibold">1.</div>
            <div className="col-span-4">
              <Title>Custom Animated Carousel Library</Title>

              <OrderedList order={"a."}>
                <p className="mb-3 font-bold">Implemented Slide Animation</p>

                <OrderedList order={"i."} className="mb-2">
                  Developed a custom hook to determine whether the user can
                  proceed to the next step, based on various business rules such
                  as: 1st transfer price, 2nd price configuration status, 2nd
                  price timing, 2nd price value, bank account registration
                  status, Yanolja verification, and terms agreement status
                </OrderedList>

                <OrderedList order={"ii."} className="mb-2">
                  Calculated the delta between mousedown and mouseup pageX
                  values to determine the swipe direction; if the delta exceeded
                  a certain threshold, the carousel advanced to the next slide
                </OrderedList>

                <OrderedList order={"iii."}>
                  Used useEffect and setInterval to create an infinite slide
                  animation that runs every 3 seconds, with mouseenter and
                  mouseleave events used to pause and resume the animation.
                  Cleaned up the interval on page unmount to prevent memory
                  leaks
                </OrderedList>
              </OrderedList>

              <Divider />

              <OrderedList order={"a."}>
                <p className="mb-3 font-bold">
                  Provided a Consistent User Experience Across Mobile and
                  Desktop
                </p>

                <OrderedList order={"i."} className="mb-2">
                  Enabled drag functionality for both mobile and desktop
                  environments by supporting both TouchEvent and MouseEvent
                </OrderedList>

                <OrderedList order={"ii."}>
                  Prevented unintended clicks by canceling mouse events when a
                  touch event was detected
                </OrderedList>
              </OrderedList>
            </div>
          </SubBox>

          {/* Percent Hotel - BUSINESS LOGIC */}
          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">2.</div>
            <div className="col-span-4">
              <Title>Handling Complex Business Logic with Custom Hooks</Title>

              <OrderedList order={"a."}>
                <p className="mb-3 font-bold">
                  Handled complex business logic exceptions using a custom hook
                </p>

                <OrderedList order={"i."}>
                  Developed a custom hook to determine whether the user can
                  proceed to the next step, based on various business rules such
                  as: 1st transfer price, 2nd price configuration status, 2nd
                  price timing, 2nd price value, bank account registration
                  status, Yanolja verification, and terms agreement status
                </OrderedList>
              </OrderedList>

              <Divider />

              <OrderedList order={"b."}>
                <p className="mb-3 font-bold">
                  Redirected to the payment method registration page if no
                  payment method is available, while preserving the form state
                  on return{" "}
                </p>

                <OrderedList order={"i."} className="mb-2">
                  Implemented a flow that preserves the user’s input when a bank
                  account is not yet registered by switching to the payment
                  method registration component within the same page, instead of
                  navigating away. This ensured that all previously entered
                  state remained intact
                </OrderedList>

                <OrderedList order={"ii."}>
                  Upon returning, while the internal state remained, some
                  browser-controlled elements (e.g. checkbox checked states)
                  were visually reset. This was resolved by creating a hook to
                  restore UI consistency based on the current state during
                  component transitions
                </OrderedList>
              </OrderedList>
            </div>
          </SubBox>

          {/* Percent Hotel - FCM */}
          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">3.</div>
            <div className="col-span-4">
              <Title>
                Implemented Firebase Cloud Messaging (FCM) for push
                notifications
              </Title>

              <OrderedList order={"a."}>
                Created a custom hook to initialize the FCM token upon login
              </OrderedList>

              <Divider />

              <OrderedList order={"b."}>
                Received background push notifications via a Firebase service
                worker
              </OrderedList>

              <Divider />

              <OrderedList order={"c."}>
                Tested push notifications across Android, iOS, web, and PWA
                environments
              </OrderedList>
            </div>
          </SubBox>

          {/* Percent Hotel - SEO */}
          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">4.</div>
            <div className="col-span-4">
              <Title>Optimized SEO in React applications</Title>

              <OrderedList order={"a."}>
                Implemented pre-rendering using React Helmet and React Snap
              </OrderedList>

              <Divider />

              <OrderedList order={"b."}>
                Improved Lighthouse SEO score from 77 to 100 after optimization
              </OrderedList>
            </div>
          </SubBox>

          {/* Percent Hotel - TEAM MANAGEMENT */}
          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">5.</div>
            <div className="col-span-4">
              <Title>Led team operations</Title>

              <OrderedList order={"a."}>
                Shared daily progress through morning stand-up meetings{" "}
              </OrderedList>

              <Divider />

              <OrderedList order={"b."}>
                <p className="mb-3 font-bold">
                  Required full-team code reviews before merging.
                </p>

                <OrderedList order={"i."}>
                  Comments like "Good job" were discouraged — reviewers were
                  expected to leave meaningful feedback after reading the code
                  carefully
                </OrderedList>
              </OrderedList>

              <Divider />

              <OrderedList order={"b."}>
                <p className="mb-3 font-bold">
                  Handled a mid-project situation where two teammates left to
                  prepare for job interviews, affecting team morale
                </p>

                <OrderedList order={"i."} className="mb-2">
                  Reached out to the departing members to clarify which features
                  they had been working on and what remained unfinished, then
                  redistributed the tasks among the remaining team
                </OrderedList>

                <OrderedList order={"ii."} className="mb-2">
                  To maintain development momentum, we doubled down on thorough
                  code reviews and built a culture of giving feedback within 3
                  hours of a PR being submitted. Positive reinforcement for good
                  work was also emphasized
                </OrderedList>

                <OrderedList order={"iii."} className="mb-2">
                  As a result, one of the most productive teammates mentioned
                  during the project retrospective that the supportive team
                  culture kept them motivated through to the end
                </OrderedList>
              </OrderedList>
            </div>
          </SubBox>
        </div>
      </SectionBox>
    </>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return <span className="bg-gray-5 px-1 py-0.5">{children}</span>;
}

function OrderedList({
  order,
  className,
  children,
}: {
  order: number | string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("col-span-4 flex gap-2", className)}>
      <span className="min-w-6">{order}</span>
      <span className="">{children}</span>
    </div>
  );
}

function Title({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("col-span-4 mb-3 text-2xl font-semibold", className)}>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="my-5 h-[1px] w-full bg-gray-50" />;
}
