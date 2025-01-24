import { MenuType } from "@/types/routes";

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
    sub: [
      {
        title: "All",
        url: "/",
        parents: ["/work"],
      },
      {
        title: "Dev",
        url: "/dev",
        parents: ["/work"],
      },
      {
        title: "Design",
        url: "/design",
        parents: ["/work"],
      },
    ],
  },
  {
    title: "Blog",
    url: "/blog",
    group: "NAVIGATOR",
    sub: [
      {
        title: "All",
        url: "/",
        parents: ["/blog"],
      },
      {
        title: "Dev",
        url: "/dev",
        parents: ["/blog"],
      },
      {
        title: "Life",
        url: "/life",
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
