import { useAuthStore } from "@/store/auth";
import { RoleType } from "@/types";

type RoleScore = Exclude<RoleType, null> | "anon";

export const useCheckPermission = (readPermission: RoleType) => {
  const user = useAuthStore((state) => state.user);

  const permissionScore: Record<RoleScore, number> = {
    anon: 0,
    guest: 1,
    member: 2,
    host: 3,
  };

  return (
    permissionScore[(user?.role ?? "anon") as RoleScore] >=
    permissionScore[(readPermission ?? "anon") as RoleScore]
  );
};
