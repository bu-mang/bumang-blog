"use client";

import { RoleType } from "@/types";
import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";
import { ButtonBase } from "./button";

interface ReadPermissionSelectorProps {
  value: RoleType;
  onChange: (permission: RoleType) => void;
  userRole: "member" | "guest" | "host" | null;
  className?: string;
}

/**
 * @ReadPermissionSelector
 * 블로그 포스트의 공개 범위를 선택하는 컴포넌트
 *
 * 권한별 제한사항:
 * - guest 역할: "guest" 권한만 선택 가능 (public, member, host 비활성화)
 * - member 역할: public, guest, member 선택 가능 (host 비활성화)
 * - host 역할: 모든 권한 선택 가능 (public, guest, member, host)
 */
export default function ReadPermissionSelector({
  value,
  onChange,
  userRole,
  className,
}: ReadPermissionSelectorProps) {
  const t = useTranslations("blogEdit.publish");

  const handleChangeReadPermission = (role: RoleType) => {
    // guest 역할인 경우 guest만 선택 가능
    if (userRole === "guest" && role !== "guest") {
      return;
    }

    // member 역할인 경우 host 선택 불가
    if (userRole === "member" && role === "host") {
      return;
    }

    onChange(role);
  };

  return (
    <div className={className}>
      <div className="mb-1 flex items-center gap-2 font-medium">
        {t("readPermission.label")}
        {userRole === "guest" && (
          <span className="text-xs text-gray-300">
            {t("readPermission.userOnly")}
          </span>
        )}
      </div>
      <div className="relative flex overflow-hidden rounded-lg border border-gray-50">
        <ButtonBase
          className={cn(
            "flex-1 py-2 transition-all active:scale-100",
            value === null && "text-white",
            userRole === "guest" && "cursor-not-allowed opacity-30",
          )}
          onClick={() => handleChangeReadPermission(null)}
          disabled={userRole === "guest"}
        >
          {t("readPermission.types.public")}
        </ButtonBase>

        <ButtonBase
          className={cn(
            "flex-1 py-2 transition-all active:scale-100",
            value === "guest" && "text-white",
          )}
          onClick={() => handleChangeReadPermission("guest")}
        >
          {t("readPermission.types.loggedInUser")}
        </ButtonBase>

        <ButtonBase
          className={cn(
            "flex-1 py-2 transition-all active:scale-100",
            value === "member" && "text-white",
            userRole === "guest" && "cursor-not-allowed opacity-30",
          )}
          onClick={() => handleChangeReadPermission("member")}
          disabled={userRole === "guest"}
        >
          {t("readPermission.types.admin")}
        </ButtonBase>

        <ButtonBase
          className={cn(
            "flex-1 py-2 transition-all active:scale-100",
            value === "host" && "text-white",
            (userRole === "guest" || userRole === "member") &&
              "cursor-not-allowed opacity-30",
          )}
          onClick={() => handleChangeReadPermission("host")}
          disabled={userRole === "guest" || userRole === "member"}
        >
          {t("readPermission.types.owner")}
        </ButtonBase>

        {/* BACKGROUND */}
        <div
          className={cn(
            "absolute -z-[1] flex h-full w-1/4 bg-gray-800 transition-all",
            value === null && "translate-x-0",
            value === "guest" && "translate-x-full",
            value === "member" && "translate-x-[200%]",
            value === "host" && "translate-x-[300%]",
            "will-change-transform",
          )}
        />
      </div>
    </div>
  );
}
