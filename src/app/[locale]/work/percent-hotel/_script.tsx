import type { WorkDetailConfig } from "@/types/work";
import bannerImage from "@/assets/works/compressed/percentHotel.webp";

const PERCENT_HOTEL_KO = {
  backToList: "목록으로 돌아가기",
  left: {
    badge: ["야놀자 테크 스쿨", "파이널 프로젝트", "종합 2위"],
    badgeStyles: ["semibold" as const, "normal" as const, "bold" as const],
    summary: {
      title: "프로젝트 요약",
      period: {
        label: "작업기간",
        value: "24.02.02. - 24.02.27.",
      },
      position: {
        label: "포지션",
        value: "프론트엔드",
      },
      techStack: {
        label: "테크스택",
        value: [
          { label: "React", colorClass: "bg-blue-100" },
          { label: "Vite", colorClass: "bg-yellow-100" },
          { label: "Zustand", colorClass: "bg-rose-100" },
          { label: "Styled Components", colorClass: "bg-pink-100" },
          { label: "PWA", colorClass: "bg-emerald-100" },
          { label: "Firebase Cloud Message(FCM)", colorClass: "bg-red-50" },
          { label: "Github Action", colorClass: "bg-slate-100" },
          { label: "MSW", colorClass: "bg-neutral-100" },
        ],
      },
      team: {
        label: "팀 구성",
        value: [
          { role: "프론트", amount: 5 },
          { role: "백엔드", amount: 5 },
          { role: "PM", amount: 4 },
          { role: "디자인", amount: 1 },
        ],
      },
      relatedLink: {
        label: "관련링크",
        value: [
          {
            name: "서비스",
            value: "https://percenthotel.web.app/",
            icon: "link" as const,
          },
          {
            name: "깃허브",
            value: "https://github.com/SCBJ-7/SCBJ-FE",
            icon: "github" as const,
          },
        ],
        testServiceAccount: {
          title: "테스트용 계정",
          email: "이메일",
          password: "비밀번호",
          idValue: "qwerty029369\n@naver.com",
          passwordValue: "qwerty123@",
        },
      },
    },
  },
  right: {
    title: "취소불가능한 매물을 양도 거래하세요!",
    desc: "이번 연휴에 가기로 한 여행.. 취소되셨다구요? 심지어 취소도 안 된다니.. 이럴 땐 퍼센트 호텔에서 경매에 붙이세요. 숙박 매물의 당근마켓! 사기매물과 과도한 리셀 프리미엄으로 인해 신뢰도가 낮았던 숙소 양도거래를 혁신합니다. 국내 최대 숙박 플랫폼 야놀자에서 인증된 상품만 취급하는 안전한 숙소 중고거래 플랫폼입니다.",
  },
};

const PERCENT_HOTEL_EN = {
  backToList: "Back to List",
  left: {
    badge: ["Total", "2nd", "in", "Yanolja Tech School", "Graduate"],
    badgeStyles: [
      "normal" as const,
      "bold" as const,
      "normal" as const,
      "semibold" as const,
      "normal" as const,
    ],
    summary: {
      title: "Summary",
      period: {
        label: "Period",
        value: "24.02.02. - 24.02.27.",
      },
      position: {
        label: "Position",
        value: "Frontend",
      },
      techStack: {
        label: "Tech Stack",
        value: [
          { label: "React", colorClass: "bg-blue-100" },
          { label: "Vite", colorClass: "bg-yellow-100" },
          { label: "Zustand", colorClass: "bg-rose-100" },
          { label: "Styled Components", colorClass: "bg-pink-100" },
          { label: "PWA", colorClass: "" },
          { label: "Firebase Cloud Message(FCM)", colorClass: "bg-red-50" },
          { label: "Github Action", colorClass: "bg-slate-100" },
          { label: "MSW", colorClass: "bg-neutral-100" },
        ],
      },
      team: {
        label: "Team",
        value: [
          { role: "Front", amount: 5 },
          { role: "Back", amount: 5 },
          { role: "PM", amount: 4 },
          { role: "Design", amount: 1 },
        ],
      },
      relatedLink: {
        label: "Related Links",
        value: [
          {
            name: "Service",
            value: "https://percenthotel.web.app/",
            icon: "link" as const,
          },
          {
            name: "Github",
            value: "https://github.com/SCBJ-7/SCBJ-FE",
            icon: "github" as const,
          },
        ],
        testServiceAccount: {
          title: "Test Service Account",
          email: "Email",
          password: "Password",
          idValue: "qwerty029369\n@naver.com",
          passwordValue: "qwerty123@",
        },
      },
    },
  },
  right: {
    title: "Trade non-refundable accommodations!",
    desc: "Your vacation planned for this holiday... got cancelled? And you can't even cancel it? In times like this, put it up for auction on Percent Hotel. The Carrot Market for accommodations! We revolutionize accommodation transfer transactions that had low credibility due to fraudulent listings and excessive resale premiums. This is a safe accommodation resale platform that only handles products verified by Yanolja, Korea's largest accommodation platform.",
  },
};

export const PERCENT_HOTEL_CONFIG: WorkDetailConfig = {
  title: "Percent Hotel",
  bannerImage,
  content: {
    ko: PERCENT_HOTEL_KO,
    en: PERCENT_HOTEL_EN,
  },
};
