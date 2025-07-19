"use client";

import Summary from "@/components/pages/work/workDetail/summary";
import { LAYOUT_PADDING_ALONGSIDE } from "@/constants/layouts/layout";
import { cn } from "@/utils/cn";
import {
  BadgeCheckIcon,
  CalendarRange,
  Link as LinkIcon,
  Link2,
  LocateFixed,
  UsersRound,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FaGithub } from "react-icons/fa";

import { Link } from "@/i18n/navigation";
import SectionLink from "@/components/pages/work/workDetail/sectionLink";

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

export default function Work() {
  const SECTION_MAIN_PAGE = "SECTION_MAIN_PAGE";
  const SECTION_SELLER_REGISTER_PAGE = "SECTION_SELLER_REGISTER_PAGE";
  const SECTION_PUSH_NOTIFICATION_PAGE = "SECTION_PUSH_NOTIFICATION_PAGE";
  const SECTION_SEO = "SECTION_SEO";
  const SECTION_TEAM_LEADER = "SECTION_TEAM_LEADER";

  return (
    <main
      className={cn(
        "flex flex-1 flex-col items-center justify-center",
        LAYOUT_PADDING_ALONGSIDE,
      )}
    >
      <section className="grid w-full grid-cols-8 gap-[1.5vw]">
        {/* TITLE */}
        <div className="col-span-8 text-9xl font-semibold tracking-tighter">
          Percent Hotel
        </div>

        {/* TAG */}
        <TitleBadge className="">
          Total <span className="font-bold">2nd</span> in{" "}
          <span className="font-semibold">Yanolja Tech School</span> Graduate
        </TitleBadge>

        {/* LEFT */}
        <div className="col-span-4">
          {/* SUMMARY */}
          <Summary>
            <Summary.Block icon={<CalendarRange size={16} />} title="Period">
              <span>24.02.02. - 24.02.27.</span>
            </Summary.Block>

            <Summary.Block icon={<LocateFixed size={16} />} title="Position">
              <Badge variant="outline">Frontend</Badge>
            </Summary.Block>

            <Summary.Block icon={<Wrench size={16} />} title="Tech Stack">
              <span>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex w-full flex-wrap gap-2">
                    <Badge variant="outline" className="bg-blue-100">
                      React
                    </Badge>

                    <Badge variant="outline" className="bg-yellow-100">
                      Vite
                    </Badge>

                    <Badge variant="outline" className="bg-rose-100">
                      Zustand
                    </Badge>

                    <Badge variant="outline" className="bg-pink-100">
                      Styled Components
                    </Badge>

                    <Badge variant="outline" className="">
                      PWA
                    </Badge>

                    <Badge variant="outline" className="bg-red-50">
                      Firebase Cloud Message(FCM)
                    </Badge>

                    <Badge variant="outline" className="bg-slate-100">
                      Github Action
                    </Badge>

                    <Badge variant="outline" className="bg-neutral-100">
                      MSW
                    </Badge>
                  </div>
                </div>
              </span>
            </Summary.Block>

            <Summary.Block icon={<UsersRound size={16} />} title="Team">
              <div className="flex flex-1">
                <div className="flex-1">
                  <div className="text-xs text-gray-400">Front</div>
                  <div className="font-semibold">5</div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-400">Back</div>
                  <div className="font-semibold">5</div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-400">PM</div>
                  <div className="font-semibold">4</div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-400">Design</div>
                  <div className="font-semibold">1</div>
                </div>
              </div>
            </Summary.Block>

            <Summary.Block icon={<LinkIcon size={16} />} title="Related Links">
              <div className="flex flex-1">
                <Link
                  target="_blank"
                  href="https://percenthotel.web.app/"
                  className="flex-1 transition-all hover:scale-[102%] hover:opacity-80"
                >
                  <div className="text-xs text-gray-400">Service</div>
                  <div className="mt-1 font-semibold">
                    <Link2 size={16} />
                  </div>
                </Link>
                <Link
                  target="_blank"
                  href="https://github.com/SCBJ-7/SCBJ-FE"
                  className="flex-1 transition-all hover:scale-[102%] hover:opacity-80"
                >
                  <div className="text-xs text-gray-400">Github</div>
                  <div className="mt-1 font-semibold">
                    <FaGithub size={16} />
                  </div>
                </Link>
              </div>

              <Summary.Hint
                testAccount={{
                  id: "qwerty029369\n@naver.com",
                  password: "qwerty123@",
                }}
                breakId
              />
            </Summary.Block>
          </Summary>
        </div>

        {/* RIGHT */}
        <div className="col-span-4">
          <div className="mb-3 text-4xl font-medium">
            취소불가능한 매물을 양도 거래하세요!
          </div>
          <div className="mb-10">
            숙박 매물의 당근마켓! 야놀자에서 정식 인증된 매물만을 거래하세요.
            숙박 매물의 당근마켓! 야놀자에서 정식 인증된 매물만을 거래하세요.
            숙박 매물의 당근마켓! 야놀자에서 정식 인증된 매물만을 거래하세요.
          </div>

          {/* 맡은 역할 */}
          <div className="mb-3 text-2xl font-medium">맡은 역할</div>
          <div className="flex flex-col gap-2">
            <SectionLink
              href={`#${SECTION_MAIN_PAGE}`}
              title="메인페이지"
              desc="자체 캐로셀 개발"
            />

            <SectionLink
              href={`#${SECTION_SELLER_REGISTER_PAGE}`}
              title="판매글 작성 페이지"
              desc="복잡한 비즈니스로직 예외처리"
            />

            <SectionLink
              href={`#${SECTION_PUSH_NOTIFICATION_PAGE}`}
              title="알림 페이지"
              desc="FCM 알림 구현하기"
            />

            <SectionLink
              href={`#${SECTION_SEO}`}
              title="리액트 SEO 최적화"
              desc="LightHouse SEO 점수 77점에서 100점으로"
            />

            <SectionLink
              href={`#${SECTION_TEAM_LEADER}`}
              title="프론트엔드 팀장" //
              desc="팀 운영"
            />
          </div>
        </div>
      </section>

      {/* BackgroundImage */}
      <div className="mt-10 grid h-[600px] w-screen grid-cols-8 gap-[1.5vw] bg-gray-10" />

      {/* Sections */}
      <div>
        <section id={SECTION_MAIN_PAGE} className="h-[200px]">
          가
        </section>

        <section id={SECTION_SELLER_REGISTER_PAGE} className="h-[200px]">
          나
        </section>

        <section id={SECTION_PUSH_NOTIFICATION_PAGE} className="h-[200px]">
          다
        </section>

        <section id={SECTION_SEO} className="h-[200px]">
          라
        </section>

        <section id={SECTION_TEAM_LEADER} className="h-[200px]">
          마
        </section>
      </div>
    </main>
  );
}
