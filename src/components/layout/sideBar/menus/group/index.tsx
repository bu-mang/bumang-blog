"use client";

import { useQueryParams } from "@/hooks/useQueryParams";
import { cn } from "@/utils/cn";
import Link from "next/link";
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
    <span className="rounded-md bg-gray-1 px-1 text-[10px] font-semibold text-gray-100">
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
        { type: type === "Life" ? "dev" : "life", categoryId: null },
      )}
      className={
        "flex items-center gap-0.5 rounded-lg px-2 py-1 text-xs font-medium text-gray-200"
      }
    >
      <span
        className={cn(
          "truncate transition-all duration-200 hover:underline",
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
