import { TagCompactType } from "@/types/tag";
import { RoleType } from "@/types/user";

export interface PaginatedResponseDto<T> {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  data: T[];
}

export interface PostListItemType {
  id: number;
  title: string;
  previewText: string;
  createdAt: string;
  categoryLabel: string;
  groupLabel: string;
  tags: TagCompactType[];
  author: string;
  readPermisson: RoleType;
  score?: number;
}
