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
  CornerDownRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FaGithub } from "react-icons/fa";

import { Link } from "@/i18n/navigation";
import SectionLink from "@/components/pages/work/workDetail/sectionLink";
import { PATHNAME } from "@/constants/routes";
import { PERCENT_HOTEL_EN, PERCENT_HOTEL_KO } from "./script";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

interface TitleBadgeProps {
  children: React.ReactNode;
  className: string;
}
function TitleBadge({ children, className }: TitleBadgeProps) {
  return (
    <div
      className={cn(
        "col-span-8 w-fit animate-tada rounded-full border-2 border-black px-4 py-1 text-2xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

type List = { subtitle: string; desc: string[]; list?: List[] }[];
type ContentType = {
  title: string;
  titleDesc: string;
  image: string;

  list: List;
};
interface SectionViewProps {
  id: string;
  content: ContentType;
  order: number;
  locale: "ko" | "en";
}

function SectionView({ id, content, order, locale }: SectionViewProps) {
  return (
    <section
      id={id}
      className="mb-80 grid min-h-40 w-full grid-cols-2 gap-[1.5vw]"
    >
      {/* LEFT (TEXTS) */}
      {order % 2 === 1 ? (
        <>
          <div>
            {/* MAIN-TITLE */}
            <div
              className={cn(
                "mb-5 flex items-baseline gap-2",
                locale === "en" && "flex-col",
              )}
            >
              <h2 className="text-4xl font-semibold">{content.title}</h2>
              <h4 className="flex items-center gap-1 text-sm text-gray-400">
                {content.titleDesc}
              </h4>
            </div>

            <ul className="ml-6 mt-3 flex flex-col gap-5">
              {content.list.map((item) => {
                return (
                  <li key={item.subtitle}>
                    <div className="mb-3 font-semibold">{item.subtitle}</div>

                    <ul className="ml-6 flex flex-col gap-3 text-gray-500">
                      {item.desc.map((desc) => (
                        <li key={desc} className="flex gap-1">
                          <CornerDownRight
                            size={16}
                            className="shrink-0 translate-y-0.5"
                          />
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative min-h-96 overflow-hidden rounded-2xl bg-gray-5">
            <Image
              src={content.image}
              fill
              alt={`${content.title}_image`}
              objectFit="cover"
            />
          </div>
        </>
      ) : (
        <>
          <div className="relative min-h-96 overflow-hidden rounded-2xl bg-gray-5">
            <Image
              src={content.image}
              fill
              alt={`${content.title}_image`}
              objectFit="cover"
            />
          </div>

          <div>
            {/* MAIN-TITLE */}
            <div
              className={cn(
                "mb-5 flex items-baseline gap-2",
                locale === "en" && "flex-col",
              )}
            >
              <h2 className="text-4xl font-semibold">{content.title}</h2>
              <h4 className="flex items-center gap-1 text-sm text-gray-400">
                {content.titleDesc}
              </h4>
            </div>

            <ul className="ml-6 mt-3 flex flex-col gap-5">
              {content.list.map((item) => {
                return (
                  <li key={item.subtitle}>
                    <div className="mb-3 font-semibold">{item.subtitle}</div>

                    <ul className="ml-6 flex flex-col gap-3 text-gray-500">
                      {item.desc.map((desc) => (
                        <li key={desc} className="flex gap-1">
                          <CornerDownRight
                            size={16}
                            className="shrink-0 translate-y-0.5"
                          />
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </section>
  );
}

export default function Work() {
  const locale = useLocale() as "ko" | "en";
  const TARGET_LANGUAGE = locale === "ko" ? PERCENT_HOTEL_KO : PERCENT_HOTEL_EN;
  const CONTENT_LEFT = TARGET_LANGUAGE.left;
  const CONTENT_RIGHT = TARGET_LANGUAGE.right;
  const CONTENT_DETAIL = TARGET_LANGUAGE.details;

  return (
    <main
      className={cn(
        "flex flex-1 flex-col items-center justify-center",
        LAYOUT_PADDING_ALONGSIDE,
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
        <div className="col-span-8 text-9xl font-semibold tracking-tighter">
          Percent Hotel
        </div>

        {/* TAG */}
        <TitleBadge className="">
          {locale === "ko" ? (
            <>
              <span className="font-semibold">{CONTENT_LEFT.badge[0]}</span>{" "}
              {CONTENT_LEFT.badge[1]}{" "}
              <span className="font-bold">{CONTENT_LEFT.badge[2]}</span>
            </>
          ) : (
            <>
              {CONTENT_LEFT.badge[0]}{" "}
              <span className="font-bold">{CONTENT_LEFT.badge[1]}</span>{" "}
              {CONTENT_LEFT.badge[2]}{" "}
              <span className="font-semibold">{CONTENT_LEFT.badge[3]}</span>{" "}
              {CONTENT_LEFT.badge[4]}
            </>
          )}
        </TitleBadge>

        {/* LEFT */}
        <div className="col-span-4">
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
                    {/* REACT */}
                    <Badge variant="outline" className="bg-blue-100">
                      {CONTENT_LEFT.summary.techStack.value[0]}
                    </Badge>

                    {/* VITE */}
                    <Badge variant="outline" className="bg-yellow-100">
                      {CONTENT_LEFT.summary.techStack.value[1]}
                    </Badge>

                    {/* ZUSTAND */}
                    <Badge variant="outline" className="bg-rose-100">
                      {CONTENT_LEFT.summary.techStack.value[2]}
                    </Badge>

                    {/* STYLED COMPONENTS */}
                    <Badge variant="outline" className="bg-pink-100">
                      {CONTENT_LEFT.summary.techStack.value[3]}
                    </Badge>

                    {/* PWA */}
                    <Badge variant="outline" className="">
                      {CONTENT_LEFT.summary.techStack.value[4]}
                    </Badge>

                    {/* FCM */}
                    <Badge variant="outline" className="bg-red-50">
                      {CONTENT_LEFT.summary.techStack.value[5]}
                    </Badge>

                    {/* GITHUB ACTION */}
                    <Badge variant="outline" className="bg-slate-100">
                      {CONTENT_LEFT.summary.techStack.value[6]}
                    </Badge>

                    {/* MSW */}
                    <Badge variant="outline" className="bg-neutral-100">
                      {CONTENT_LEFT.summary.techStack.value[7]}
                    </Badge>
                  </div>
                </div>
              </span>
            </Summary.Block>

            <Summary.Block
              icon={<UsersRound size={16} />}
              title={CONTENT_LEFT.summary.team.label}
            >
              <div className="flex flex-1">
                <div className="flex-1">
                  <div className="text-xs text-gray-400">
                    {CONTENT_LEFT.summary.team.value[0].role}
                  </div>
                  <div className="font-semibold">
                    {CONTENT_LEFT.summary.team.value[0].amount}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-400">
                    {CONTENT_LEFT.summary.team.value[1].role}
                  </div>
                  <div className="font-semibold">
                    {CONTENT_LEFT.summary.team.value[1].amount}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-400">
                    {CONTENT_LEFT.summary.team.value[2].role}
                  </div>
                  <div className="font-semibold">
                    {CONTENT_LEFT.summary.team.value[2].amount}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-400">
                    {CONTENT_LEFT.summary.team.value[3].role}
                  </div>
                  <div className="font-semibold">
                    {CONTENT_LEFT.summary.team.value[3].amount}
                  </div>
                </div>
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
                <Link
                  target="_blank"
                  href={CONTENT_LEFT.summary.relatedLink.value[1].value}
                  className="flex-1 transition-all hover:scale-[102%] hover:opacity-80"
                >
                  <div className="text-xs text-gray-400">
                    {CONTENT_LEFT.summary.relatedLink.value[1].name}
                  </div>
                  <div className="mt-1 font-semibold">
                    <FaGithub size={16} />
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
                  id: "qwerty029369\n@naver.com",
                  passwordTitle:
                    CONTENT_LEFT.summary.relatedLink.testServiceAccount
                      .password,
                  password: "qwerty123@",
                }}
                breakId
              />
            </Summary.Block>
          </Summary>
        </div>

        {/* RIGHT */}
        <div className="col-span-4">
          <div className="mb-3 text-4xl font-medium">{CONTENT_RIGHT.title}</div>
          <div className="mb-10">{CONTENT_RIGHT.desc}</div>

          {/* 맡은 역할 */}
          <div className="mb-3 text-2xl font-medium">
            {CONTENT_RIGHT.navigation.title}
          </div>
          <div className="flex flex-col gap-2">
            <SectionLink
              href={`#${CONTENT_RIGHT.navigation.value[0].href}`}
              title={CONTENT_RIGHT.navigation.value[0].title}
              desc={CONTENT_RIGHT.navigation.value[0].desc}
            />

            <SectionLink
              href={`#${CONTENT_RIGHT.navigation.value[1].href}`}
              title={CONTENT_RIGHT.navigation.value[1].title}
              desc={CONTENT_RIGHT.navigation.value[1].desc}
            />

            <SectionLink
              href={`#${CONTENT_RIGHT.navigation.value[2].href}`}
              title={CONTENT_RIGHT.navigation.value[2].title}
              desc={CONTENT_RIGHT.navigation.value[2].desc}
            />

            <SectionLink
              href={`#${CONTENT_RIGHT.navigation.value[3].href}`}
              title={CONTENT_RIGHT.navigation.value[3].title}
              desc={CONTENT_RIGHT.navigation.value[3].desc}
            />

            <SectionLink
              href={`#${CONTENT_RIGHT.navigation.value[4].href}`}
              title={CONTENT_RIGHT.navigation.value[4].title}
              desc={CONTENT_RIGHT.navigation.value[4].desc}
            />
          </div>
        </div>
      </section>

      {/* BackgroundImage */}
      <div className="mt-10 grid h-[600px] w-screen grid-cols-8 gap-[1.5vw] bg-gray-10" />

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
      <div className="flex w-full flex-col items-center justify-center border-t pt-10">
        <span className="text-2xl font-medium text-gray-400">
          Thanks for Reading
        </span>
        <Link
          className="group relative z-10 col-span-4 flex translate-y-4 items-center gap-2 text-gray-200 transition-all hover:text-gray-500"
          href={PATHNAME.WORK}
        >
          <ArrowLeft size={14} className="group-hover:animate-arrow-back" />
          <span>{TARGET_LANGUAGE.backToList}</span>
        </Link>
      </div>
    </main>
  );
}
