import type { WorkDetailConfig } from "@/types/work";
import bannerImage from "@/assets/works/compressed/bumangRoute53.webp";

const BUMANG_ROUTE53_KO = {
  backToList: "목록으로 돌아가기",
  left: {
    badge: ["이 블로그", "풀스택으로", "만들었어요."],
    summary: {
      title: "프로젝트 요약",
      period: {
        label: "시작일",
        value: "2024.12. -",
      },
      position: {
        label: "포지션",
        value: "풀스택",
      },
      techStack: {
        label: "테크스택",
        value: [
          { label: "Next.js", colorClass: "bg-blue-100" },
          { label: "Tailwind", colorClass: "bg-neutral-100" },
          { label: "Next-intl(i18n)", colorClass: "bg-slate-100" },
          { label: "Gsap", colorClass: "bg-green-100" },
          { label: "Shadcn/ui", colorClass: "bg-slate-100" },
          { label: "Nest.js", colorClass: "bg-yellow-100" },
          { label: "TypeORM", colorClass: "bg-yellow-100" },
          { label: "Postgresql", colorClass: "bg-rose-100" },
          { label: "Docker/DockerCompose", colorClass: "bg-pink-100" },
          { label: "AWS EC2", colorClass: "bg-emerald-100" },
          { label: "AWS S3", colorClass: "bg-red-50" },
        ],
      },
      team: {
        label: "팀 구성",
        value: [{ role: "풀스택", amount: 1 }],
      },
      relatedLink: {
        label: "관련링크",
        value: [
          {
            name: "서비스",
            value: "https://www.bumang.xyz",
            icon: "link" as const,
          },
        ],
        testServiceAccount: {
          title: "테스트용 계정",
          email: "이메일",
          password: "비밀번호",
          idValue: "blog_user\n@gmail.com",
          passwordValue: "itsniceday250710",
        },
      },
    },
  },
  right: {
    title: "버망's 인터랙티브 포트폴리오 & 블로그",
    desc: "버망의 아티클과 그림 기록용 블로그입니다. ROUTE53인 이유가 혹시 궁금하신가요? 제 닉네임 옆에 길이가 비슷한 IT용어(특히 네트워크 용어)를 붙이고 싶었는데, 아마존의 도메인 서비스인 ROUTE53을 가져오기로 했습니다. 뭔가 있어보여서요. 테스트 아이디로 로그인한다면 직접 글을 써보실수도 있어요. 어차피 어드민(버망) 계정이 쓴 글이 아니면 24시간 안에 삭제될거지만요. 임시 아이디가 어딨냐구요?? 좌측 하단에 테스트용 아이디 있을테니 그걸로 로그인 해보세요.",
  },
};

const BUMANG_ROUTE53_EN = {
  backToList: "Back to List",
  left: {
    badge: ["This blog", "was built", "full-stack."],
    summary: {
      title: "Project Summary",
      period: {
        label: "Start Date",
        value: "2024.12. -",
      },
      position: {
        label: "Position",
        value: "Full-stack",
      },
      techStack: {
        label: "Tech Stack",
        value: [
          { label: "Next.js", colorClass: "bg-blue-100" },
          { label: "Tailwind", colorClass: "bg-neutral-100" },
          { label: "Next-intl(i18n)", colorClass: "bg-slate-100" },
          { label: "Gsap", colorClass: "bg-green-100" },
          { label: "Shadcn/ui", colorClass: "bg-slate-100" },
          { label: "Nest.js", colorClass: "bg-yellow-100" },
          { label: "TypeORM", colorClass: "bg-yellow-100" },
          { label: "Postgresql", colorClass: "bg-rose-100" },
          { label: "Docker/DockerCompose", colorClass: "bg-pink-100" },
          { label: "AWS EC2", colorClass: "" },
          { label: "AWS S3", colorClass: "bg-red-50" },
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
            value: "https://www.bumang.xyz",
            icon: "link" as const,
          },
        ],
        testServiceAccount: {
          title: "Test Account",
          email: "Email",
          password: "Password",
          idValue: "blog_user\n@gmail.com",
          passwordValue: "itsniceday250710",
        },
      },
    },
  },
  right: {
    title: "Bumang's Interactive Portfolio & Blog",
    desc: "This is Bumang's blog for recording articles and artwork. Wondering why it's called ROUTE53? I wanted to attach an IT term (especially a network term) of similar length next to my nickname, so I chose Amazon's domain service ROUTE53. It sounds professional. If you log in with the test account, you can even try writing posts yourself. Though any posts not written by the admin (Bumang) account will be deleted within 24 hours. Looking for the temporary account? Check the test account info at the bottom left.",
  },
};

export const BUMANG_ROUTE53_CONFIG: WorkDetailConfig = {
  title: "BUMANG ROUTE53",
  bannerImage,
  content: {
    ko: BUMANG_ROUTE53_KO,
    en: BUMANG_ROUTE53_EN,
  },
};
