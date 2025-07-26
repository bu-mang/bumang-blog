"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useEffect, useRef } from "react";

import gsap from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionBox, SubBox } from "@/components/pages";
import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("about");

  useEffect(() => {
    if (containerRef.current) {
      const fadeInElems =
        containerRef.current.querySelectorAll(".fade-in-mount");

      fadeInElems.forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          duration: 1,
          opacity: 1,
          y: -10,
          ease: "power2.out",
        });
      });
    }
  }, []);

  return (
    <main ref={containerRef}>
      {/* IMAGES */}
      <div className="fade-in-mount tbl:h-96 relative mx-[2vw] mb-6 h-40 md:mx-[6vw]">
        <Image
          src="/about_banner.jpg"
          alt="profileImage"
          className="object-cover"
          fill
        />
      </div>

      {/* INTRODUCE */}
      <SectionBox className={cn("fade-in-mount px-[2vw] md:px-[6vw]")}>
        <div className="tbl:col-span-3 tbl:mb-20 tbl:h-32 tbl:sticky tbl:block top-20 col-span-full hidden text-6xl font-semibold">
          Hello!
        </div>
        <div className="tbl:block col-span-1 hidden translate-y-1.5 grid-cols-1 font-semibold">
          I AM
        </div>
        <div className="tbl:col-span-4 col-span-full mb-6 grid grid-cols-4">
          <span className="col-span-4 mb-6 text-6xl font-semibold md:mb-2">
            {t("intro.title.1")}
          </span>
          <span className="col-span-4 mb-5 hidden whitespace-pre-line text-6xl font-semibold md:block">
            {t("intro.title.2")}
          </span>
          <p className="col-span-4 break-keep leading-relaxed">
            {t("intro.desc")}
          </p>
        </div>

        <div className="tbl:col-start-4 tbl:col-end-9 tbl:-translate-y-3 col-span-full">
          <SubBox>
            <span className="col-span-1 font-semibold">Moblie</span>
            <span className="col-span-4">+82 10-4922-3563</span>
          </SubBox>

          <SubBox>
            <span className="col-span-1 font-semibold">Email</span>
            <span className="col-span-4">baughman0729@gmail.com</span>
          </SubBox>

          <SubBox className="mb-16">
            <span className="col-span-1 font-semibold">Links</span>
            <div className="col-span-4 flex gap-2 text-gray-200">
              <Link
                href={
                  "https://angry-munchkin-077.notion.site/Portfolio-e6622320a2284acea12280d82898e842?pvs=74"
                }
                className="transition-all hover:bg-gray-800 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Notion
              </Link>
              <Link
                href={"https://www.behance.net/calmness078ad4"}
                className="transition-all hover:bg-gray-800 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Behance
              </Link>
              <Link
                href={"https://www.chess.com/member/blmnt/stats/rapid"}
                className="transition-all hover:bg-gray-800 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chess.com
              </Link>
              {/* <Link
                href={""}
                className="transition-all hover:bg-gray-800 hover:text-white"
              >
                Instagram
              </Link> */}
            </div>
          </SubBox>
        </div>
      </SectionBox>

      {/* AWARDS */}
      {/* LAYOUT_PADDING_ALONGSIDE */}
      <SectionBox className={cn("fade-in-mount px-[2vw] md:px-[6vw]")}>
        <div className="tbl:col-span-3 tbl:mb-20 tbl:h-32 tbl:sticky top-20 col-span-full mb-3 text-6xl font-semibold">
          Records
        </div>

        <div className="tbl:col-start-4 tbl:col-end-9 tbl:-translate-y-3 col-span-full">
          <SubBox className="border-none">
            <div className="col-span-1 font-semibold">2024 -</div>
            <div className="col-span-4 flex flex-col">
              <span className="font-semibold">{t("record.2024.title")}</span>
              <span className="text-gray-300">{t("record.2024.desc")}</span>
            </div>
          </SubBox>
          <SubBox>
            <div className="col-span-1 font-semibold">2023</div>
            <div className="col-span-4 flex flex-col">
              <span className="font-semibold">{t("record.2023.title")}</span>
              <span className="text-gray-300">{t("record.2023.desc")}</span>
            </div>
          </SubBox>
          <SubBox>
            <div className="col-span-1 font-semibold">2022</div>
            <div className="col-span-4 flex flex-col">
              <span className="font-semibold">{t("record.2022.title")}</span>
              <span className="text-gray-300">{t("record.2022.desc")}</span>
            </div>
          </SubBox>
          <SubBox>
            <div className="col-span-1 font-semibold">2021</div>
            <div className="col-span-4 flex flex-col">
              <span className="font-semibold">{t("record.2021.title")}</span>
              <span className="text-gray-300">{t("record.2021.desc")}</span>
            </div>
          </SubBox>
          <SubBox className="mb-16">
            <div className="col-span-1 font-semibold">2019</div>
            <div className="col-span-4 flex flex-col">
              <span className="font-semibold">{t("record.2019.title")}</span>
              <span className="text-gray-300">{t("record.2019.desc")}</span>
            </div>
          </SubBox>
        </div>
      </SectionBox>

      {/* MAIN TECHSTACK */}
      <SectionBox className={cn("fade-in-mount px-[2vw] md:px-[6vw]")}>
        <div className="tbl:col-span-3 tbl:mb-20 tbl:h-32 tbl:sticky top-20 col-span-full mb-3 flex flex-col text-6xl font-semibold">
          <span>Main</span>
          <span>TechStack</span>
        </div>

        <div className="tbl:col-start-4 tbl:col-end-9 tbl:-translate-y-3 col-span-full">
          {/* WEB */}
          <SubBox className="gap-y-8 border-none text-sm">
            <div className="col-span-full pr-2 font-semibold sm:col-span-1 sm:text-gray-200 md:row-span-3">
              Web Frontend
            </div>
            <div className="col-start-1 col-end-4 flex flex-col sm:col-start-2 sm:col-end-4">
              <span className="font-semibold">React/Next.js</span>
              <span className="text-gray-300">
                {t("techStack.webFrontEnd.1.desc")}
              </span>
            </div>
            <div className="col-start-4 col-end-8 flex flex-col pl-2 sm:col-start-4 sm:col-end-6">
              <span className="font-semibold">Tailwind, StyledComponent</span>
              <span className="text-gray-300">
                {t("techStack.webFrontEnd.2.desc")}
              </span>
            </div>
            <div className="col-start-1 col-end-4 flex flex-col sm:col-start-2 sm:col-end-4">
              <span className="font-semibold">React-Hook-Form, Zod</span>
              <span className="text-gray-300">
                {t("techStack.webFrontEnd.3.desc")}
              </span>
            </div>
            <div className="col-start-4 col-end-8 flex flex-col pl-2 sm:col-start-4 sm:col-end-6">
              <span className="font-semibold">Axios, TanstackQuery</span>
              <span className="text-gray-300">
                {t("techStack.webFrontEnd.4.desc")}
              </span>
            </div>
            <div className="col-start-1 col-end-4 flex flex-col sm:col-start-2 sm:col-end-4">
              <span className="font-semibold">Zustand, ReduxToolkit</span>
              <span className="text-gray-300">
                {t("techStack.webFrontEnd.5.desc")}
              </span>
            </div>
            <div className="col-start-4 col-end-8 flex flex-col pl-2 sm:col-start-4 sm:col-end-6">
              <span className="font-semibold">Gsap, Three.js, Motion</span>
              <span className="text-gray-300">
                {t("techStack.webFrontEnd.6.desc")}
              </span>
            </div>
          </SubBox>

          {/* MOBILE */}
          <SubBox className="gap-y-8 text-sm">
            <div className="col-span-full pr-2 font-semibold sm:col-span-1 sm:text-gray-200 md:row-span-3">
              Mobile Frontend
            </div>
            <div className="col-start-1 col-end-4 flex flex-col sm:col-start-2 sm:col-end-4">
              <span className="font-semibold">React Native</span>
              <span className="text-gray-300">
                {t("techStack.appFrontEnd.1.desc")}
              </span>
            </div>
            <div className="col-start-4 col-end-8 flex flex-col pl-2 sm:col-start-4 sm:col-end-6">
              <span className="font-semibold">StyleSheet</span>
              <span className="text-gray-300">
                {t("techStack.appFrontEnd.2.desc")}
              </span>
            </div>
            <div className="col-start-1 col-end-4 flex flex-col sm:col-start-2 sm:col-end-4">
              <span className="font-semibold">React Native Codepush</span>
              <span className="text-gray-300">
                {t("techStack.appFrontEnd.3.desc")}
              </span>
            </div>
            <div className="col-start-4 col-end-8 flex flex-col pl-2 sm:col-start-4 sm:col-end-6">
              <span className="font-semibold">React Native Firebase FCM</span>
              <span className="text-gray-300">
                {t("techStack.appFrontEnd.4.desc")}
              </span>
            </div>
            <div className="col-start-1 col-end-4 flex flex-col sm:col-start-2 sm:col-end-4">
              <span className="font-semibold">React Native Reanimated</span>
              <span className="text-gray-300">
                {t("techStack.appFrontEnd.5.desc")}
              </span>
            </div>
          </SubBox>

          {/* BACKEND */}
          <SubBox className="gap-y-8 text-sm">
            <div className="col-span-full pr-2 font-semibold sm:col-span-1 md:row-span-3">
              Backend
            </div>

            <div className="col-start-1 col-end-4 flex flex-col sm:col-start-2 sm:col-end-4">
              <span className="font-semibold">
                {t("techStack.backend.1.title")}
              </span>
              <span className="text-gray-300">
                {t("techStack.backend.1.desc")}
              </span>
            </div>
            <div className="col-start-4 col-end-8 flex flex-col pl-2 sm:col-start-4 sm:col-end-6">
              <span className="font-semibold">
                {t("techStack.backend.2.title")}
              </span>
              <span className="text-gray-300">
                {t("techStack.backend.2.desc")}
              </span>
            </div>
            <div className="col-start-1 col-end-4 flex flex-col sm:col-start-2 sm:col-end-4">
              <span className="font-semibold">
                {t("techStack.backend.3.title")}
              </span>
              <span className="text-gray-300">
                {t("techStack.backend.3.desc")}
              </span>
            </div>
            <div className="col-start-4 col-end-8 flex flex-col pl-2 sm:col-start-4 sm:col-end-6">
              <span className="font-semibold">
                {t("techStack.backend.4.title")}
              </span>
              <span className="text-gray-300">
                {t("techStack.backend.4.desc")}
              </span>
            </div>
            <div className="col-start-1 col-end-4 flex flex-col sm:col-start-2 sm:col-end-4">
              <span className="font-semibold">
                {t("techStack.backend.5.title")}
              </span>
              <span className="text-gray-300">
                {t("techStack.backend.5.desc")}
              </span>
            </div>
            <div className="col-start-4 col-end-8 flex flex-col pl-2 sm:col-start-4 sm:col-end-6">
              <span className="font-semibold">
                {t("techStack.backend.6.title")}
              </span>
              <span className="text-gray-300">
                {t("techStack.backend.6.desc")}
              </span>
            </div>
          </SubBox>

          {/* CI/CD */}
          <SubBox className="gap-y-8 text-sm">
            <div className="col-span-full pr-2 font-semibold sm:col-span-1 sm:text-gray-200 md:row-span-3">
              CI/CD
            </div>

            <div className="col-start-1 col-end-4 flex flex-col sm:col-start-2 sm:col-end-4">
              <span className="font-semibold">
                {t("techStack.cicd.1.title")}
              </span>
              <span className="text-gray-300">
                {t("techStack.cicd.1.desc")}
              </span>
            </div>
            <div className="col-start-4 col-end-8 flex flex-col pl-2 sm:col-start-4 sm:col-end-6">
              <span className="font-semibold">
                {t("techStack.cicd.2.title")}
              </span>
              <span className="text-gray-300">
                {t("techStack.cicd.2.desc")}
              </span>
            </div>
            <div className="col-start-1 col-end-4 flex flex-col sm:col-start-2 sm:col-end-4">
              <span className="font-semibold">
                {t("techStack.cicd.3.title")}
              </span>
              <span className="text-gray-300">
                {t("techStack.cicd.3.desc")}
              </span>
            </div>
          </SubBox>

          {/* DESIGN */}
          <SubBox className="gap-y-8 text-sm">
            <div className="col-span-full pr-2 font-semibold sm:col-span-1 sm:text-gray-200 md:row-span-3">
              Design
            </div>

            <div className="col-start-1 col-end-4 flex flex-col sm:col-start-2 sm:col-end-4">
              <span className="font-semibold">
                {t("techStack.design.1.title")}
              </span>
              <span className="text-gray-300">
                {t("techStack.design.1.desc")}
              </span>
            </div>
            <div className="col-start-4 col-end-8 flex flex-col pl-2 sm:col-start-4 sm:col-end-6">
              <span className="font-semibold">
                {t("techStack.design.2.title")}
              </span>
              <span className="text-gray-300">
                {t("techStack.design.2.desc")}
              </span>
            </div>
            <div className="col-start-1 col-end-4 flex flex-col sm:col-start-2 sm:col-end-4">
              <span className="font-semibold">
                {t("techStack.design.3.title")}
              </span>
              <span className="text-gray-300">
                {t("techStack.design.3.desc")}
              </span>
            </div>
            <div className="col-start-4 col-end-8 flex flex-col pl-2 sm:col-start-4 sm:col-end-6">
              <span className="font-semibold">
                {t("techStack.design.4.title")}
              </span>
              <span className="text-gray-300">
                {t("techStack.design.4.desc")}
              </span>
            </div>
            <div className="col-start-1 col-end-4 flex flex-col sm:col-start-2 sm:col-end-4">
              <span className="font-semibold">
                {t("techStack.design.5.title")}
              </span>
              <span className="text-gray-300">
                {t("techStack.design.5.desc")}
              </span>
            </div>
          </SubBox>
        </div>
      </SectionBox>

      {/* BASIC LEVEL SKILLS */}
      <SectionBox className={cn("fade-in-mount px-[2vw] md:px-[6vw]")}>
        <div className="tbl:col-span-3 tbl:mb-20 tbl:h-32 tbl:sticky top-20 col-span-full mb-3 flex flex-col text-6xl font-semibold">
          <span>Basic</span>
          <span>Level in</span>
        </div>

        <div className="tbl:col-start-4 tbl:col-end-9 tbl:-translate-y-3 col-span-full">
          {/* DEV */}
          <SubBox className="gap-y-8 border-none text-sm">
            <div className="col-span-1 pr-2 font-semibold md:row-span-3 md:mb-20">
              Dev
            </div>

            <div className="col-start-1 col-end-4 flex flex-col sm:col-start-2 sm:col-end-4">
              <span className="font-semibold">
                {t("techStack.basicLevel.1.title")}
              </span>
              <span className="text-gray-300">
                {t("techStack.basicLevel.1.desc")}
              </span>
            </div>
            <div className="col-start-4 col-end-8 flex flex-col pl-2 sm:col-start-4 sm:col-end-6">
              <span className="font-semibold">
                {t("techStack.basicLevel.2.title")}
              </span>
              <span className="text-gray-300">
                {t("techStack.basicLevel.2.desc")}
              </span>
            </div>
            <div className="col-start-1 col-end-4 flex flex-col sm:col-start-2 sm:col-end-4">
              <span className="font-semibold">
                {t("techStack.basicLevel.3.title")}
              </span>
              <span className="text-gray-300">
                {t("techStack.basicLevel.3.desc")}
              </span>
            </div>
          </SubBox>

          {/* DESIGN */}
          <SubBox className="gap-y-8 text-sm">
            <div className="tbl:sticky top-20 col-span-1 pr-2 font-semibold md:row-span-3 md:mb-20">
              Design
            </div>

            <div className="col-start-1 col-end-4 flex flex-col sm:col-start-2 sm:col-end-4">
              <span className="font-semibold">
                {t("techStack.basicLevel.4.title")}
              </span>
              <span className="text-gray-300">
                {t("techStack.basicLevel.4.desc")}
              </span>
            </div>
          </SubBox>
        </div>
      </SectionBox>
    </main>
  );
}
