"use client";

import { useTranslations } from "next-intl";
// import { Link } from "@/i18n/navigation";
import { SectionBox, SubBox } from "../about/aboutSection";
import WorkItem from "./workItem";
import { cn } from "@/utils/cn";

const WorkLists = [];
interface Work {
  title: string;
  href: string;
  backgroundSrc: string;
  imageAlt: string;
}

export function WorkInnerInteractive() {
  return (
    <>
      {/* 마진용 */}
      <WorkItem nullItem imgSrc="" imgAlt=""></WorkItem>

      <WorkItem onClick={() => {}} imgSrc="/works/bumangRoute53.png" imgAlt="">
        <div className="absolute -left-10 -top-10 flex h-20 w-20 items-center justify-center rounded-full bg-red-500">
          test
        </div>
      </WorkItem>

      <WorkItem
        onClick={() => {}}
        imgSrc="/works/seaPearl.png"
        imgAlt=""
        href="/"
      />
      <WorkItem
        onClick={() => {}}
        imgSrc="/works/anttimeSwap.png"
        imgAlt=""
        href="/"
      />
      <WorkItem
        onClick={() => {}}
        imgSrc="/works/anttimeApp.png"
        imgAlt=""
        href="/"
      />
      <WorkItem
        onClick={() => {}}
        imgSrc="/works/percentHotel.png"
        imgAlt=""
        href="/"
      />
    </>
  );
}

export function WorkInnerCompact() {
  const t = useTranslations("work");
  return (
    <>
      {/* BUMANG BLOG */}
      <SectionBox animated={false} className="fade-in-mount" borderTop={false}>
        {/* TITLE */}
        <div className="sticky top-20 col-span-3 mb-44 mt-8 flex h-fit flex-col font-semibold">
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
        <div className="col-start-4 col-end-9">
          <SubBox borderTop={false}>
            <div className="col-span-1 translate-y-1.5 font-semibold">1.</div>
            <div className="col-span-4">
              <Title>{t("bumangRoute53.1.title")}</Title>

              <OrderedList order={"a."} className="mb-2">
                {t("bumangRoute53.1.a")}
              </OrderedList>

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
            <div className="col-span-1 translate-y-1.5 font-semibold">2.</div>
            <div className="col-span-4">
              <Title>{t("bumangRoute53.2.title")}</Title>

              <OrderedList order={"a."} className="mb-2">
                <OrderedListHead>
                  {t("bumangRoute53.2.a.title")}
                </OrderedListHead>

                <OrderedList order={"i."} className="mb-2">
                  {t("bumangRoute53.2.a.i")}
                </OrderedList>
              </OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">3.</div>
            <div className="col-span-4">
              <Title>{t("bumangRoute53.3.title")}</Title>

              <OrderedList order={"a."}>{t("bumangRoute53.3.a")}</OrderedList>

              <Divider />

              <OrderedList order={"b."}>{t("bumangRoute53.3.b")}</OrderedList>

              <Divider />

              <OrderedList order={"c."}>{t("bumangRoute53.3.c")}</OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">4.</div>
            <div className="col-span-4">
              <Title>{t("bumangRoute53.4")}</Title>
            </div>
          </SubBox>
        </div>
      </SectionBox>

      {/* SEA PEARL */}
      <SectionBox animated={false} className="fade-in-mount">
        {/* SEA PEARL - TITLE */}
        <div className="sticky top-20 col-span-3 mb-44 mt-8 flex h-fit flex-col font-semibold">
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
        <div className="col-start-4 col-end-9">
          <SubBox borderTop={false}>
            <div className="col-span-1 translate-y-1.5 font-semibold">1.</div>
            <div className="col-span-4">
              <Title>{t("seaPearl.1.title")}</Title>

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
            <div className="col-span-1 translate-y-1.5 font-semibold">2.</div>
            <div className="col-span-4">
              <Title>{t("seaPearl.2.title")}</Title>

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
            <div className="col-span-1 translate-y-1.5 font-semibold">3.</div>
            <div className="col-span-4">
              <Title>{t("seaPearl.3.title")}</Title>

              <OrderedList order={"a."}>{t("seaPearl.3.a")}</OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">4.</div>
            <div className="col-span-4">
              <Title>{t("seaPearl.4.title")}</Title>

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
            <div className="col-span-1 translate-y-1.5 font-semibold">5.</div>
            <div className="col-span-4">
              <Title>{t("seaPearl.5.title")}</Title>

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
        <div className="sticky top-20 col-span-3 mb-44 mt-8 flex h-fit flex-col font-semibold">
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
        <div className="col-start-4 col-end-9">
          <SubBox borderTop={false}>
            <div className="col-span-1 translate-y-1.5 font-semibold">1.</div>
            <div className="col-span-4">
              <Title>{t("anttimeSwap.1.title")}</Title>

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
            <div className="col-span-1 translate-y-1.5 font-semibold">2.</div>
            <div className="col-span-4">
              <Title>{t("anttimeSwap.2.title")}</Title>

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
            <div className="col-span-1 translate-y-1.5 font-semibold">3.</div>
            <div className="col-span-4">
              <Title>{t("anttimeSwap.3.title")}</Title>

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
            <div className="col-span-1 translate-y-1.5 font-semibold">4.</div>
            <div className="col-span-4">
              <Title>{t("anttimeSwap.4.title")}</Title>

              <OrderedList order={"a."}>{t("anttimeSwap.4.a")}</OrderedList>
            </div>
          </SubBox>
        </div>
      </SectionBox>

      {/* ANTTIME APP */}

      <SectionBox animated={false} className="fade-in-mount">
        {/* ANTTIME APP - TITLE */}
        <div className="sticky top-20 col-span-3 mb-44 mt-8 flex h-fit flex-col font-semibold">
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
        <div className="col-start-4 col-end-9">
          <SubBox borderTop={false}>
            <div className="col-span-1 translate-y-1.5 font-semibold">1.</div>
            <div className="col-span-4">
              <Title>{t("anttimeApp.1.title")}</Title>

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
            <div className="col-span-1 translate-y-1.5 font-semibold">2.</div>
            <div className="col-span-4">
              <Title>{t("anttimeApp.2.title")}</Title>

              <OrderedList order={"a."}>{t("anttimeApp.2.a")}</OrderedList>

              <Divider />

              <OrderedList order={"b."}>{t("anttimeApp.2.b")}</OrderedList>

              <Divider />

              <OrderedList order={"c."}>{t("anttimeApp.2.c")}</OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">3.</div>
            <div className="col-span-4">
              <Title>{t("anttimeApp.3.title")}</Title>

              <OrderedList order={"a."}>{t("anttimeApp.3.a")}</OrderedList>

              <Divider />

              <OrderedList order={"b."}>{t("anttimeApp.3.b")}</OrderedList>

              <Divider />

              <OrderedList order={"c."}>{t("anttimeApp.3.c")}</OrderedList>
            </div>
          </SubBox>

          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">4.</div>
            <div className="col-span-4">
              <Title>{t("anttimeApp.4.title")}</Title>

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
        <div className="sticky top-20 col-span-3 mb-44 mt-8 flex h-fit flex-col font-semibold">
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
        <div className="col-start-4 col-end-9">
          <SubBox borderTop={false}>
            <div className="col-span-1 translate-y-1.5 font-semibold">1.</div>
            <div className="col-span-4">
              <Title>{t("percentHotel.1.title")}</Title>

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
            <div className="col-span-1 translate-y-1.5 font-semibold">2.</div>
            <div className="col-span-4">
              <Title>{t("percentHotel.2.title")}</Title>

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
            <div className="col-span-1 translate-y-1.5 font-semibold">3.</div>
            <div className="col-span-4">
              <Title>{t("percentHotel.3.title")}</Title>

              <OrderedList order={"a."}>{t("percentHotel.3.a")}</OrderedList>

              <Divider />

              <OrderedList order={"b."}>{t("percentHotel.3.b")}</OrderedList>

              <Divider />

              <OrderedList order={"c."}>{t("percentHotel.3.c")}</OrderedList>
            </div>
          </SubBox>

          {/* Percent Hotel - SEO */}
          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">4.</div>
            <div className="col-span-4">
              <Title>{t("percentHotel.4.title")}</Title>

              <OrderedList order={"a."}>{t("percentHotel.4.a")}</OrderedList>

              <Divider />

              <OrderedList order={"b."}>{t("percentHotel.4.b")}</OrderedList>
            </div>
          </SubBox>

          {/* Percent Hotel - TEAM MANAGEMENT */}
          <SubBox>
            <div className="col-span-1 translate-y-1.5 font-semibold">5.</div>
            <div className="col-span-4">
              <Title>{t("percentHotel.5.title")}</Title>

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
