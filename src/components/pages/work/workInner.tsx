"use client";

import { useTranslations } from "next-intl";
import { SectionBox, SubBox } from "../about/aboutSection";
import WorkItem from "./workItem";
import { cn } from "@/utils/cn";
import { useEffect } from "react";
import { useInteractiveStore } from "@/store/background";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { PATHNAME } from "@/constants/routes";

gsap.registerPlugin(ScrollTrigger); // 등록되어있지 않으면 등록.

export function WorkInnerInteractive() {
  const setHeaderBackgroundColor = useInteractiveStore(
    (state) => state.header.setBackgroundColor,
  );
  const setBorderBottom = useInteractiveStore(
    (state) => state.header.setBorderBottom,
  );
  const setDefaultSetting = useInteractiveStore(
    (state) => state.header.setDefaultSetting,
  );

  useEffect(() => {
    setHeaderBackgroundColor("bg-transparent");
    setBorderBottom("transparent");

    return () => {
      setDefaultSetting();
    };
  }, [setBorderBottom, setDefaultSetting, setHeaderBackgroundColor]);

  useEffect(() => {
    gsap.utils.toArray(".STICKER_IMAGE").forEach((element) => {
      if (element instanceof HTMLDivElement) {
        const randomY = Math.random() * 40 - 20; // -20 ~ 20 사이 랜덤값

        gsap
          .timeline({
            scrollTrigger: {
              trigger: element,
              start: "top 70%",
              end: "bottom top",
              scrub: 1,
            },
          })
          .to(element, {
            y: -50 + randomY, // 기본 -50에 랜덤값 추가
            ease: "sine.inOut",
          });
      }
    });
  }, []);

  return (
    <>
      {/* 마진용 */}
      <WorkItem nullItem imgSrc="" imgAlt="" />

      <WorkItem
        onClick={() => {}}
        title="Bumang Route53"
        imgSrc="/works/bumangRoute53.png"
        imgAlt="BumangRoute53"
        href={PATHNAME.WORK_DETAIL.BUMANG_ROUTE53}
      >
        {/*  */}
      </WorkItem>

      <WorkItem
        onClick={() => {}}
        title="SeaPearl"
        imgSrc="/works/seaPearl.png"
        imgAlt="SeaPearl"
        href={PATHNAME.WORK_DETAIL.SEA_PEARL}
      >
        <Sticker
          imgUrl="/works/seaPearlSticker.png"
          className={cn(
            "-left-20 bottom-10 md:h-72 md:w-96", //
            "h-36 w-48",
          )}
        />
      </WorkItem>

      <WorkItem
        onClick={() => {}}
        title="Anttime Swap"
        imgSrc="/works/anttimeSwap.png"
        imgAlt=""
        href={PATHNAME.WORK_DETAIL.ANTTIME_SWAP}
      >
        <Sticker
          imgUrl="/works/anttimeSwapSticker.png"
          className={cn(
            "-right-20 -scale-x-100 md:top-10 md:h-56 md:w-80",
            "top-20 h-28 w-40",
          )}
        />
      </WorkItem>

      <WorkItem
        onClick={() => {}}
        title="Anttime App"
        imgSrc="/works/anttimeApp.png"
        imgAlt=""
        href={PATHNAME.WORK_DETAIL.ANTTIME_APP}
      >
        <Sticker
          imgUrl="/works/anttimeAppSticker.png"
          className={cn(
            "bottom-12 right-0 md:h-56 md:w-80", //
            "h-28 w-40",
          )}
        />
      </WorkItem>

      <WorkItem
        onClick={() => {}}
        title="Percent Hotel"
        imgSrc="/works/percentHotel.png"
        imgAlt=""
        href={PATHNAME.WORK_DETAIL.PERCENT_HOTEL}
      >
        {/*  */}
      </WorkItem>
    </>
  );
}

interface StickerProps {
  imgUrl: string;
  className: string;
}
function Sticker({ imgUrl, className }: StickerProps) {
  return (
    <div
      className={cn(
        "STICKER_IMAGE absolute z-[100] flex items-center justify-center",
        className,
      )}
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}

export function WorkInnerCompact() {
  const t = useTranslations("work");

  return (
    <>
      {/* BUMANG BLOG */}
      <SectionBox animated={false} className="fade-in-mount" borderTop={false}>
        {/* TITLE */}
        <div className="sticky top-20 col-span-full mb-10 mt-8 flex h-fit flex-col px-5 font-semibold md:col-span-3 md:mb-44 md:px-0">
          <span className="mb-4 h-fit w-fit rounded-sm border border-gray-700 px-2 py-1 text-xs">
            {t("bumangRoute53.tag")}
          </span>
          <span className="mb-2">{t("bumangRoute53.desc")}</span>
          <div className="mb-4 flex flex-col text-6xl">
            <span className="mb-2">Bumang</span>
            <span>Route53</span>
          </div>

          <div className="flex items-center gap-2 font-normal">
            <span className="text-sm font-semibold text-gray-200">
              2024.12. -
            </span>
          </div>

          <div className="mb-0.5 flex items-center gap-2 font-normal">
            <span className="text-sm text-gray-200">
              {t("bumangRoute53.projectScale")}
            </span>
            <div className="h-3 w-[1px] bg-gray-200" />
            <span className="text-sm text-gray-200">
              {t("bumangRoute53.role")}
            </span>
          </div>
        </div>

        {/* CONTENTS */}
        <div className="col-span-full md:col-start-4 md:col-end-9">
          <SubBox borderTop={false}>
            <div className="col-span-full translate-y-1.5 px-5 font-semibold md:col-span-1 md:px-0">
              1.
            </div>
            <div className="col-span-full px-5 md:col-span-4 md:px-0">
              <Title className="mb-16 md:mb-6">
                {t("bumangRoute53.1.title")}
              </Title>

              <OrderedList order={"a."}>
                <OrderedListHead>
                  {t("bumangRoute53.1.a.title")}
                </OrderedListHead>

                <OrderedList order={"i."} className="mb-2">
                  {t("bumangRoute53.1.a.i")}
                </OrderedList>

                <OrderedList order={"ii."} className="mb-2">
                  {t("bumangRoute53.1.a.ii")}
                </OrderedList>

                <OrderedList order={"iii."}>
                  {t("bumangRoute53.1.a.iii")}
                </OrderedList>
              </OrderedList>

              <Divider />

              <OrderedList order={"b."}>
                <OrderedListHead>
                  {t("bumangRoute53.1.b.title")}
                </OrderedListHead>

                <OrderedList order={"i."} className="mb-2">
                  {t("bumangRoute53.1.b.i")}
                </OrderedList>

                <OrderedList order={"ii."} className="mb-2">
                  {t("bumangRoute53.1.b.ii")}
                </OrderedList>

                <OrderedList order={"iii."}>
                  {t("bumangRoute53.1.b.iii")}
                </OrderedList>
              </OrderedList>

              <Divider />

              <OrderedList order={"c."}>
                <OrderedListHead>
                  {t("bumangRoute53.1.c.title")}
                </OrderedListHead>

                <OrderedList order={"i."} className="mb-2">
                  {t("bumangRoute53.1.c.i")}
                </OrderedList>

                <OrderedList order={"ii."} className="mb-2">
                  {t("bumangRoute53.1.c.ii")}
                </OrderedList>

                <OrderedList order={"iii."} className="mb-2">
                  {t("bumangRoute53.1.c.iii")}
                </OrderedList>

                <OrderedList order={"iv."}>
                  {t("bumangRoute53.1.c.iv")}
                </OrderedList>
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-full translate-y-1.5 px-5 font-semibold md:col-span-1 md:px-0">
              2.
            </div>
            <div className="col-span-full px-5 md:col-span-4 md:px-0">
              <Title className="mb-16 md:mb-6">
                {t("bumangRoute53.2.title")}
              </Title>

              <OrderedList order={"a."} className="mb-2">
                <OrderedListHead>{t("bumangRoute53.2.a.i")}</OrderedListHead>

                <OrderedList order={"ii."} className="mb-2">
                  {t("bumangRoute53.2.a.ii")}
                </OrderedList>

                <OrderedList order={"iii."} className="mb-2">
                  {t("bumangRoute53.2.a.iii")}
                </OrderedList>

                <OrderedList order={"iv."} className="mb-2">
                  {t("bumangRoute53.2.a.iv")}
                </OrderedList>

                <OrderedList order={"v."} className="mb-2">
                  {t("bumangRoute53.2.a.v")}
                </OrderedList>

                <OrderedList order={"vi."}>
                  {t("bumangRoute53.2.a.vi")}
                </OrderedList>
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-full translate-y-1.5 px-5 font-semibold md:col-span-1 md:px-0">
              3.
            </div>
            <div className="col-span-full px-5 md:col-span-4 md:px-0">
              <Title className="mb-16 md:mb-6">
                {t("bumangRoute53.3.title")}
              </Title>

              <OrderedList order={"a."}>{t("bumangRoute53.3.a")}</OrderedList>

              <Divider />

              <OrderedList order={"b."}>{t("bumangRoute53.3.b")}</OrderedList>

              <Divider />

              <OrderedList order={"c."}>{t("bumangRoute53.3.c")}</OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-full translate-y-1.5 px-5 font-semibold md:col-span-1 md:px-0">
              4.
            </div>
            <div className="col-span-full px-5 md:col-span-4 md:px-0">
              <Title className="mb-16 md:mb-6">{t("bumangRoute53.4")}</Title>
            </div>
          </SubBox>
        </div>
      </SectionBox>

      {/* SEA PEARL */}
      <SectionBox animated={false} className="fade-in-mount">
        {/* SEA PEARL - TITLE */}
        <div className="sticky top-20 col-span-full mb-10 mt-8 flex h-fit flex-col px-5 font-semibold md:col-span-3 md:mb-44 md:px-0">
          <span className="mb-4 h-fit w-fit rounded-sm border border-gray-700 px-2 py-1 text-xs">
            {t("seaPearl.tag")}
          </span>
          <span className="mb-2">{t("seaPearl.desc")}</span>
          <div className="mb-4 flex flex-col text-6xl">SeaPearl</div>

          <div className="flex items-center gap-2 font-normal">
            <span className="text-sm font-semibold text-gray-200">
              2024.05. -
            </span>
          </div>

          <div className="mb-0.5 flex items-center gap-2 font-normal">
            <span className="text-sm text-gray-200">
              {t("seaPearl.projectScale")}
            </span>
            <div className="h-3 w-[1px] bg-gray-200" />
            <span className="text-sm text-gray-200">{t("seaPearl.role")}</span>
          </div>
        </div>

        {/* ANTTIME SWAP - CONTENTS */}
        <div className="col-span-full md:col-start-4 md:col-end-9">
          <SubBox borderTop={false}>
            <div className="col-span-full translate-y-1.5 px-5 font-semibold md:col-span-1 md:px-0">
              1.
            </div>
            <div className="col-span-full px-5 md:col-span-4 md:px-0">
              <Title className="mb-16 md:mb-6">{t("seaPearl.1.title")}</Title>

              <OrderedList order={"a."} className="mb-2">
                {t("seaPearl.1.a")}
              </OrderedList>

              <OrderedList order={"b."} className="mb-2">
                <OrderedListHead>{t("seaPearl.1.b.title")}</OrderedListHead>

                <OrderedList order={"i."} className="mb-2">
                  {t("seaPearl.1.b.i")}
                </OrderedList>

                <OrderedList order={"ii."}>{t("seaPearl.1.b.ii")}</OrderedList>
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-full translate-y-1.5 px-5 font-semibold md:col-span-1 md:px-0">
              2.
            </div>
            <div className="col-span-full px-5 md:col-span-4 md:px-0">
              <Title className="mb-16 md:mb-6">{t("seaPearl.2.title")}</Title>

              <OrderedList order={"a."} className="mb-2">
                {t("seaPearl.2.a")}
              </OrderedList>

              <Divider />

              <OrderedList order={"b."} className="mb-2">
                {t("seaPearl.2.b")}
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-full translate-y-1.5 px-5 font-semibold md:col-span-1 md:px-0">
              3.
            </div>
            <div className="col-span-full px-5 md:col-span-4 md:px-0">
              <Title className="mb-16 md:mb-6">{t("seaPearl.3.title")}</Title>

              <OrderedList order={"a."}>{t("seaPearl.3.a")}</OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-full translate-y-1.5 px-5 font-semibold md:col-span-1 md:px-0">
              4.
            </div>
            <div className="col-span-full px-5 md:col-span-4 md:px-0">
              <Title className="mb-16 md:mb-6">{t("seaPearl.4.title")}</Title>

              <OrderedList order={"a."}>
                <OrderedListHead>{t("seaPearl.4.a.title")}</OrderedListHead>

                <OrderedList order={"i."} className="mb-2">
                  {t("seaPearl.4.a.i")}
                </OrderedList>

                <OrderedList order={"ii."} className="mb-2">
                  {t("seaPearl.4.a.ii")}
                </OrderedList>

                <OrderedList order={"iii."}>
                  {t("seaPearl.4.a.iii")}
                </OrderedList>
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-full translate-y-1.5 px-5 font-semibold md:col-span-1 md:px-0">
              5.
            </div>
            <div className="col-span-full px-5 md:col-span-4 md:px-0">
              <Title className="mb-16 md:mb-6">{t("seaPearl.5.title")}</Title>

              <OrderedList order={"a."}>
                <OrderedListHead>{t("seaPearl.5.a.title")}</OrderedListHead>

                <OrderedList order={"i."}>{t("seaPearl.5.a.i")}</OrderedList>
              </OrderedList>
            </div>
          </SubBox>
        </div>
      </SectionBox>

      {/* ANTTIME SWAP */}
      <SectionBox animated={false} className="fade-in-mount">
        {/* ANTTIME SWAP - TITLE */}
        <div className="sticky top-20 col-span-full mb-10 mt-8 flex h-fit flex-col px-5 font-semibold md:col-span-3 md:mb-44 md:px-0">
          <span className="mb-4 h-fit w-fit rounded-sm border border-gray-700 px-2 py-1 text-xs">
            {t("anttimeSwap.tag")}
          </span>
          <span className="mb-2">{t("anttimeSwap.desc")}</span>
          <div className="mb-4 flex flex-col text-6xl">
            <span className="mb-2">ANTTIME</span>
            <span>SWAP</span>
          </div>

          <div className="flex items-center gap-2 font-normal">
            <span className="text-sm font-semibold text-gray-200">
              2025.04 -
            </span>
          </div>

          <div className="mb-0.5 flex items-center gap-2 font-normal">
            <span className="text-sm text-gray-200">
              {t("anttimeSwap.projectScale")}
            </span>
            <div className="h-3 w-[1px] bg-gray-200" />
            <span className="text-sm text-gray-200">
              {t("anttimeSwap.role")}
            </span>
          </div>
        </div>

        {/* ANTTIME SWAP - CONTENTS */}
        <div className="col-span-full md:col-start-4 md:col-end-9">
          <SubBox borderTop={false}>
            <div className="col-span-full translate-y-1.5 px-5 font-semibold md:col-span-1 md:px-0">
              1.
            </div>
            <div className="col-span-full px-5 md:col-span-4 md:px-0">
              <Title className="mb-16 md:mb-6">
                {t("anttimeSwap.1.title")}
              </Title>

              <OrderedList order={"a."} className="mb-2">
                {t("anttimeSwap.1.a")}
              </OrderedList>

              <Divider />

              <OrderedList order={"b."} className="mb-2">
                {t("anttimeSwap.1.b")}
              </OrderedList>

              <Divider />

              <OrderedList order={"c."}>{t("anttimeSwap.1.c")}</OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-full translate-y-1.5 px-5 font-semibold md:col-span-1 md:px-0">
              2.
            </div>
            <div className="col-span-full px-5 md:col-span-4 md:px-0">
              <Title className="mb-16 md:mb-6">
                {t("anttimeSwap.2.title")}
              </Title>

              <OrderedList order={"a."} className="mb-2">
                {t("anttimeSwap.2.a")}
              </OrderedList>

              <Divider />

              <OrderedList order={"b."}>{t("anttimeSwap.2.b")}</OrderedList>

              <Divider />

              <OrderedList order={"c."}>{t("anttimeSwap.2.c")}</OrderedList>

              <Divider />

              <OrderedList order={"d."}>{t("anttimeSwap.2.d")}</OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-full translate-y-1.5 px-5 font-semibold md:col-span-1 md:px-0">
              3.
            </div>
            <div className="col-span-full px-5 md:col-span-4 md:px-0">
              <Title className="mb-16 md:mb-6">
                {t("anttimeSwap.3.title")}
              </Title>

              <OrderedList order={"a."} className="mb-2">
                {t("anttimeSwap.3.a")}
              </OrderedList>

              <Divider />

              <OrderedList order={"b."} className="mb-2">
                {t("anttimeSwap.3.b")}
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-full translate-y-1.5 px-5 font-semibold md:col-span-1 md:px-0">
              4.
            </div>
            <div className="col-span-full px-5 md:col-span-4 md:px-0">
              <Title className="mb-16 md:mb-6">
                {t("anttimeSwap.4.title")}
              </Title>

              <OrderedList order={"a."}>{t("anttimeSwap.4.a")}</OrderedList>
            </div>
          </SubBox>
        </div>
      </SectionBox>

      {/* ANTTIME APP */}

      <SectionBox animated={false} className="fade-in-mount">
        {/* ANTTIME APP - TITLE */}
        <div className="sticky top-20 col-span-full mb-10 mt-8 flex h-fit flex-col px-5 font-semibold md:col-span-3 md:mb-44 md:px-0">
          <span className="mb-4 h-fit w-fit rounded-sm border border-gray-700 px-2 py-1 text-xs">
            {t("anttimeSwap.tag")}
          </span>
          <span className="mb-2">{t("anttimeApp.desc")}</span>
          <div className="mb-4 flex flex-col text-6xl">
            <span className="mb-2">ANTTIME</span>
            <span>APP</span>
          </div>

          <div className="flex items-center gap-2 font-normal">
            <span className="text-sm font-semibold text-gray-200">
              2024.04. -
            </span>
          </div>

          <div className="mb-0.5 flex items-center gap-2 font-normal">
            <span className="text-sm text-gray-200">
              {t("anttimeSwap.projectScale")}
            </span>
            <div className="h-3 w-[1px] bg-gray-200" />
            <span className="text-sm text-gray-200">
              {t("anttimeSwap.role")}
            </span>
          </div>
        </div>

        {/* ANTTIME APP - CONTENTS */}
        <div className="col-span-full md:col-start-4 md:col-end-9">
          <SubBox borderTop={false}>
            <div className="col-span-full translate-y-1.5 px-5 font-semibold md:col-span-1 md:px-0">
              1.
            </div>
            <div className="col-span-full px-5 md:col-span-4 md:px-0">
              <Title className="mb-16 md:mb-6">{t("anttimeApp.1.title")}</Title>

              <OrderedList order={"a."}>
                <OrderedListHead>{t("anttimeApp.1.a.title")}</OrderedListHead>

                <OrderedList order={"i."} className="mb-2">
                  {t("anttimeApp.1.a.i")}
                </OrderedList>

                <OrderedList order={"ii."}>
                  {t("anttimeApp.1.a.ii")}
                </OrderedList>
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-full translate-y-1.5 px-5 font-semibold md:col-span-1 md:px-0">
              2.
            </div>
            <div className="col-span-full px-5 md:col-span-4 md:px-0">
              <Title className="mb-16 md:mb-6">{t("anttimeApp.2.title")}</Title>

              <OrderedList order={"a."}>{t("anttimeApp.2.a")}</OrderedList>

              <Divider />

              <OrderedList order={"b."}>{t("anttimeApp.2.b")}</OrderedList>

              <Divider />

              <OrderedList order={"c."}>{t("anttimeApp.2.c")}</OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-full translate-y-1.5 px-5 font-semibold md:col-span-1 md:px-0">
              3.
            </div>
            <div className="col-span-full px-5 md:col-span-4 md:px-0">
              <Title className="mb-16 md:mb-6">{t("anttimeApp.3.title")}</Title>

              <OrderedList order={"a."}>{t("anttimeApp.3.a")}</OrderedList>

              <Divider />

              <OrderedList order={"b."}>{t("anttimeApp.3.b")}</OrderedList>

              <Divider />

              <OrderedList order={"c."}>{t("anttimeApp.3.c")}</OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-full translate-y-1.5 px-5 font-semibold md:col-span-1 md:px-0">
              4.
            </div>
            <div className="col-span-full px-5 md:col-span-4 md:px-0">
              <Title className="mb-16 md:mb-6">{t("anttimeApp.4.title")}</Title>

              <OrderedList order={"a."}>
                <OrderedListHead>{t("anttimeApp.4.a.title")}</OrderedListHead>

                <OrderedList order={"i."} className="mb-2">
                  {t("anttimeApp.4.a.i")}
                </OrderedList>

                <OrderedList order={"ii."} className="mb-2">
                  {t("anttimeApp.4.a.ii")}
                </OrderedList>
              </OrderedList>

              <Divider />

              <OrderedList order={"b."}>
                <OrderedListHead>{t("anttimeApp.4.b.title")}</OrderedListHead>

                <OrderedList order={"i."} className="mb-2">
                  {t("anttimeApp.4.b.i")}
                </OrderedList>

                <OrderedList order={"ii."} className="mb-2">
                  {t("anttimeApp.4.b.ii")}
                </OrderedList>
              </OrderedList>
            </div>
          </SubBox>
        </div>
      </SectionBox>

      {/* Percent Hotel */}

      <SectionBox animated={false} className="fade-in-mount">
        {/* Percent Hotel - TITLE */}
        <div className="sticky top-20 col-span-full mb-10 mt-8 flex h-fit flex-col px-5 font-semibold md:col-span-3 md:mb-44 md:px-0">
          <div className="flex gap-3">
            <span className="mb-4 h-fit w-fit rounded-sm border border-gray-700 px-2 py-1 text-xs">
              {t("percentHotel.tag.1")}
            </span>
          </div>
          <span className="mb-2">{t("percentHotel.desc")}</span>
          <div className="mb-4 flex flex-col text-6xl">
            <span className="mb-2">Percent</span>
            <span>Hotel</span>
          </div>

          <div className="flex items-center gap-2 font-normal">
            <span className="text-sm font-semibold text-gray-200">
              2024.02.01. - 2024.02.27.
            </span>
          </div>

          <div className="mb-0.5 flex items-center gap-2 font-normal">
            <span className="text-sm text-gray-200">
              {t("percentHotel.projectScale")}
            </span>
            <div className="h-3 w-[1px] bg-gray-200" />
            <span className="text-sm text-gray-200">
              {t("percentHotel.role")}
            </span>
          </div>
        </div>

        {/* Percent Hotel - CONTENTS */}
        <div className="col-span-full md:col-start-4 md:col-end-9">
          <SubBox borderTop={false}>
            <div className="col-span-full translate-y-1.5 px-5 font-semibold md:col-span-1 md:px-0">
              1.
            </div>
            <div className="col-span-full px-5 md:col-span-4 md:px-0">
              <Title className="mb-16 md:mb-6">
                {t("percentHotel.1.title")}
              </Title>

              <OrderedList order={"a."}>
                <OrderedListHead>{t("percentHotel.1.a.title")}</OrderedListHead>

                <OrderedList order={"i."} className="mb-2">
                  {t("percentHotel.1.a.i")}
                </OrderedList>

                <OrderedList order={"ii."} className="mb-2">
                  {t("percentHotel.1.a.ii")}
                </OrderedList>

                <OrderedList order={"iii."}>
                  {t("percentHotel.1.a.iii")}
                </OrderedList>
              </OrderedList>

              <Divider />

              <OrderedList order={"a."}>
                <OrderedListHead>{t("percentHotel.1.b.title")}</OrderedListHead>

                <OrderedList order={"i."} className="mb-2">
                  {t("percentHotel.1.b.i")}
                </OrderedList>

                <OrderedList order={"ii."}>
                  {t("percentHotel.1.b.ii")}
                </OrderedList>
              </OrderedList>
            </div>
          </SubBox>

          {/* Percent Hotel - BUSINESS LOGIC */}
          <SubBox>
            <div className="col-span-full translate-y-1.5 px-5 font-semibold md:col-span-1 md:px-0">
              2.
            </div>
            <div className="col-span-full px-5 md:col-span-4 md:px-0">
              <Title className="mb-16 md:mb-6">
                {t("percentHotel.2.title")}
              </Title>

              <OrderedList order={"a."}>
                <OrderedListHead>{t("percentHotel.2.a.title")}</OrderedListHead>

                <OrderedList order={"i."}>
                  {t("percentHotel.2.a.i")}
                </OrderedList>
              </OrderedList>

              <Divider />

              <OrderedList order={"b."}>
                <OrderedListHead>{t("percentHotel.2.b.title")}</OrderedListHead>

                <OrderedList order={"i."} className="mb-2">
                  {t("percentHotel.2.b.i")}
                </OrderedList>

                <OrderedList order={"ii."}>
                  {t("percentHotel.2.b.ii")}
                </OrderedList>
              </OrderedList>
            </div>
          </SubBox>

          {/* Percent Hotel - FCM */}
          <SubBox>
            <div className="col-span-full translate-y-1.5 px-5 font-semibold md:col-span-1 md:px-0">
              3.
            </div>
            <div className="col-span-full px-5 md:col-span-4 md:px-0">
              <Title className="mb-16 md:mb-6">
                {t("percentHotel.3.title")}
              </Title>

              <OrderedList order={"a."}>{t("percentHotel.3.a")}</OrderedList>

              <Divider />

              <OrderedList order={"b."}>{t("percentHotel.3.b")}</OrderedList>

              <Divider />

              <OrderedList order={"c."}>{t("percentHotel.3.c")}</OrderedList>
            </div>
          </SubBox>

          {/* Percent Hotel - SEO */}
          <SubBox>
            <div className="col-span-full translate-y-1.5 px-5 font-semibold md:col-span-1 md:px-0">
              4.
            </div>
            <div className="col-span-full px-5 md:col-span-4 md:px-0">
              <Title className="mb-16 md:mb-6">
                {t("percentHotel.4.title")}
              </Title>

              <OrderedList order={"a."}>{t("percentHotel.4.a")}</OrderedList>

              <Divider />

              <OrderedList order={"b."}>{t("percentHotel.4.b")}</OrderedList>
            </div>
          </SubBox>

          {/* Percent Hotel - TEAM MANAGEMENT */}
          <SubBox>
            <div className="col-span-full translate-y-1.5 px-5 font-semibold md:col-span-1 md:px-0">
              5.
            </div>
            <div className="col-span-full px-5 md:col-span-4 md:px-0">
              <Title className="mb-16 md:mb-6">
                {t("percentHotel.5.title")}
              </Title>

              <OrderedList order={"a."}>{t("percentHotel.5.a")}</OrderedList>

              <Divider />

              <OrderedList order={"b."}>
                <OrderedListHead>{t("percentHotel.5.b.title")}</OrderedListHead>

                <OrderedList order={"i."}>
                  {t("percentHotel.5.b.i")}
                </OrderedList>
              </OrderedList>

              <Divider />

              <OrderedList order={"c."}>
                <OrderedListHead>{t("percentHotel.5.c.title")}</OrderedListHead>

                <OrderedList order={"i."} className="mb-2">
                  {t("percentHotel.5.c.i")}
                </OrderedList>

                <OrderedList order={"ii."} className="mb-2">
                  {t("percentHotel.5.c.ii")}
                </OrderedList>

                <OrderedList order={"iii."}>
                  {t("percentHotel.5.c.iii")}
                </OrderedList>
              </OrderedList>
            </div>
          </SubBox>
        </div>
      </SectionBox>
    </>
  );
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
