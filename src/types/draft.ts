import { YooptaContentValue } from "@yoopta/editor";
import { CategoryType, GroupType } from "./category";
import { TagType } from "./tag";

export interface DraftType {
  id: number;
  title: string;
  content: YooptaContentValue | string | undefined;
  selectedGroup: GroupType | null;
  selectedCategory: CategoryType | null;
  selectedTags: TagType[];
  lastUpdatedAt: string;
}
