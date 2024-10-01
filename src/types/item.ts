export interface StackTree {
  title: string;
  subCategories?: StackTree[];
}

export interface WorkItem {
  id: string;
  title: string; // 제목
  bgImage: string; // 배경
  desc?: string;
  categoryType: "main-project" | "toy-project";
  bgColor: string; // 배경의 주요 색상
  platform: string[]; // WEB, MOBILE
  date: {
    startDate: Date;
    endDate?: Date;
  };
  createAt: Date;
  roleMain: "FullStack" | "Frontend" | "Backend";
  roleDetail: string[];
  stack: StackTree[];
  participants: "Solo Project" | "Team Project";

  link: {
    github: string;
    deploy: string;
  };

  admin?: {
    id: string;
    password: string;
  };
}

export interface WorkContent {
  id: string;
  parentId: string;
  layout: string[];
  content: string[];
}

type ArtworkType = "Drawing" | "Artwork" | "3D" | "Music" | "Animation";

export interface GalleryItem {
  id: string;
  title: string; // 제목
  bgImage: string; // 배경
  date: Date;
  createAt: Date;
  tag: ArtworkType[];
  roleDetail: string[];
  stack: StackTree[];
  participants: "Solo Project" | "Team Project";
  detailContent?: boolean;

  link: {
    github: string;
    deploy: string;
  };

  admin: {
    id: string;
    password: string;
  };
}

export interface GalleryContent {
  id: string;
  parentId: string;
  layout: string[];
  content: string[];
}

export type ListType = "List" | "Grid";
export type SortType = "Recent" | "Popular";
