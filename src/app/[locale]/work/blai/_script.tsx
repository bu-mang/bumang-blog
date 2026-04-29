import type { WorkDetailConfig } from "@/types/work";
import bannerImage from "@/assets/works/compressed/blai.webp";

const BLAI_KO = {
  backToList: "목록으로 돌아가기",
  left: {
    badge: [
      "1년 만에 제로 투 원,",
      "0명부터 5만 유저까지",
      " - 국내 최대 네이버 블로그 상위노출 분석 플랫폼",
    ],
    summary: {
      title: "프로젝트 요약",
      period: {
        label: "시작일",
        value: "2024.04. -",
      },
      position: {
        label: "포지션",
        value: "풀스택",
      },
      techStack: {
        label: "테크스택",
        value: [
          { label: "Next.js", colorClass: "bg-blue-100" },
          { label: "NestJS", colorClass: "bg-red-100" },
          { label: "Python", colorClass: "bg-yellow-100" },
          { label: "RabbitMQ", colorClass: "bg-orange-100" },
          { label: "MongoDB", colorClass: "bg-green-100" },
          { label: "AWS EKS", colorClass: "bg-emerald-100" },
          { label: "DocumentDB", colorClass: "bg-green-100" },
          { label: "Playwright", colorClass: "bg-purple-100" },
          { label: "Zustand", colorClass: "bg-slate-100" },
          { label: "TailwindCSS", colorClass: "bg-neutral-100" },
        ],
      },
      team: {
        label: "팀 구성",
        value: [
          { role: "PM", amount: 1 },
          { role: "풀스택", amount: 1 },
        ],
      },
      relatedLink: {
        label: "관련링크",
        value: [
          {
            name: "서비스",
            value: "https://www.blai.co.kr",
            icon: "link" as const,
          },
        ],
      },
    },
  },
  right: {
    title: "blai - 네이버 블로그 분석 & 최적화 플랫폼",
    desc: "blai(Blog AI)는 네이버 블로그 마케터를 위한 분석 및 최적화 SaaS입니다. 키워드 분석, 형태소/비속어 분석, 이미지 분석, AI 리라이팅 등 다양한 분석 도구를 제공합니다. 웹 서비스 4개(사용자 웹, API 서버, Python 분석 서버, 관리자)와 외부 도구 2개(크롬 확장, 데스크톱 이미지 에디터)로 구성된 마이크로서비스 아키텍처로 운영되고 있습니다.",
  },
};

const BLAI_EN = {
  backToList: "Back to List",
  left: {
    badge: ["Built a", "Naver blog", "analytics SaaS."],
    badgeStyles: ["normal" as const, "bold" as const, "normal" as const],
    summary: {
      title: "Project Summary",
      period: {
        label: "Start Date",
        value: "2024.04. -",
      },
      position: {
        label: "Position",
        value: "Full-stack",
      },
      techStack: {
        label: "Tech Stack",
        value: [
          { label: "Next.js", colorClass: "bg-blue-100" },
          { label: "NestJS", colorClass: "bg-red-100" },
          { label: "Python", colorClass: "bg-yellow-100" },
          { label: "RabbitMQ", colorClass: "bg-orange-100" },
          { label: "MongoDB", colorClass: "bg-green-100" },
          { label: "AWS EKS", colorClass: "bg-emerald-100" },
          { label: "DocumentDB", colorClass: "bg-green-100" },
          { label: "Playwright", colorClass: "bg-purple-100" },
          { label: "Zustand", colorClass: "bg-slate-100" },
          { label: "TailwindCSS", colorClass: "bg-neutral-100" },
        ],
      },
      team: {
        label: "Team Size",
        value: [{ role: "Full-stack", amount: 1 }],
      },
      relatedLink: {
        label: "Related Links",
        value: [
          {
            name: "Service",
            value: "https://www.blai.co.kr",
            icon: "link" as const,
          },
        ],
      },
    },
  },
  right: {
    title: "BLAI - Naver Blog Analytics & Optimization Platform",
    desc: "BLAI (Blog AI) is an analytics and optimization SaaS for Naver blog operators. It provides various analysis tools including keyword analysis, morpheme/profanity analysis, image analysis, and AI rewriting. The platform operates on a microservice architecture consisting of 4 web services (user web, API server, Python analysis server, admin) and 2 external tools (Chrome extension, desktop image editor).",
  },
};

export const BLAI_CONFIG: WorkDetailConfig = {
  title: "blai",
  bannerImage,
  content: {
    ko: BLAI_KO,
    en: BLAI_EN,
  },
};
