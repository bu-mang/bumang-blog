import { getGroupedCategoryTree } from "@/services/api/blog/(list)/server";
import { GroupType } from "@/types/category";
import Group from "./group";
import Category from "./category";

const Menus = async () => {
  let menus: GroupType[] | null = null;

  try {
    const res = await getGroupedCategoryTree();
    if (res) {
      menus = res;
    }
  } catch (err) {
    console.log(err, "err");
  }

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        {menus && menus.length > 0 ? (
          menus.map((group) => {
            return (
              <div key={group.id} className="flex w-full flex-col">
                {/* LABEL */}
                <Group
                  title={group.label}
                  amount={group.totalPostsCount}
                  groupId={group.id}
                />

                {/* CATEGORIES */}
                {group.categories.map((category) => {
                  return (
                    <Category
                      key={category.id}
                      categoryId={category.id}
                      title={category.label}
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
    </>
  );
};

export default Menus;
