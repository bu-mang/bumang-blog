"use client";

import { useQueryParams } from "@/hooks/useQueryParams";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface CategoryProps {
  title: string;
  categoryId: number;
  type: "Life" | "Dev";
}

const Category = ({ title, type, categoryId }: CategoryProps) => {
  const { updateQuery } = useQueryParams();
  const categoryIdParam = useSearchParams().get("categoryId");
  const currentCategoryId =
    typeof categoryIdParam === "string" ? Number(categoryIdParam) : undefined;

  return (
    <Link
      href={updateQuery(
        { categoryId: `${categoryId}` },
        { type: type === "Life" ? "Dev" : "Life", groupId: null },
      )}
      className={cn(
        "group flex items-center justify-between rounded-lg px-2 py-0.5 font-normal text-gray-700 transition-all",
        categoryId === currentCategoryId && "font-bold underline",
      )}
    >
      <span className="truncate text-sm transition-all duration-200 group-hover:underline">
        {title}
      </span>
    </Link>
  );
};

export default Category;
