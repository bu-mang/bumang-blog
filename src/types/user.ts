export type RoleType = "guest" | "member" | "host" | null;

/** 현재 유효한 역할 값 (구 user/admin/owner는 제외) */
export const VALID_ROLES = ["guest", "member", "host"] as const;

/** 캐싱된(구버전) role을 가진 세션 감지용. null은 비로그인이므로 유효로 본다. */
export const isValidRole = (role: unknown): boolean =>
  role === null ||
  (typeof role === "string" &&
    (VALID_ROLES as readonly string[]).includes(role));

export interface UserResponseType {
  id: number;
  nickname: string;
  email: string;
  createdAt: string;
  role: string;
  postsCount: number;
  commentsCount: number;
}

export type UserType = Pick<UserResponseType, "nickname" | "role" | "id">;
