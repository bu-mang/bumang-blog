import type { MenuType } from "@/types";

export const ROUTES: MenuType[] = [
  { title: "HOME", url: "/" },
  {
    title: "Login",
    url: "/login",
  },
  {
    title: "About",
    url: "/about",
    group: "NAVIGATOR",
  },
  {
    title: "Work",
    url: "/work",
    group: "NAVIGATOR",
  },
  {
    title: "Blog",
    url: "/blog",
    group: "NAVIGATOR",
    sub: [
      {
        title: "All",
        url: "all",
        parents: ["/blog"],
      },
      {
        title: "Dev",
        url: "dev",
        parents: ["/blog"],
      },
      {
        title: "Life",
        url: "life",
        parents: ["/blog"],
      },
    ],
  },
  {
    title: "Play",
    url: "/play",
    group: "NAVIGATOR",
  },
] as const;
