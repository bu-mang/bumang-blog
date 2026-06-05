import { RoleType } from "@/types/user";

export interface CreatePostDto {
  title: string;
  content: string;
  previewText: string;
  categoryId: number;
  tagIds: number[];
  thumbnailUrl?: string;
  readPermission: RoleType | null;
  /** 생성 요청 멱등 키(UUID). 재시도 시 중복 생성을 막기 위해 사용 */
  clientRequestId?: string;
  /** BlockNote block.id → groupId[] 매핑. 키 없거나 빈 배열이면 공개. */
  blockAudienceMap?: Record<string, number[]>;
}

export interface CreatePreSignedUrlResponseDto {
  key: string;
  publicUrl: string;
  url: string;
}

export interface UploadExternalImageDto {
  imageUrl: string;
  filename?: string;
}

export interface UploadExternalImageResponseDto {
  publicUrl: string;
  key: string;
  originalUrl: string;
}
