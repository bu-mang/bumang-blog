import type { WorkDetailConfig } from "@/types/work";
import bannerImage from "@/assets/works/compressed/seaPearl.webp";

const SEA_PEARL_KO = {
  backToList: "목록으로 돌아가기",
  left: {
    badge: ["텔레그램 미니앱", "탭게임"],
    summary: {
      title: "프로젝트 요약",
      period: {
        label: "담당 시작일",
        value: "24.12.15.",
      },
      position: {
        label: "포지션",
        value: "프론트엔드 (텔레그램 웹뷰 미니앱 개발)",
      },
      techStack: {
        label: "테크스택",
        value: [
          { label: "React", colorClass: "bg-blue-100" },
          { label: "Vite", colorClass: "bg-yellow-100" },
          { label: "Zustand", colorClass: "bg-rose-100" },
          { label: "Telegram API", colorClass: "bg-neutral-100" },
          { label: "Tailwind", colorClass: "bg-blue-50" },
          { label: "React-Virtuoso", colorClass: "bg-emerald-100" },
          { label: "Suspensive", colorClass: "bg-slate-100" },
        ],
      },
      team: {
        label: "팀 구성",
        value: [
          { role: "프론트", amount: 1 },
          { role: "백엔드", amount: 1 },
          { role: "PM", amount: 1 },
          { role: "디자인", amount: 1 },
        ],
      },
      relatedLink: {
        label: "관련링크",
        value: [
          {
            name: "서비스",
            value: "https://t.me/sea_pearl_game_bot?start=hhuvfp7ea85T99ald3hv",
            icon: "link" as const,
          },
        ],
      },
    },
  },
  right: {
    title: "이번 주 래플 당첨자는...",
    desc: "Sea Pearl을 플레이하고 귀여운 수달 캐릭터로 펄을 수집하세요. 모은 펄들로 로터리를 응모하세요. 펄이 많이 있을수록 많은 복권을 구매할 수 있어요. 주간 래플에서 다음 USDT 당첨자가 되어보세요!",
  },
};

const SEA_PEARL_EN = {
  backToList: "Back to List",
  left: {
    badge: ["Telegram Mini App", "Tap Game"],
    summary: {
      title: "Project Summary",
      period: {
        label: "Start Date",
        value: "24.12.15.",
      },
      position: {
        label: "Position",
        value: "Frontend (Telegram WebView Mini App Development)",
      },
      techStack: {
        label: "Tech Stack",
        value: [
          { label: "React", colorClass: "bg-blue-100" },
          { label: "Vite", colorClass: "bg-yellow-100" },
          { label: "Zustand", colorClass: "bg-rose-100" },
          { label: "Telegram API", colorClass: "bg-neutral-100" },
          { label: "Tailwind", colorClass: "bg-blue-50" },
          { label: "React-Virtuoso", colorClass: "" },
          { label: "Suspensive", colorClass: "bg-slate-100" },
        ],
      },
      team: {
        label: "Team Composition",
        value: [
          { role: "Frontend", amount: 1 },
          { role: "Backend", amount: 1 },
          { role: "PM", amount: 1 },
          { role: "Design", amount: 1 },
        ],
      },
      relatedLink: {
        label: "Related Links",
        value: [
          {
            name: "Service",
            value: "https://t.me/sea_pearl_game_bot?start=hhuvfp7ea85T99ald3hv",
            icon: "link" as const,
          },
        ],
      },
    },
  },
  right: {
    title: "This week's raffle winner is...",
    desc: "Play Sea Pearl and collect pearls with the cute otter character. Enter the lottery with your collected pearls. The more pearls you have, the more tickets you can purchase. Become the next USDT winner in the weekly raffle!",
  },
};

export const SEA_PEARL_CONFIG: WorkDetailConfig = {
  title: "SEA PEARL",
  bannerImage,
  content: {
    ko: SEA_PEARL_KO,
    en: SEA_PEARL_EN,
  },
};
