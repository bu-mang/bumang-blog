import BlogItem from "@/components/blogItem";
import { LuCheck } from "react-icons/lu";

const blogItems = [
  {
    id: 0,
    title: "타입스크립트 이해하기: 초보자를 위한 가이드",
    category: "Front",
    tags: ["TypeScript", "JavaScript"],
    date: new Date("2025-01-20"),
    imageUrl: "",
  },
  {
    id: 1,
    title: "NestJS로 확장 가능한 API 만들기",
    category: "Back",
    tags: ["NestJS", "TypeScript", "REST API"],
    date: new Date("2025-01-18"),
    imageUrl: "",
  },
  {
    id: 2,
    title: "React의 useEffect 훅 깊이 살펴보기",
    category: "Front",
    tags: ["React", "Hooks", "JavaScript"],
    date: new Date("2025-01-15"),
    imageUrl: "",
  },
  {
    id: 3,
    title: "Prisma로 데이터베이스 쿼리 최적화하기",
    category: "Back",
    tags: ["Prisma", "Database", "SQL"],
    date: new Date("2025-01-12"),
    imageUrl: "",
  },
  {
    id: 4,
    title: "CSS Grid와 Flexbox: 무엇을 선택해야 할까?",
    category: "Front",
    tags: ["CSS", "Grid", "Flexbox"],
    date: new Date("2025-01-10"),
    imageUrl: "",
  },
  {
    id: 5,
    title: "Zustand로 상태 관리 마스터하기",
    category: "Front",
    tags: ["Zustand", "React", "State Management"],
    date: new Date("2025-01-08"),
    imageUrl: "",
  },
  {
    id: 6,
    title: "OAuth 2.0으로 웹 애플리케이션 보안 강화하기",
    category: "Auth",
    tags: ["OAuth", "Authentication", "Security"],
    date: new Date("2025-01-05"),
    imageUrl: "",
  },
  {
    id: 7,
    title: "Next.js 애플리케이션 성능 최적화하기",
    category: "Front",
    tags: ["Next.js", "Performance", "JavaScript"],
    date: new Date("2025-01-03"),
    imageUrl: "",
  },
  {
    id: 8,
    title: "React Three Fiber로 3D 시작하기",
    category: "Graphics",
    tags: ["React Three Fiber", "Three.js", "3D"],
    date: new Date("2025-01-01"),
    imageUrl: "",
  },
  {
    id: 9,
    title: "2025년에 WebGL을 배워야 하는 이유",
    category: "Graphics",
    tags: ["WebGL", "Graphics", "3D"],
    date: new Date("2024-12-30"),
    imageUrl: "",
  },
];

export default function Blog() {
  return (
    <main>
      <header className="mx-[3vw] mb-4 flex flex-col gap-1 border-t-[1px] border-gray-10 pt-2 text-xs">
        <span className="text-gray-200">All</span>
        <LuCheck />
        <span className="text-gray-200">Dev</span>
        <span className="pl-4 text-gray-200">projects</span>
        <span className="pl-4 text-gray-200">Front-end</span>
        <span className="pl-8 text-gray-200">HTML/CSS</span>
        <span className="pl-8 text-gray-200">JS/TS</span>
        <span className="pl-8 text-gray-200">React</span>
        <span className="pl-8 text-gray-200">ReactNative</span>
        <span className="pl-8 text-gray-200">Next.js</span>
        <span className="pl-4 text-gray-200">Back-end</span>
        <span className="pl-8 text-gray-200">Node.js</span>
        <span className="pl-8 text-gray-200">Nest.js</span>
        <span className="pl-8 text-gray-200">PostgresQL</span>
        <span className="text-gray-200">Life</span>
        <span className="pl-4 text-gray-200">Drawing</span>
        <span className="pl-4 text-gray-200">Stuff</span>
      </header>
      <div className="grid h-fit w-full grid-cols-4 gap-x-[1vw] gap-y-[2vw] px-[3vw]">
        {blogItems.map(({ id, title, category, tags, date, imageUrl }) => (
          <BlogItem
            key={id}
            id={id}
            title={title}
            category={category}
            tags={tags}
            date={date}
            imageUrl={imageUrl}
          />
        ))}
      </div>
    </main>
  );
}
