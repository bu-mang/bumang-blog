import type { WorkDetailConfig } from "@/types/work";
import bannerImage from "@/assets/works/compressed/anttimeSwap.webp";

const ANTTIME_SWAP_KO = {
  backToList: "목록으로 돌아가기",
  left: {
    badge: ["포인트 토큰 교환", "에어드롭", "플랫폼"],
    summary: {
      title: "프로젝트 요약",
      period: {
        label: "담당 시작일",
        value: "2024.06. -",
      },
      position: {
        label: "포지션",
        value: "프론트엔드",
      },
      techStack: {
        label: "테크스택",
        value: [
          { label: "Next.js", colorClass: "bg-gray-10" },
          { label: "Tailwind", colorClass: "bg-blue-50" },
          { label: "WAGMI", colorClass: "bg-emerald-50" },
          { label: "Gsap", colorClass: "bg-green-50" },
          { label: "Zustand", colorClass: "bg-rose-100" },
          { label: "Tanstack Query", colorClass: "bg-orange-50" },
          { label: "Github Action", colorClass: "bg-slate-100" },
          { label: "Firebase Auth", colorClass: "bg-yellow-100" },
          { label: "Firebase Hosting", colorClass: "bg-yellow-100" },
          { label: "Suspensive", colorClass: "bg-blue-50" },
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
            name: "공식",
            value: "https://anttime-exchange.web.app/",
            icon: "link" as const,
          },
        ],
      },
    },
  },
  right: {
    title: "Time 2 TokenSwap!",
    desc: "ANTTIME에서 쌓은 타임포인트를 ANT TOKEN으로 전환하세요. 토큰 전환량은 커뮤니티 기여도(채굴시간, 친구 초대 수) 및 어뷰징 여부를 반영하여 계산합니다. 내 점수를 조회해서 토큰 전환을 얼마할지 정해보세요.",
  },
};

const ANTTIME_SWAP_EN = {
  backToList: "Back to List",
  left: {
    badge: ["Point Token Exchange", "Airdrop", "Platform"],
    summary: {
      title: "Project Summary",
      period: {
        label: "Start Date",
        value: "2024.06. -",
      },
      position: {
        label: "Position",
        value: "Frontend",
      },
      techStack: {
        label: "Tech Stack",
        value: [
          { label: "Next.js", colorClass: "bg-gray-10" },
          { label: "Tailwind", colorClass: "bg-blue-50" },
          { label: "WAGMI", colorClass: "" },
          { label: "Gsap", colorClass: "bg-green-50" },
          { label: "Zustand", colorClass: "bg-rose-100" },
          { label: "Tanstack Query", colorClass: "bg-orange-50" },
          { label: "Github Action", colorClass: "bg-slate-100" },
          { label: "Firebase Auth", colorClass: "bg-yellow-100" },
          { label: "Firebase Hosting", colorClass: "bg-yellow-100" },
          { label: "Suspensive", colorClass: "bg-blue-50" },
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
            name: "Official",
            value: "https://anttime-exchange.web.app/",
            icon: "link" as const,
          },
        ],
      },
    },
  },
  right: {
    title: "Time 2 TokenSwap!",
    desc: "Convert your accumulated time points from ANTTIME to ANT TOKEN. The token conversion amount is calculated based on community contribution (mining time, friend invitations) and abuse detection. Check your score to decide how much token conversion to make.",
  },
};

export const ANTTIME_SWAP_CONFIG: WorkDetailConfig = {
  title: "ANTTIME SWAP",
  bannerImage,
  content: {
    ko: ANTTIME_SWAP_KO,
    en: ANTTIME_SWAP_EN,
  },
};
