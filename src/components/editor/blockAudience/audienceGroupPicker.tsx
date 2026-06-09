"use client";

import { useQuery } from "@tanstack/react-query";
import { Lock } from "lucide-react";
import { getUserGroups } from "@/services/api/userGroups";
import { ButtonBase } from "@/components/common";
import { cn } from "@/utils/cn";

interface AudienceGroupPickerProps {
  value: number[];
  onChange: (next: number[]) => void;
  className?: string;
}

/**
 * 블록 한 개의 공개대상 그룹을 토글 선택.
 * 빈 배열 = 그룹 필터 없음 (공개).
 */
export default function AudienceGroupPicker({
  value,
  onChange,
  className,
}: AudienceGroupPickerProps) {
  const { data: groups = [], isLoading } = useQuery({
    queryKey: ["user-groups"],
    queryFn: getUserGroups,
    retry: false,
  });

  const toggle = (id: number) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  if (isLoading) {
    return (
      <div className={cn("text-sm text-gray-300", className)}>
        불러오는 중…
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className={cn("text-sm text-gray-300", className)}>
        만든 그룹이 없어요. /admin/groups에서 만들 수 있어요.
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {groups.map((g) => {
        const selected = value.includes(g.id);
        return (
          <ButtonBase
            key={g.id}
            type="button"
            onClick={() => toggle(g.id)}
            className={cn(
              "flex items-center gap-1 rounded-full border px-3 py-1 text-sm transition-colors",
              selected
                ? "border-foreground bg-foreground text-background"
                : "border-gray-200 bg-transparent text-foreground hover:border-gray-400",
            )}
            style={
              selected && g.color
                ? { backgroundColor: g.color, borderColor: g.color }
                : undefined
            }
          >
            {selected && <Lock size={12} />}
            <span>{g.name}</span>
          </ButtonBase>
        );
      })}
    </div>
  );
}
