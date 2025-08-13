"use client";

import { useQueryParams } from "@/hooks/useQueryParams";
import { cn } from "@/utils/cn";
import { Link } from "@/i18n/navigation";
import { HTMLAttributes } from "react";

interface GroupProps {
  title: string;
  amount: number;
  groupId: string | number;
  currentGroupId?: number;
  type: "Life" | "Dev";
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  value: string | number;
}

const Badge = ({ value }: BadgeProps) => {
  return (
    <span className="rounded-md bg-gray-1 px-1 text-[10px] font-semibold text-gray-100 dark:bg-gray-700">
      {value}
    </span>
  );
};

const Group = ({
  title,
  amount,
  groupId,
  currentGroupId,
  type,
}: GroupProps) => {
  const { updateQuery } = useQueryParams();

  return (
    <Link
      href={updateQuery(
        { groupId: `${groupId}` },
        {
          type: type === "Life" ? "dev" : "life",
          categoryId: null,
          pageIndex: null,
          tagIds: null,
        },
      )}
      prefetch={false}
      className={
        "flex items-center gap-0.5 rounded-lg px-2 py-1 text-xs font-medium"
      }
    >
      <span
        className={cn(
          "truncate text-gray-200 transition-all duration-200 hover:underline dark:text-gray-50",
          groupId === currentGroupId && "font-bold underline",
        )}
      >
        {title}
      </span>
      <Badge value={amount} />
    </Link>
  );
};

export default Group;
