import type { WorkDetailConfig } from "@/types/work";
import bannerImage from "@/assets/works/compressed/blai.webp";

import blai_mq from "@/assets/workDetails/blai/blai_mq.jpg";
import blai_subscription from "@/assets/workDetails/blai/blai_subscription.jpg";
import blai_keywordMining from "@/assets/workDetails/blai/blai_keywordMining.jpg";
import blai_postComprehensive from "@/assets/workDetails/blai/blai_postComprehensive.jpg";

export const SECTION_PIPELINE = "SECTION_PIPELINE";
export const SECTION_SUBSCRIPTION = "SECTION_SUBSCRIPTION";
export const SECTION_KEYWORD = "SECTION_KEYWORD";
export const SECTION_POST_COMPREHENSIVE = "SECTION_POST_COMPREHENSIVE";

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
    navigation: {
      title: "맡은 역할",
      value: [
        {
          title: "RabbitMQ 비동기 분석 파이프라인",
          desc: "요청-큐-분석-응답 왕복 메시징 구조 설계",
          href: SECTION_PIPELINE,
        },
        {
          title: "구독/결제 시스템 및 접근 제어",
          desc: "티어별 기능 제한과 사용량 추적",
          href: SECTION_SUBSCRIPTION,
        },
        {
          title: "키워드 분석/마이닝",
          desc: "대량 키워드 처리 및 순위 분석",
          href: SECTION_KEYWORD,
        },
        {
          title: "포스팅 통합 분석",
          desc: "형태소·비속어·이미지 분석 동시 RPC 처리",
          href: SECTION_POST_COMPREHENSIVE,
        },
      ],
    },
  },
  details: [
    {
      title: "RabbitMQ 비동기 분석 파이프라인",
      titleDesc: "요청-큐-분석-응답 왕복 메시징 구조 설계",
      id: SECTION_PIPELINE,

      list: [
        {
          subtitle: "• Topic Exchange 기반 메시지 라우팅 설계",
          desc: [
            "request/response exchange를 분리하고, 라우팅 키 패턴(request.analyze.[category].[action])으로 분석 요청을 Python 워커에 분배",
            "NestJS Producer가 RPC 요청을 발행하면 Python 분석 서버가 처리 후 응답 큐로 결과를 반환하는 왕복 구조 구현",
            "실패 메시지를 Dead Letter Queue(DLQ)로 라우팅하여 장애 추적 및 재처리 가능하도록 설계",
          ],
        },
        {
          subtitle: "• Python 분석 서버(Playwright 기반 크롤링)",
          desc: [
            "Playwright로 네이버 블로그/카페 데이터를 크롤링하고, KiwiPy 형태소 분석기와 자체 비속어 사전으로 텍스트를 분석",
            "같은 노드에서 병렬 HTTP 요청 시 IP 밴 위험이 있어, RPC call_parallel()로 여러 워커 pod에 분산 처리하는 전략 적용",
          ],
        },
      ],

      image: blai_mq,
    },
    {
      title: "단건결제 시스템에서 구독/결제 시스템으로 전환",
      titleDesc: "티어별 기능 제한과 사용량 추적",
      id: SECTION_SUBSCRIPTION,

      list: [
        {
          subtitle: "• 구독 티어별 기능 접근 제어",
          desc: [
            "SubscriptionGuard로 구독 상태 검증, FeatureLimitGuard로 일일 사용량 제한을 구현. 티어별(FREE, BASIC, PREMIUM) 접근 가능 기능과 사용 한도를 enum + config로 관리",
            "외부 도구(크롬 확장, 데스크톱 앱)용 API Key 인증 시스템 구현. 1키 1디바이스 바인딩, 구독 상태와 매시간 자동 동기화",
          ],
        },
        {
          subtitle: "• 관리자 대시보드 통계",
          desc: [
            "일/주/월 단위 cron 스케줄로 신규유저, 활성유저, 매출, 기능별 사용량 통계를 자동 집계",
            "관리자 웹에서 사용자 계정 관리, 기능 토글(점검 모드), 쿠폰/이벤트 관리 등 운영 기능 구축",
          ],
        },
      ],

      image: blai_subscription,
    },
    {
      title: "키워드 분석/마이닝",
      titleDesc: "대량 키워드 처리 및 순위 분석",
      id: SECTION_KEYWORD,

      list: [
        {
          subtitle: "• 키워드 분석 및 대량 순위 조회",
          desc: [
            "네이버 검색 API 크롤링 기반 키워드 경쟁도, 월간 검색량, 노출 섹션 등을 분석하는 파이프라인 구현",
            "대량 키워드를 RPC call_parallel()로 분산 처리하여 수십~수백 건의 키워드를 동시에 분석. 워커 pod 간 부하 분산으로 IP 밴 없이 안정적 처리",
          ],
        },
        {
          subtitle: "• 키워드 마이닝 (연관 키워드 발굴)",
          desc: [
            "시드 키워드로부터 연관 키워드를 자동 발굴하고, 경쟁도/검색량 기준으로 유망 키워드를 필터링",
            "복잡한 비즈니스 로직(필터링, 스코어링, 그룹핑)을 백엔드 keyword-mining 모듈에서 처리",
          ],
        },
      ],

      image: blai_keywordMining,
    },
    {
      title: "포스팅 통합 분석",
      titleDesc: "형태소·비속어·이미지 분석 동시 RPC 처리",
      id: SECTION_POST_COMPREHENSIVE,

      list: [
        {
          subtitle: "• 3가지 분석을 동시에 RPC 요청/수합",
          desc: [
            "하나의 포스팅 URL 또는 텍스트에 대해 형태소 분석, 비속어 분석, 이미지 분석 3가지 RPC 요청을 동시에 발행",
            "각 분석 결과가 개별 response 큐로 돌아오면 Consumer가 post 문서에 병합. 3개 모두 완료되면 level을 1로 업데이트하여 프론트 폴링이 완료를 감지",
          ],
        },
        {
          subtitle: "• 분석 결과 통합 및 엑셀 내보내기",
          desc: [
            "형태소 빈도, 비속어 검출 목록, 이미지 메타 분석 결과를 하나의 통합 뷰로 제공",
            "형태소/비속어 분석 결과를 ExcelJS로 엑셀 파일로 내보내기 기능 구현. 사용자 사전(동의어, 무시 단어) 연동으로 분석 정확도 개선",
          ],
        },
      ],

      image: blai_postComprehensive,
    },
  ],
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
    navigation: {
      title: "Role & Responsibilities",
      value: [
        {
          title: "RabbitMQ Async Analysis Pipeline",
          desc: "Request-Queue-Analysis-Response messaging architecture",
          href: SECTION_PIPELINE,
        },
        {
          title: "Subscription/Payment & Access Control",
          desc: "Tier-based feature limits and usage tracking",
          href: SECTION_SUBSCRIPTION,
        },
        {
          title: "Keyword Analysis/Mining",
          desc: "Bulk keyword processing and ranking analysis",
          href: SECTION_KEYWORD,
        },
        {
          title: "Post Comprehensive Analysis",
          desc: "Simultaneous RPC processing of morpheme, profanity, and image analysis",
          href: SECTION_POST_COMPREHENSIVE,
        },
      ],
    },
  },
  details: [
    {
      title: "RabbitMQ Async Analysis Pipeline",
      titleDesc: "Request-Queue-Analysis-Response messaging architecture",
      id: SECTION_PIPELINE,

      list: [
        {
          subtitle: "• Topic Exchange-based message routing design",
          desc: [
            "Separated request/response exchanges and distributed analysis requests to Python workers using routing key patterns (request.analyze.[category].[action])",
            "Implemented a round-trip structure where NestJS Producer publishes RPC requests, Python analysis server processes them, and returns results via response queue",
            "Designed failed messages to route to Dead Letter Queue (DLQ) for fault tracking and reprocessing",
          ],
        },
        {
          subtitle: "• Python analysis server (Playwright-based crawling)",
          desc: [
            "Crawled Naver blog/cafe data with Playwright, analyzed text using KiwiPy morpheme analyzer and custom profanity dictionary",
            "Applied distributed processing strategy via RPC call_parallel() across multiple worker pods to avoid IP bans from parallel HTTP requests on the same node",
          ],
        },
      ],

      image: blai_mq,
    },
    {
      title: "Subscription/Payment & Access Control",
      titleDesc: "Tier-based feature limits and usage tracking",
      id: SECTION_SUBSCRIPTION,

      list: [
        {
          subtitle: "• Tier-based feature access control",
          desc: [
            "Implemented SubscriptionGuard for subscription validation and FeatureLimitGuard for daily usage limits. Managed accessible features and usage caps per tier (FREE, BASIC, PREMIUM) via enum + config",
            "Built API Key authentication system for external tools (Chrome extension, desktop app). 1-key-1-device binding with automatic hourly synchronization with subscription status",
          ],
        },
        {
          subtitle: "• Admin dashboard analytics",
          desc: [
            "Auto-aggregated statistics for new users, active users, revenue, and feature usage via daily/weekly/monthly cron schedules",
            "Built operational features including user account management, feature toggle (maintenance mode), coupon/event management in admin web",
          ],
        },
      ],

      image: blai_subscription,
    },
    {
      title: "Keyword Analysis/Mining",
      titleDesc: "Bulk keyword processing and ranking analysis",
      id: SECTION_KEYWORD,

      list: [
        {
          subtitle: "• Keyword analysis and bulk ranking queries",
          desc: [
            "Implemented pipeline analyzing keyword competitiveness, monthly search volume, and exposure sections based on Naver search API crawling",
            "Distributed bulk keywords via RPC call_parallel() for simultaneous analysis of tens to hundreds of keywords. Stable processing without IP bans through load distribution across worker pods",
          ],
        },
        {
          subtitle: "• Keyword mining (related keyword discovery)",
          desc: [
            "Automatically discovered related keywords from seed keywords and filtered promising ones by competitiveness/search volume criteria",
            "Processed complex business logic (filtering, scoring, grouping) in the backend keyword-mining module",
          ],
        },
      ],

      image: blai_keywordMining,
    },
    {
      title: "Post Comprehensive Analysis",
      titleDesc:
        "Simultaneous RPC processing of morpheme, profanity, and image analysis",
      id: SECTION_POST_COMPREHENSIVE,

      list: [
        {
          subtitle: "• 3 analyses via simultaneous RPC request/aggregation",
          desc: [
            "Published 3 RPC requests simultaneously for morpheme analysis, profanity analysis, and image analysis on a single posting URL or text",
            "As each analysis result returns via individual response queues, Consumer merges them into the post document. When all 3 complete, updates level to 1 so frontend polling detects completion",
          ],
        },
        {
          subtitle: "• Integrated results and Excel export",
          desc: [
            "Provided a unified view of morpheme frequency, profanity detection list, and image meta analysis results",
            "Implemented Excel export via ExcelJS for morpheme/profanity analysis results. Improved analysis accuracy through user dictionary (synonyms, ignored words) integration",
          ],
        },
      ],

      image: blai_postComprehensive,
    },
  ],
};

export const BLAI_CONFIG: WorkDetailConfig = {
  title: "blai",
  bannerImage,
  content: {
    ko: BLAI_KO,
    en: BLAI_EN,
  },
};
