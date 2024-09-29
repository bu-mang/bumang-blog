import { MenuType } from "@/types/menu";

export const menus: MenuType[] = [
  { title: "Landing", url: "/", as: "Bumang" },
  { title: "Guest Book", url: "/guest-book" },
  {
    title: "Sign In",
    url: "/signin",
  },
  {
    title: "Work",
    url: "/work",
    subMenu: [
      {
        title: "All",
        url: "/",
      },
      {
        title: "Main",
        url: "/main-project",
      },
      {
        title: "Toy",
        url: "/toy-project",
      },
    ],
  },
  {
    title: "Gallery",
    url: "/gallery",
    subMenu: [
      {
        title: "All",
        url: "/",
      },
      {
        title: "Drawing",
        url: "/drawing",
      },
      {
        title: "Design",
        url: "/design",
      },
    ],
  },
  {
    title: "Log",
    url: "/log",
    subMenu: [
      {
        title: "All",
        url: "/",
      },
      {
        title: "Dev",
        url: "/dev",
      },
      {
        title: "Life",
        url: "/life",
      },
    ],
  },
] as const;
