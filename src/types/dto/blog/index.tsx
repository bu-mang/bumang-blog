import { RoleType } from "@/types/user";

export interface CreatePostDto {
  title: string;
  content: string;
  previewText: string;
  authorId: number;
  categoryId: number;
  tagIds: number[];
  readPermission: RoleType | null;
}
