"use client";

import { useQueryParams } from "@/hooks/useQueryParams";
import Link from "next/link";

interface CategoryProps {
  title: string;
  categoryId: number;
}

const Category = ({ title, categoryId }: CategoryProps) => {
  const { updateQuery } = useQueryParams();
  return (
    <Link
      href={updateQuery({ categoryId: `${categoryId}` }, ["groupId"])}
      className="group flex items-center justify-between rounded-lg px-2 py-0.5 font-normal text-gray-700 transition-all"
    >
      <span className="truncate text-sm transition-all duration-200 group-hover:underline">
        {title}
      </span>
    </Link>
  );
};

export default Category;
