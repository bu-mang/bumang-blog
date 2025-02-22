import { TagType } from "./tag";

export interface BlogItemType {
  id: number;
  title: string;
  categoryValue: string;
  tags: TagType[];
  date: Date;
  imageUrl: string;
  content: string;
}
