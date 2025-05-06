export type RoleType = "user" | "admin" | null;
export interface UserType {
  nickname: string;
  role: string; // Enum으로 교체
}
