import { MenuType } from "@/types/menu";

export const menus: MenuType[] = [
  { title: "Landing", url: "/", as: "Bumang" },
  { title: "Guest Book", url: "/guest-book" },
  {
    title: "Work",
    url: "/work",
    subMenu: [
      {
        title: "Portfolio",
        url: "/portfolio",
      },
      {
        title: "Playground",
        url: "/playground",
      },
      {
        title: "log",
        url: "/log",
        subMenu: [
          {
            title: "Life",
            url: "/life",
          },
          {
            title: "Dev",
            url: "/dev",
          },
        ],
      },
    ],
  },
  {
    title: "Gallery",
    url: "/gallery",
    subMenu: [
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
];
