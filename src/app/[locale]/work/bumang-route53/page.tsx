"use client";

import Summary from "@/components/pages/work/workDetail/summary";
import { LAYOUT_PADDING_ALONGSIDE } from "@/constants/layouts/layout";
import { cn } from "@/utils/cn";
import {
  CalendarRange,
  Link as LinkIcon,
  Link2,
  LocateFixed,
  UsersRound,
  Wrench,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Link } from "@/i18n/navigation";
import SectionLink from "@/components/pages/work/workDetail/sectionLink";
import { PATHNAME } from "@/constants/routes/pathnameRoutes";
import { BUMANG_ROUTE53_KO, BUMANG_ROUTE53_EN } from "./script";
import Image from "next/image";
import { useLocale } from "next-intl";
import TitleBadge from "@/components/pages/work/workDetail/titleBadge";
import SectionView from "@/components/pages/work/workDetail/sectionView";
import Title from "@/components/pages/work/workDetail/title";
import BackgroundWrapper from "@/components/pages/work/workDetail/backgroundWrapper";

import bannerImage from "@/assets/works/compressed/bumangRoute53.webp";
import BackToList from "@/components/pages/work/workDetail/backToList";

export default function AnttimeApp() {
  const locale = useLocale() as "ko" | "en";
  const TARGET_LANGUAGE =
    locale === "ko" ? BUMANG_ROUTE53_KO : BUMANG_ROUTE53_EN;
  const CONTENT_LEFT = TARGET_LANGUAGE.left;
  const CONTENT_RIGHT = TARGET_LANGUAGE.right;
  const CONTENT_DETAIL = TARGET_LANGUAGE.details;

  return (
    <main
      className={cn(
        "flex flex-1 flex-col items-center justify-center",
        "px-[2vw] md:px-[6vw]",
      )}
    >
      <section className="grid w-full grid-cols-8 gap-[1.5vw]">
        <Link
          className="group relative z-10 col-span-4 flex translate-y-4 items-center gap-2 text-gray-200 transition-all hover:text-gray-500"
          href={PATHNAME.WORK}
        >
          <ArrowLeft size={14} className="group-hover:animate-arrow-back" />
          <span>{TARGET_LANGUAGE.backToList}</span>
        </Link>

        {/* TITLE */}
        <Title>BUMANG ROUTE53</Title>

        {/* TAG */}
        <div className="col-span-full flex justify-center sm:block">
          <TitleBadge className="">
            <span>{CONTENT_LEFT.badge[0]}</span>{" "}
            <span className="font-bold">{CONTENT_LEFT.badge[1]}</span>{" "}
            <span>{CONTENT_LEFT.badge[2]}</span>
          </TitleBadge>
        </div>

        {/* LEFT */}
        <div className="col-span-full lg:col-span-4">
          {/* SUMMARY */}
          <Summary title={CONTENT_LEFT.summary.title}>
            <Summary.Block
              icon={<CalendarRange size={16} />}
              title={CONTENT_LEFT.summary.period.label}
            >
              <span>{CONTENT_LEFT.summary.period.value}</span>
            </Summary.Block>

            <Summary.Block
              icon={<LocateFixed size={16} />}
              title={CONTENT_LEFT.summary.position.label}
            >
              <Badge variant="outline">
                {CONTENT_LEFT.summary.position.value}
              </Badge>
            </Summary.Block>

            <Summary.Block
              icon={<Wrench size={16} />}
              title={CONTENT_LEFT.summary.techStack.label}
            >
              <span>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex w-full flex-wrap gap-2">
                    {CONTENT_LEFT.summary.techStack.value.map((stack) => {
                      return (
                        <Badge
                          key={stack.label}
                          variant="outline"
                          className={cn("text-black", stack.colorClass)}
                        >
                          {stack.label}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </span>
            </Summary.Block>

            <Summary.Block
              icon={<UsersRound size={16} />}
              title={CONTENT_LEFT.summary.team.label}
            >
              <div className="flex flex-1">
                {CONTENT_LEFT.summary.team.value.map((navItem) => {
                  return (
                    <div key={navItem.role} className="flex-1">
                      <div className="text-xs text-gray-400">
                        {navItem.role}
                      </div>
                      <div className="font-semibold">{navItem.amount}</div>
                    </div>
                  );
                })}
              </div>
            </Summary.Block>

            <Summary.Block
              icon={<LinkIcon size={16} />}
              title={CONTENT_LEFT.summary.relatedLink.label}
            >
              <div className="flex flex-1">
                <Link
                  target="_blank"
                  href={CONTENT_LEFT.summary.relatedLink.value[0].value}
                  className="flex-1 transition-all hover:scale-[102%] hover:opacity-80"
                >
                  <div className="text-xs text-gray-400">
                    {CONTENT_LEFT.summary.relatedLink.value[0].name}
                  </div>
                  <div className="mt-1 font-semibold">
                    <Link2 size={16} />
                  </div>
                </Link>
              </div>

              <Summary.Hint
                title={
                  CONTENT_LEFT.summary.relatedLink.testServiceAccount.title
                }
                testAccount={{
                  idTitle:
                    CONTENT_LEFT.summary.relatedLink.testServiceAccount.email,
                  id: "blog_user\n@gmail.com",
                  passwordTitle:
                    CONTENT_LEFT.summary.relatedLink.testServiceAccount
                      .password,
                  password: "itsniceday250710",
                }}
                breakId
              />
            </Summary.Block>
          </Summary>
        </div>

        {/* RIGHT */}
        <div className="col-span-full lg:col-span-4">
          <div className="mb-3 text-4xl font-medium">{CONTENT_RIGHT.title}</div>
          <div className="mb-10 leading-loose">{CONTENT_RIGHT.desc}</div>

          {/* 맡은 역할 */}
          <div className="mb-3 text-2xl font-medium">
            {CONTENT_RIGHT.navigation.title}
          </div>
          <div className="flex flex-col gap-2">
            {CONTENT_RIGHT.navigation.value.map((item) => {
              return (
                <SectionLink
                  key={item.title}
                  href={`#${item.href}`}
                  title={item.title}
                  desc={item.desc}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* BackgroundImage */}
      <BackgroundWrapper>
        <Image
          src={bannerImage}
          alt="work_section_background_image"
          fill
          objectFit="cover"
          placeholder="blur"
        />
      </BackgroundWrapper>

      {/* Sections */}
      <div className="mt-20 w-full">
        {CONTENT_DETAIL.map((item, index) => (
          <SectionView
            key={item.id}
            id={item.id}
            content={item}
            order={index + 1}
            locale={locale}
          />
        ))}
      </div>

      {/* TODO: RELATED WORKS */}
      <BackToList
        href={PATHNAME.WORK}
        backToListLabel={TARGET_LANGUAGE.backToList}
      />
    </main>
  );
}
