export type RoleType = "user" | "admin" | null;

export interface UserResponseType {
  id: number;
  nickname: string;
  email: string;
  createdAt: string;
  role: string;
  postsCount: number;
  commentsCount: number;
}

export type UserType = Pick<UserResponseType, "nickname" | "role">;
