"use client";

import { GroupType } from "@/types/category";
import Group from "./group";
import Category from "./category";
import { useSearchParams } from "next/navigation";
import { LucideAlertCircle } from "lucide-react";

interface MenusProps {
  menus: GroupType[] | null;
}

const Menus = ({ menus }: MenusProps) => {
  const searchParams = useSearchParams();

  const typeParam = searchParams.get("type")
    ? searchParams.get("type")
    : undefined;
  const currentGroupId = searchParams.get("groupId")
    ? Number(searchParams.get("groupId"))
    : undefined;
  const currentCategoryId = searchParams.get("categoryId")
    ? Number(searchParams.get("categoryId"))
    : undefined;

  return (
    <div className="flex w-full flex-col gap-4">
      {menus && menus.length > 0 ? (
        menus.map((group) => {
          if (typeParam === "dev" && group.label === "Life") {
            return null;
          }

          if (typeParam === "life" && group.label !== "Life") {
            return null;
          }

          return (
            <div key={group.id} className="flex w-full flex-col">
              {/* LABEL */}
              <Group
                title={group.label}
                amount={group.totalPostsCount}
                groupId={group.id}
                currentGroupId={currentGroupId}
                type={group.label === "Life" ? "Life" : "Dev"}
              />

              {/* CATEGORIES */}
              {group.categories.map((category) => {
                return (
                  <Category
                    key={category.id}
                    categoryId={category.id}
                    title={category.label}
                    currentCategoryId={currentCategoryId}
                    type={group.label === "Life" ? "Life" : "Dev"}
                  />
                );
              })}
            </div>
          );
        })
      ) : (
        <div className="mb-20 flex items-center gap-1 px-2 text-sm text-gray-200">
          <LucideAlertCircle size={14} />
          <span>No Categories</span>
        </div>
      )}
    </div>
  );
};

export default Menus;
