import type { WorkDetailConfig } from "@/types/work";
import bannerImage from "@/assets/works/compressed/anttimeApp.webp";

const ANTTIME_APP_KO = {
  backToList: "목록으로 돌아가기",
  left: {
    badge: ["플레이스토어", "다운로드 80만", "Web3 포인트 채굴 앱"],
    summary: {
      title: "프로젝트 요약",
      period: {
        label: "담당 시작일",
        value: "24.04.15.",
      },
      position: {
        label: "포지션",
        value: "프론트 ReactNative(앱)/Next.js(환전웹사이트)",
      },
      techStack: {
        label: "테크스택",
        value: [
          { label: "React Native", colorClass: "bg-blue-100" },
          { label: "Style Sheet", colorClass: "bg-yellow-100" },
          { label: "Zustand", colorClass: "bg-rose-100" },
          { label: "React Native Reanimated ", colorClass: "bg-pink-100" },
          { label: "React Native IAP", colorClass: "bg-emerald-100" },
          { label: "React Native Firebase", colorClass: "bg-red-50" },
          { label: "Tanstack Query", colorClass: "bg-slate-100" },
          { label: "React Native Code Push", colorClass: "bg-neutral-100" },
          { label: "WAGMI", colorClass: "bg-indigo-100" },
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
            name: "Android",
            value:
              "https://play.google.com/store/apps/details?id=net.anttime.app",
            icon: "google" as const,
          },
          {
            name: "iOS",
            value: "https://apps.apple.com/kr/app/anttime/id6449239746?l=en-GB",
            icon: "apple" as const,
          },
          {
            name: "공식",
            value: "https://anttime.net/",
            icon: "link" as const,
          },
        ],
      },
    },
  },
  right: {
    title: "When ANTs Mine, TIME Shine.",
    desc: "ANTTIME은 시간이라는 자산을 수익화할 수 있는 블록체인 기반 T2E(Time-to-Earn) 프로젝트입니다. 이 TIME 생태계에서 창작, 소유, 수익 창출 등 다양한 경제 활동에 참여할 수 있습니다. 또한 노드 검증자가 되어 블록체인에 직접 참여할 수도 있습니다. ANTTIME과 함께 당신의 시간을 더욱 가치 있게 만드세요.",
  },
};

const ANTTIME_APP_EN = {
  backToList: "Back to list",
  left: {
    badge: ["Google Play", "800K downloads", "Web3 point-mining app"],
    summary: {
      title: "Project Summary",
      period: {
        label: "Start Date",
        value: "24.04.15.",
      },
      position: {
        label: "Role",
        value: "Frontend (cross-platform app development)",
      },
      techStack: {
        label: "Tech Stack",
        value: [
          { label: "React Native", colorClass: "bg-blue-100" },
          { label: "Style Sheet", colorClass: "bg-yellow-100" },
          { label: "Zustand", colorClass: "bg-rose-100" },
          { label: "React Native Reanimated", colorClass: "bg-pink-100" },
          { label: "React Native IAP", colorClass: "bg-emerald-100" },
          { label: "React Native Firebase", colorClass: "bg-red-50" },
          { label: "TanStack Query", colorClass: "bg-slate-100" },
          { label: "React Native CodePush", colorClass: "bg-neutral-100" },
          { label: "WAGMI", colorClass: "bg-indigo-100" },
        ],
      },
      team: {
        label: "Team",
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
            name: "Android",
            value:
              "https://play.google.com/store/apps/details?id=net.anttime.app",
            icon: "google" as const,
          },
          {
            name: "iOS",
            value: "https://apps.apple.com/kr/app/anttime/id6449239746?l=en-GB",
            icon: "apple" as const,
          },
          {
            name: "Official",
            value: "https://anttime.net/",
            icon: "link" as const,
          },
        ],
      },
    },
  },
  right: {
    title: "When ANTs Mine, TIME Shine.",
    desc: "ANTTIME is a blockchain-based T2E (Time-to-Earn) project that lets you monetize time as an asset. Within the TIME ecosystem, you can create, own, and generate revenue through various economic activities. You can also participate directly in the blockchain as a node validator. Make your time more valuable with ANTTIME.",
  },
};

export const ANTTIME_APP_CONFIG: WorkDetailConfig = {
  title: "ANTTIME",
  bannerImage,
  content: {
    ko: ANTTIME_APP_KO,
    en: ANTTIME_APP_EN,
  },
};
