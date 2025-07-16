"use client";

import { useQueryParams } from "@/hooks/useQueryParams";
import { cn } from "@/utils/cn";
import { Link } from "@/i18n/navigation";

interface CategoryProps {
  title: string;
  categoryId: number;
  currentCategoryId?: number;
  type: "Life" | "Dev";
}

const Category = ({
  title,
  type,
  currentCategoryId,
  categoryId,
}: CategoryProps) => {
  const { updateQuery } = useQueryParams();

  return (
    <Link
      href={updateQuery(
        { categoryId: `${categoryId}` },
        {
          type: type === "Life" ? "dev" : "life",
          groupId: null,
          pageIndex: null,
          tagIds: null,
        },
      )}
      prefetch={false}
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
