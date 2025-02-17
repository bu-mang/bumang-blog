import BlogItem from "@/components/pages/blog/blogItem";
import Pagenation from "@/components/common/pageNation";
import BlogTitle from "@/components/pages/blog/blogTitle";

const blogItems = [
  {
    id: 0,
    title: "타입스크립트 이해하기: 초보자를 위한 가이드",
    category: "Front",
    tags: ["TypeScript", "JavaScript"],
    date: new Date("2025-01-20"),
    imageUrl: "",
    content: "타입스크립트 기초 개념과 사용법을 쉽게 설명합니다.",
  },
  {
    id: 1,
    title: "NestJS로 확장 가능한 API 만들기",
    category: "Back",
    tags: ["NestJS", "TypeScript", "REST API"],
    date: new Date("2025-01-18"),
    imageUrl: "",
    content: "NestJS로 안정적이고 확장 가능한 API를 구축해보세요.",
  },
  {
    id: 2,
    title: "React의 useEffect 훅 깊이 살펴보기",
    category: "Front",
    tags: ["React", "Hooks", "JavaScript"],
    date: new Date("2025-01-15"),
    imageUrl: "",
    content: "useEffect 훅의 동작 원리와 실전 활용법을 알아봅니다.",
  },
  {
    id: 3,
    title: "Prisma로 데이터베이스 쿼리 최적화하기",
    category: "Back",
    tags: ["Prisma", "Database", "SQL"],
    date: new Date("2025-01-12"),
    imageUrl: "",
    content: "Prisma를 활용한 데이터베이스 쿼리 최적화 방법을 소개합니다.",
  },
  {
    id: 4,
    title: "CSS Grid와 Flexbox: 무엇을 선택해야 할까?",
    category: "Front",
    tags: ["CSS", "Grid", "Flexbox"],
    date: new Date("2025-01-10"),
    imageUrl: "",
    content: "CSS Grid와 Flexbox의 차이와 적합한 사용 사례를 비교합니다.",
  },
  {
    id: 5,
    title: "Zustand로 상태 관리 마스터하기",
    category: "Front",
    tags: ["Zustand", "React", "State Management"],
    date: new Date("2025-01-08"),
    imageUrl: "",
    content: "Zustand를 이용한 간단하고 효율적인 상태 관리 방법을 배워봅니다.",
  },
  {
    id: 6,
    title: "OAuth 2.0으로 웹 애플리케이션 보안 강화하기",
    category: "Auth",
    tags: ["OAuth", "Authentication", "Security"],
    date: new Date("2025-01-05"),
    imageUrl: "",
    content: "OAuth 2.0으로 사용자 인증과 보안을 강화하는 법을 알아봅니다.",
  },
  {
    id: 7,
    title: "Next.js 애플리케이션 성능 최적화하기",
    category: "Front",
    tags: ["Next.js", "Performance", "JavaScript"],
    date: new Date("2025-01-03"),
    imageUrl: "",
    content: "Next.js에서 성능 최적화 기법과 실전 팁을 공유합니다.",
  },
  {
    id: 8,
    title: "React Three Fiber로 3D 시작하기",
    category: "Graphics",
    tags: ["React Three Fiber", "Three.js", "3D"],
    date: new Date("2025-01-01"),
    imageUrl: "",
    content: "React Three Fiber로 쉽게 3D 그래픽을 구현하는 방법을 배워봅니다.",
  },
  {
    id: 9,
    title: "2025년에 WebGL을 배워야 하는 이유",
    category: "Graphics",
    tags: ["WebGL", "Graphics", "3D"],
    date: new Date("2024-12-30"),
    imageUrl: "",
    content: "WebGL의 가능성과 2025년에 배우면 좋은 이유를 알아봅니다.",
  },
];

export default function Blog() {
  return (
    <div className="col-span-3 grid h-fit grid-cols-3 gap-x-[1.5vw]">
      <BlogTitle />
      <div className="col-span-3 grid h-fit grid-cols-3 gap-x-[1.5vw] gap-y-[4.5vw]">
        {/* BLOGITEMS */}
        {blogItems.map(
          ({ id, title, content, category, tags, date, imageUrl }) => (
            <BlogItem
              key={id}
              id={id}
              title={title}
              content={content}
              category={category}
              tags={tags}
              date={date}
              imageUrl={imageUrl}
            />
          ),
        )}
        {/* PAGE-NATION */}
        <div className="col-span-3">
          <Pagenation />
        </div>
      </div>
    </div>
  );
}
