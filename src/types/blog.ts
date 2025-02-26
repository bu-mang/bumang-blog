import { TagType } from "./tag";

interface BlogItemType {
  id: number;
  title: string;
  categoryValue: string;
  tags: TagType[];
  date: Date;
  imageUrl: string;
  content: string;
}

enum BlogStep {
  EDITTING = "EDITTING",
  PUBLISHING = "PUBLISHING",
}

type BlogHeadingType = "h1" | "h2" | "h3";

interface BlogHeadingComponentType {
  id: string;
  text: string;
  level: number;
}

export {
  type BlogItemType,
  type BlogHeadingType,
  type BlogHeadingComponentType,
  BlogStep,
};
