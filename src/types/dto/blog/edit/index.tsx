import { RoleType } from "@/types/user";

export interface CreatePostDto {
  title: string;
  content: string;
  previewText: string;
  categoryId: number;
  tagIds: number[];
  thumbnailUrl?: string;
  readPermission: RoleType | null;
}

export interface CreatePreSignedUrlResponseDto {
  key: string;
  publicUrl: string;
  url: string;
}
