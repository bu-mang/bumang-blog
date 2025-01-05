import { MenuType } from "@/app/_types/routes";

export const menus: MenuType[] = [
  { title: "WORK", url: "/" },
  {
    title: "SIGN IN",
    url: "/signin",
  },
  {
    title: "PLAY",
    url: "/play",
  },
  {
    title: "BLOG",
    url: "/blog",
  },
] as const;
