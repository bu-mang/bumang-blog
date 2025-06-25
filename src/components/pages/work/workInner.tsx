"use client";

import Link from "next/link";
import { SectionBox, SubBox } from "../about/aboutSection";
import WorkItem from "./workItem";
import { cn } from "@/utils/cn";
import { ButtonBase } from "@/components/common";

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
      {/* BUMANG BLOG */}
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
              2024.05.01. - 2024.05.30.
            </span>
          </div>

          <div className="mb-0.5 flex items-center gap-2 font-normal">
            <span className="text-sm text-gray-200">Side Project</span>
            <div className="h-3 w-[1px] bg-gray-200" />
            <span className="text-sm text-gray-200">FullStack</span>
          </div>
        </div>

        {/* CONTENTS */}
        <div className="col-start-4 col-end-9">
          <SubBox borderTop={false}>
            <div className="col-span-1 translate-y-1.5 font-semibold">1.</div>
            <div className="col-span-4">
              <Title>Build a Nest.js backend for a blog application.</Title>

              <OrderedList order={"a."} className="mb-2">
                Implemented blog CRUD functionality
              </OrderedList>

              <OrderedList order={"b."}>
                <OrderedListHead>
                  Abstract authentication and authorization using Guards and
                  custom Decorators.
                </OrderedListHead>

                <OrderedList order={"i."} className="mb-2">
                  Use TypeORM QueryBuilder to manipulate SQL queries easily.
                </OrderedList>

                <OrderedList order={"ii."} className="mb-2">
                  Generate related posts based on a score-based relevance
                  algorithm.
                </OrderedList>

                <OrderedList order={"iii."}>
                  Send presigned S3 URLs to the frontend so that images inserted
                  during blog editing are uploaded directly from the client to
                  S3.
                </OrderedList>
              </OrderedList>

              <Divider />

              <OrderedList order={"c."}>
                <OrderedListHead>
                  Optimized CI/CD for Docker and AWS EC2 deployment
                </OrderedListHead>

                <OrderedList order={"i."} className="mb-2">
                  Containerized Nest.js app and PostgreSQL database using Docker
                  Compose and deployed via Docker images
                </OrderedList>

                <OrderedList order={"ii."} className="mb-2">
                  Mirrored local development environment using Docker
                </OrderedList>

                <OrderedList order={"iii."} className="mb-2">
                  Automated deployment with GitHub Actions: SSH into EC2, pull
                  the latest Docker image, and restart the container
                </OrderedList>

                <OrderedList order={"iv."}>
                  Removed old Docker image caches, keeping only the latest 3
                  images during deployment
                </OrderedList>
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">2.</div>
            <div className="col-span-4">
              <Title>
                Established a separation of concerns strategy between SSR and
                CSR with a focus on SEO and data fetching optimization.
              </Title>

              <OrderedList order={"a."} className="mb-2">
                <OrderedListHead>
                  Use SSR for static data that requires SEO, and handle
                  authenticated content via CSR.
                </OrderedListHead>

                <OrderedList order={"i."} className="mb-2">
                  Consider whether SSR should read httpOnly cookies when using
                  cookie-based authentication strategies.
                </OrderedList>
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">3.</div>
            <div className="col-span-4">
              <Title>
                Built high-quality components by combining an interactive
                animation library with Headless UI.
              </Title>

              <OrderedList order={"a."}>
                Create logo animations that react to scroll and mouse hover
                events.
              </OrderedList>

              <Divider />

              <OrderedList order={"b."}>
                Calculated the delta between mousedown and mouseup pageX values
                to determine the swipe direction; if the delta exceeded a
                certain threshold, the carousel advanced to the next slide
              </OrderedList>

              <Divider />

              <OrderedList order={"c."}>
                Used useEffect and setInterval to create an infinite slide
                animation that runs every 3 seconds, with mouseenter and
                mouseleave events used to pause and resume the animation.
                Cleaned up the interval on page unmount to prevent memory leaks
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">4.</div>
            <div className="col-span-4">
              <Title>
                Implemented utility features such as i18n (internationalization)
                and dark mode.
              </Title>

              {/* <OrderedList order={"a."}></OrderedList> */}
            </div>
          </SubBox>
        </div>
      </SectionBox>

      {/* SEA PEARL */}
      <SectionBox animated={false} className="fade-in-mount">
        {/* SEA PEARL - TITLE */}
        <div className="sticky top-20 col-span-3 mb-44 mt-8 flex h-fit flex-col font-semibold">
          <span className="mb-4 h-fit w-fit rounded-sm border border-gray-700 px-2 py-1 text-xs">
            Work Project
          </span>
          <div className="mb-4 flex flex-col text-6xl">SeaPearl</div>

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
              A platform to check your exchange score and convert Time Points
              into Ant Tokens.
            </span>
          </div>
        </div>

        {/* ANTTIME SWAP - CONTENTS */}
        <div className="col-start-4 col-end-9">
          <SubBox borderTop={false}>
            <div className="col-span-1 translate-y-1.5 font-semibold">1.</div>
            <div className="col-span-4">
              <Title>
                Built and deployed an initial product using a webview-based
                frontend within Telegram.
              </Title>

              <OrderedList order={"a."} className="mb-2">
                Configured the Telegram development environment using ngrok, and
                used it for both development and deployment.
              </OrderedList>

              <OrderedList order={"b."} className="mb-2">
                <OrderedListHead>
                  Deployed the frontend as a webview within an iframe-based mini
                  app environment.
                </OrderedListHead>

                <OrderedList order={"i."} className="mb-2">
                  Implemented an initialization logic that retrieves user
                  authentication data using Telegram Mini App global browser
                  APIs.
                </OrderedList>

                <OrderedList order={"ii."}>
                  To enable the use of Mini App APIs in development, the local
                  environment was exposed via ngrok and registered with the
                  Telegram bot.
                </OrderedList>
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">2.</div>
            <div className="col-span-4">
              <Title>Integrated Adsgram for in-app advertising.</Title>

              <OrderedList order={"a."} className="mb-2">
                Implemented a logic to receive success/failure results from the
                Adsgram server and forward them to the backend API server.
              </OrderedList>

              <Divider />

              <OrderedList order={"b."} className="mb-2">
                Treated ad viewing as failed if the user skips the ad, sends the
                app to background, or remains on the app manager screen.
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">3.</div>
            <div className="col-span-4">
              <Title>Used react-virtuoso to build a virtualized list.</Title>

              <OrderedList order={"a."}>
                Configured the virtualized list to handle infinitely growing
                data lists.
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">4.</div>
            <div className="col-span-4">
              <Title>
                Optimized API calls for the tapping game using debounce and
                global caching, balancing between cost efficiency and security.
              </Title>

              <OrderedList order={"a."}>
                <OrderedListHead>
                  Aggregated tapping counts with a debounce and sent to the
                  server 3 seconds after the last tap.
                </OrderedListHead>

                <OrderedList order={"i."} className="mb-2">
                  If the user exits the screen within 3 seconds, used a
                  useEffect cleanup function to ensure server update before
                  unmounting.
                </OrderedList>

                <OrderedList order={"ii."} className="mb-2">
                  Made the tap count a persistent global state so that the count
                  is sent to the server even after unexpected termination upon
                  app restart.
                </OrderedList>

                <OrderedList order={"iii."}>
                  In the global state update function, combined server patching
                  and state clearing so that if an unexpected error occurs, the
                  original state remains intact.
                </OrderedList>
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">5.</div>
            <div className="col-span-4">
              <Title>Advanced Interactive Tapping Animation</Title>

              <OrderedList order={"a."}>
                <OrderedListHead>
                  Aggregated tapping counts with a debounce and sent to the
                  server 3 seconds after the last tap.
                </OrderedListHead>

                <OrderedList order={"i."}>
                  Used random values to control the Bezier path direction of
                  point-gain animations, with each tap having a 1 in 3 chance to
                  earn points, enhancing the visual experience.
                </OrderedList>
              </OrderedList>
            </div>
          </SubBox>
        </div>
      </SectionBox>

      {/* ANTTIME SWAP */}
      <SectionBox animated={false} className="fade-in-mount">
        {/* ANTTIME SWAP - TITLE */}
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

          {/* DESCRIPTION */}
          <div className="mt-10">
            <span className="text-xl">
              A platform to check your exchange score and convert Time Points
              into Ant Tokens.
            </span>
          </div>
        </div>

        {/* ANTTIME SWAP - CONTENTS */}
        <div className="col-start-4 col-end-9">
          <SubBox borderTop={false}>
            <div className="col-span-1 translate-y-1.5 font-semibold">1.</div>
            <div className="col-span-4">
              <Title>
                Developing a Strategy for Utilizing React Server Components and
                Client Components
              </Title>

              <OrderedList order={"a."} className="mb-2">
                Retrieved token swap period metadata on the server side to
                manage access control
              </OrderedList>

              <Divider />

              <OrderedList order={"b."} className="mb-2">
                Strengthened security by avoiding exposure of authorization
                logic based on permissions or timing in client-side code
              </OrderedList>

              <Divider />

              <OrderedList order={"c."}>
                Defined clear use cases for Server Components (e.g.,
                SEO-critical pages) and Client Components depending on rendering
                needs
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">2.</div>
            <div className="col-span-4">
              <Title>
                Separation of Concerns by State Using TanStack Query&apos;s
                useSuspenseQuery with Suspense and ErrorBoundary
              </Title>

              <OrderedList order={"a."} className="mb-2">
                Used Suspense and ErrorBoundary to isolate loading/error states
                and reduce component complexity
              </OrderedList>

              <Divider />

              <OrderedList order={"b."}>
                Designed architecture to minimize API request blocking
              </OrderedList>

              <Divider />

              <OrderedList order={"c."}>
                Improved UX with skeleton loaders during async loading
              </OrderedList>

              <Divider />

              <OrderedList order={"d."}>
                Used Suspensive library’s ClientOnly option for components
                requiring client-side dependencies in an SSR environment{" "}
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">3.</div>
            <div className="col-span-4">
              <Title>
                Implemented Web3 wallet connection and transaction handling
                using WAGMI
              </Title>

              <OrderedList order={"a."} className="mb-2">
                Connected major wallets such as MetaMask and WalletConnect, and
                retrieved wallet information
              </OrderedList>

              <Divider />

              <OrderedList order={"b."} className="mb-2">
                Enabled token swaps via smart contract interactions
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">4.</div>
            <div className="col-span-4">
              <Title>
                Created a sequential “score evaluation” animation using GSAP
              </Title>

              <OrderedList order={"a."}>
                Shared animation timing state between components using
                useContext
              </OrderedList>
            </div>
          </SubBox>
        </div>
      </SectionBox>

      {/* ANTTIME APP */}

      <SectionBox animated={false} className="fade-in-mount">
        {/* ANTTIME APP - TITLE */}
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

          <div className="mt-10">
            <span className="text-xl">
              Time 2 Earn! Mining Points to get Rich!
            </span>
          </div>
        </div>

        {/* ANTTIME APP - CONTENTS */}
        <div className="col-start-4 col-end-9">
          <SubBox borderTop={false}>
            <div className="col-span-1 translate-y-1.5 font-semibold">1.</div>
            <div className="col-span-4">
              <Title>Separated production and development Environment</Title>

              <OrderedList order={"a."}>
                <OrderedListHead>
                  Divide Native Build Config to Dev and Prod
                </OrderedListHead>

                <OrderedList order={"i."} className="mb-2">
                  Set up Firestore for each development environment and
                  configured environment variable files accordingly
                </OrderedList>

                <OrderedList order={"ii."}>
                  Configured environment-specific setups for
                  react-native-firebase during native builds using Xcode build
                  schemes for iOS and Android flavors for Android.
                </OrderedList>
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">2.</div>
            <div className="col-span-4">
              <Title>Updated React Native version</Title>

              <OrderedList order={"a."}>
                Due to an outdated RN version, library support was discontinued,
                requiring the use of older library versions
              </OrderedList>

              <Divider />

              <OrderedList order={"b."}>
                Upgraded from 0.68 to 0.74 using React Native Upgrade Helper
                modified native code accordingly (removed Flipper, configured
                Fabric, updated iOS/Android metadata)
              </OrderedList>

              <Divider />

              <OrderedList order={"c."}>
                Upgraded library configurations to match the new RN version
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">3.</div>
            <div className="col-span-4">
              <Title>Made DeepLink With Google Play Store Referral API</Title>

              <OrderedList order={"a."}>
                Developed deep links that redirect users to the appropriate
                store link based on their operating system
              </OrderedList>

              <Divider />

              <OrderedList order={"b."}>
                Additionally, used referral link query strings to pre-fill the
                referrer code upon app entry
              </OrderedList>

              <Divider />

              <OrderedList order={"c."}>
                Completed deep link integration with referrer code using the
                GOOGLE Play Store Referral API due to the deprecation of
                Firebase Dynamic Links
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">4.</div>
            <div className="col-span-4">
              <Title>Updated animation work skins</Title>

              <OrderedList order={"a."}>
                <OrderedListHead>
                  Developed a skin page that allows users to purchase individual
                  body part skins using in-app currency
                </OrderedListHead>

                <OrderedList order={"i."} className="mb-2">
                  Implemented functionality to fetch user body part data and
                  dynamically update skin animations and part replacements
                </OrderedList>

                <OrderedList order={"ii."} className="mb-2">
                  Released seasonal skins tailored to major holidays and events
                </OrderedList>
              </OrderedList>

              <Divider />

              <OrderedList order={"b."}>
                <OrderedListHead>
                  Complex mining animation using React Native Reanimated
                </OrderedListHead>

                <OrderedList order={"i."} className="mb-2">
                  The original mining animation was implemented with Lottie,
                  which played a single fixed animation of a character in a
                  predefined outfit. To support skin updates, the animation
                  needed to be separated into individual parts
                </OrderedList>

                <OrderedList order={"ii."} className="mb-2">
                  Used react-native-reanimated to create animation timelines for
                  each part and implemented smooth, coordinated playback
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
                <OrderedListHead>Implemented Slide Animation</OrderedListHead>

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
                <OrderedListHead>
                  Provided a Consistent User Experience Across Mobile and
                  Desktop
                </OrderedListHead>

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
                <OrderedListHead>
                  Handled complex business logic exceptions using a custom hook
                </OrderedListHead>

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
                <OrderedListHead>
                  Redirected to the payment method registration page if no
                  payment method is available, while preserving the form state
                  on return{" "}
                </OrderedListHead>

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
                <OrderedListHead>
                  Required full-team code reviews before merging.
                </OrderedListHead>

                <OrderedList order={"i."}>
                  Comments like &quot;Good job&quot; were discouraged —
                  reviewers were expected to leave meaningful feedback after
                  reading the code carefully
                </OrderedList>
              </OrderedList>

              <Divider />

              <OrderedList order={"b."}>
                <OrderedListHead>
                  Handled a mid-project situation where two teammates left to
                  prepare for job interviews, affecting team morale
                </OrderedListHead>

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

                <OrderedList order={"iii."}>
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

function OrderedListHead({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 font-bold">{children}</p>;
}
