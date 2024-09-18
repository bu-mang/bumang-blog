import { menus } from "@/constants/menuTree";

// Landing
// Guest Book
// Work
// Portfolio
// Playground
// log
// Gallery
// Drawing
// Design
// Sign In

export interface MenuType {
  title: string;
  url: string;
  subMenu?: MenuType[];
  as?: string;
}
