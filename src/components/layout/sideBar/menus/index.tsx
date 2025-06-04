"use client";

import { GroupType } from "@/types/category";
import Group from "./group";
import Category from "./category";
import { useSearchParams } from "next/navigation";

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
        <div>{/* TODO: FALLBACK COMPONENTS 나중에 추가 */}</div>
      )}
    </div>
  );
};

export default Menus;
