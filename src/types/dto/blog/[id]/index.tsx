import { RoleType } from "@/types/user";

export interface PostDetailResponseDto {
  id: number;
  title: string;
  content: string;
  previewText: string;
  createdAt: string; // Date;
  updatedAt: string; // Date;
  authorNickname: string;
  readPermission: RoleType | null;
  thumbnailUrl: string;
  views: number;
  likes: number;
  category: {
    id: number;
    label: string;
  };
  group: {
    id: number;
    label: string;
  };
  tags: {
    id: number;
    label: string;
  }[];
}
