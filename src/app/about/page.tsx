"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import gsap from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionBox, SubBox } from "@/components/aboutSection";

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const fadeInElems =
        containerRef.current.querySelectorAll(".fade-in-mount");

      fadeInElems.forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 66%",
            toggleActions: "play none none none",
          },
          duration: 1,
          opacity: 1,
          y: -10,
          ease: "power2.out",
        });
      });
    }
  }, [containerRef]);

  return (
    <main className="" ref={containerRef}>
      {/* IMAGES */}
      <div className="fade-in-mount relative mx-[3vw] mb-6 h-96">
        <Image
          src="/star.webp"
          alt="profileImage"
          className="object-cover"
          fill
        />
      </div>

      {/* INTRODUCE */}
      <SectionBox className="fade-in-mount">
        <div className="sticky top-20 col-span-3 mb-20 h-32 text-6xl font-semibold">
          Hello!
        </div>
        <div className="col-span-1 translate-y-1.5 font-semibold">I AM</div>
        <div className="col-span-4 mb-6 grid grid-cols-4">
          <span className="col-span-4 mb-1 text-6xl font-semibold">
            Bumang!
          </span>
          <span className="col-span-4 mb-3 text-6xl font-semibold">
            Who loves Interactives
          </span>
          <p className="col-span-3">
            I majored in Industrial design and worked as a UX designer before
            transitioning to frontend development. I have a passion for art and
            enjoy drawing as a hobby. I&apos;m particularly interested in
            creating interactive 2D/3D content on the web, exploring WebGL and
            Canvas. My goal is to become a full-stack developer, and I enjoy
            working on solo development projects and experimenting with new
            technologies. I&apos;m always open to exciting side project ideas!
          </p>
        </div>
        <div className="col-start-4 col-end-9">
          <SubBox>
            <span className="col-span-1 font-semibold">Moblie</span>
            <span className="col-span-4">+82 10-4922-3563</span>
          </SubBox>
          <SubBox>
            <span className="col-span-1 font-semibold">Email</span>
            <span className="col-span-4">Baughman0729@gmail.com</span>
          </SubBox>
          <SubBox className="mb-16">
            <span className="col-span-1 font-semibold">Links</span>
            <div className="col-span-4 flex gap-2 text-gray-200">
              <Link
                href={""}
                className="transition-all hover:bg-gray-800 hover:text-white"
              >
                Notion
              </Link>
              <Link
                href={""}
                className="transition-all hover:bg-gray-800 hover:text-white"
              >
                Behance
              </Link>
              <Link
                href={""}
                className="transition-all hover:bg-gray-800 hover:text-white"
              >
                Instagram
              </Link>
            </div>
          </SubBox>
        </div>
      </SectionBox>

      {/* AWARDS */}
      <SectionBox className="fade-in-mount">
        <div className="sticky top-20 col-span-3 mb-20 h-32 text-6xl font-semibold">
          Awards
        </div>
        <div className="col-start-4 col-end-9 -translate-y-3">
          <SubBox className="border-none">
            <div className="col-span-1 font-semibold">2023</div>
            <div className="col-span-4 flex flex-col">
              <span className="font-semibold">
                Yanolja X Fast Campus Frontend Tech School
              </span>
              <span className="text-gray-300">Outstanding Graduate</span>
            </div>
          </SubBox>
          <SubBox>
            <div className="col-span-1 font-semibold">2022</div>
            <div className="col-span-4 flex flex-col">
              <span className="font-semibold">
                Naver Boostcourse Python Coaching Study
              </span>
              <span className="text-gray-300">Lead Booster</span>
            </div>
          </SubBox>
          <SubBox>
            <div className="col-span-1 font-semibold">2021</div>
            <div className="col-span-4 flex flex-col">
              <span className="font-semibold">
                Kakao x Korea Tourism Organization Travel Data Contest
              </span>
              <span className="text-gray-300">
                Grand Prize - Participated as a UX Designer
              </span>
            </div>
          </SubBox>
          <SubBox className="mb-16">
            <div className="col-span-1 font-semibold">2019</div>
            <div className="col-span-4 flex flex-col">
              <span className="font-semibold">
                University of Seoul Jangsangotmae Mascot Graphic Design Contest
              </span>
              <span className="text-gray-300">Second Prize</span>
            </div>
          </SubBox>
        </div>
      </SectionBox>

      {/* MAIN TECHSTACK */}
      <SectionBox className="fade-in-mount">
        <div className="sticky top-20 col-span-3 mb-20 flex h-48 flex-col gap-2 text-6xl font-semibold">
          <span>Main</span>
          <span>TechStack</span>
        </div>
        <div className="col-start-4 col-end-9 -translate-y-3">
          {/* WEB */}
          <SubBox className="gap-y-8 border-none text-sm">
            <div className="col-span-1 row-span-3 pr-2 font-semibold">
              Web Frontend
            </div>
            <div className="col-start-2 col-end-4 flex flex-col">
              <span className="font-semibold">React/Next.js(App)</span>
              <span className="text-gray-300">SPA Library/Framework</span>
            </div>
            <div className="col-start-4 col-end-6 flex flex-col pl-2">
              <span className="font-semibold">Tailwind, StyledComponent</span>
              <span className="text-gray-300">CSS Styling</span>
            </div>
            <div className="col-start-2 col-end-4 flex flex-col">
              <span className="font-semibold">React-Hook-Form, Zod</span>
              <span className="text-gray-300">Validation</span>
            </div>
            <div className="col-start-4 col-end-6 flex flex-col pl-2">
              <span className="font-semibold">Axios, TanstackQuery</span>
              <span className="text-gray-300">Server Fetching</span>
            </div>
            <div className="col-start-2 col-end-4 flex flex-col">
              <span className="font-semibold">Zustand, ReduxToolkit</span>
              <span className="text-gray-300">Global State Management</span>
            </div>
            <div className="col-start-4 col-end-6 flex flex-col pl-2">
              <span className="font-semibold">Gsap, Three.js, Motion</span>
              <span className="text-gray-300">Interactive Development</span>
            </div>
          </SubBox>
          {/* MOBILE */}
          <SubBox className="gap-y-8 text-sm">
            <div className="col-span-1 row-span-3 pr-2 font-semibold">
              Mobile Frontend
            </div>
            <div className="col-start-2 col-end-4 flex flex-col">
              <span className="font-semibold">React Native</span>
              <span className="text-gray-300">Cross Platform</span>
            </div>
            <div className="col-start-4 col-end-6 flex flex-col pl-2">
              <span className="font-semibold">StyleSheet</span>
              <span className="text-gray-300">CSS Styling</span>
            </div>
            <div className="col-start-2 col-end-4 flex flex-col">
              <span className="font-semibold">React Native Codepush</span>
              <span className="text-gray-300">Instant Deploy</span>
            </div>
            <div className="col-start-4 col-end-6 flex flex-col pl-2">
              <span className="font-semibold">React Native Firebase FCM</span>
              <span className="text-gray-300">Push Notification</span>
            </div>
            <div className="col-start-2 col-end-4 flex flex-col">
              <span className="font-semibold">React Native Reanimated</span>
              <span className="text-gray-300">Animation</span>
            </div>
            <div className="col-start-4 col-end-6 flex flex-col pl-2">
              <span className="font-semibold">iOS/Android Store Review</span>
              <span className="text-gray-300">Market Deploy Experience</span>
            </div>
          </SubBox>
          {/* BACKEND */}
          <SubBox className="gap-y-8 text-sm">
            <div className="col-span-1 row-span-3 pr-2 font-semibold">
              Backend
            </div>
            <div className="col-start-2 col-end-4 flex flex-col">
              <span className="font-semibold">express.js, Nest.js</span>
              <span className="text-gray-300">Backend Frameworks</span>
            </div>
            <div className="col-start-4 col-end-6 flex flex-col pl-2">
              <span className="font-semibold">Firebase</span>
              <span className="text-gray-300">Backend as a Service</span>
            </div>
            <div className="col-start-2 col-end-4 flex flex-col">
              <span className="font-semibold">Google Cloud Platform</span>
              <span className="text-gray-300">Instant Deploy</span>
            </div>
            <div className="col-start-4 col-end-6 flex flex-col pl-2">
              <span className="font-semibold">PostgresQL, MongoDB</span>
              <span className="text-gray-300">Database</span>
            </div>
            <div className="col-start-2 col-end-4 flex flex-col">
              <span className="font-semibold">Prisma</span>
              <span className="text-gray-300">ORM</span>
            </div>
            {/* <div className="col-start-4 col-end-6 flex flex-col pl-2">
              <span className="font-semibold">Supabase</span>
              <span className="text-gray-300">Backend as a Service</span>
            </div> */}
          </SubBox>
          {/* CI/CD */}
          <SubBox className="gap-y-8 text-sm">
            <div className="col-span-1 row-span-3 pr-2 font-semibold">
              CI/CD
            </div>
            <div className="col-start-2 col-end-4 flex flex-col">
              <span className="font-semibold">Git, Github</span>
              <span className="text-gray-300">
                Version Control & Collaboration
              </span>
            </div>
            <div className="col-start-4 col-end-6 flex flex-col pl-2">
              <span className="font-semibold">Github Action</span>
              <span className="text-gray-300">CI/CD & Automation</span>
            </div>
            <div className="col-start-2 col-end-4 flex flex-col">
              <span className="font-semibold">Docker, DockerCompose</span>
              <span className="text-gray-300">
                Containerization & Orchestration
              </span>
            </div>
          </SubBox>
          {/* DESIGN */}
          <SubBox className="gap-y-8 text-sm">
            <div className="col-span-1 row-span-3 pr-2 font-semibold">
              Design
            </div>
            <div className="col-start-2 col-end-4 flex flex-col">
              <span className="font-semibold">Figma</span>
              <span className="text-gray-300">UX/UI</span>
            </div>
            <div className="col-start-4 col-end-6 flex flex-col pl-2">
              <span className="font-semibold">Photoshop, Illustration</span>
              <span className="text-gray-300">Graphic Design</span>
            </div>
            <div className="col-start-2 col-end-4 flex flex-col">
              <span className="font-semibold">After Effect</span>
              <span className="text-gray-300">Motion Graphic</span>
            </div>
            <div className="col-start-4 col-end-6 flex flex-col pl-2">
              <span className="font-semibold">UG NX, Keyshot</span>
              <span className="text-gray-300">3D Modeling & Rendering</span>
            </div>
            <div className="col-start-2 col-end-4 flex flex-col">
              <span className="font-semibold">ClipStudio, ProCreate(iPad)</span>
              <span className="text-gray-300">Art & Illustration</span>
            </div>
          </SubBox>
        </div>
      </SectionBox>

      {/* BASIC LEVEL SKILLS */}
      <SectionBox className="fade-in-mount">
        <div className="sticky top-20 col-span-3 mb-20 flex h-32 flex-col text-6xl font-semibold">
          <span>Basic</span>
          <span>Level in</span>
        </div>
        <div className="col-start-4 col-end-9 -translate-y-3">
          {/* DEV */}
          <SubBox className="gap-y-8 border-none text-sm">
            <div className="col-span-1 row-span-3 pr-2 font-semibold">Dev</div>
            <div className="col-start-2 col-end-4 flex flex-col">
              <span className="font-semibold">SCSS</span>
              <span className="text-gray-300">CSS Styling</span>
            </div>
            <div className="col-start-4 col-end-6 flex flex-col pl-2">
              <span className="font-semibold">Redux-Tookit, Jotai</span>
              <span className="text-gray-300">Global State Management</span>
            </div>
            <div className="col-start-2 col-end-4 flex flex-col">
              <span className="font-semibold">P5.js, Phaser3.js</span>
              <span className="text-gray-300">Interactive</span>
            </div>
            <div className="col-start-4 col-end-6 flex flex-col pl-2">
              <span className="font-semibold">Amazon Web Services</span>
              <span className="text-gray-300">Cloud Infrastructure</span>
            </div>
          </SubBox>
          {/* DESIGN */}
          <SubBox className="gap-y-8 text-sm">
            <div className="sticky top-20 col-span-1 row-span-3 mb-20 pr-2 font-semibold">
              Design
            </div>
            <div className="col-start-2 col-end-4 flex flex-col">
              <span className="font-semibold">Blender, Cinema4D</span>
              <span className="text-gray-300">3D Modeling & Motion</span>
            </div>
          </SubBox>
        </div>
      </SectionBox>
    </main>
  );
}

// "디자인을 전공하고 UX 디자이너로 일하다가, 지금은 프론트엔드 개발자로 활동하고 있습니다. 예술을 좋아하고, 그림 그리기를 취미로 삼고 있습니다. 웹에서 2D/3D 인터랙티브 콘텐츠를 구현하는 것에 흥미가 많으며, WebGL과 Canvas를 탐구하고 있습니다. 풀스택 개발자로 성장하는 것을 목표로 하며, 1인 개발과 다양한 기술 실험을 즐깁니다. 재미있는 사이드 프로젝트 제안은 언제든 환영합니다!"
