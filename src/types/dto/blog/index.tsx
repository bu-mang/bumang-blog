import { RoleType } from "@/types/user";

export interface CreatePostDto {
  title: string;
  content: string;
  previewText: string;
  categoryId: number;
  tagIds: number[];
  readPermission: RoleType | null;
}
