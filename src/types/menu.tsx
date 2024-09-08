export const PATHNAME = [
  { title: "Landing", url: "/" },
  { title: "About Me", url: "/about-me" },
  { title: "Portfolio", url: "/portfolio" },
  { title: "Gallery", url: "/gallery" },
  { title: "Blog", url: "/blog" },
  { title: "Guest Book", url: "/guest-book" },
] as const;

// 각 아이템 타입
export type PathnameType = (typeof PATHNAME)[number];

// isFocused 추가 타입
export type PathnameNavType = PathnameType & {
  subTabs?: string[];
};

// 타이틀 타입
export type PathnameTitleType = (typeof PATHNAME)[number]["title"];

// url타입
export type PathnameUrlType = (typeof PATHNAME)[number]["url"];
