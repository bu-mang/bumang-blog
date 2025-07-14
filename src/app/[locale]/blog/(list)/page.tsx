import { SectionLabel, Pagenation } from "@/components/common";
import { TooltipDemo } from "@/components/layout/header/tooltip";
import { BlogItem } from "@/components/pages";
import { getAllPosts } from "@/services/api/blog/(list)/server";
import { PaginatedResponseDto, PostListItemType } from "@/types";
import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";
import { LuCircleAlert } from "react-icons/lu";

interface PageProps {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Blog({ searchParams }: PageProps) {
  const t = useTranslations("blog");
  let allPosts: null | PaginatedResponseDto<PostListItemType> = null;
  let itemViewType: "list" | "thumbnail" =
    searchParams.view === "list" ? "list" : "thumbnail";
  const groupId =
    typeof searchParams.groupId === "string"
      ? Number(searchParams.groupId)
      : undefined;
  const categoryId =
    typeof searchParams.categoryId === "string"
      ? Number(searchParams.categoryId)
      : undefined;
  const postType =
    typeof searchParams.type === "string" ? searchParams.type : undefined;
  const tagIds = searchParams.tagIds;

  let pageIndex = searchParams.pageIndex ? Number(searchParams.pageIndex) : 1;
  let pageSize = 12;

  try {
    allPosts = await getAllPosts(
      pageIndex,
      pageSize,
      groupId,
      categoryId,
      tagIds,
      postType,
    );
  } catch (err) {
    console.log(allPosts, err, "allPost error");
  }

  return (
    <div className="col-span-3 grid h-fit grid-cols-3 gap-x-[1.5vw]">
      <SectionLabel
        isTag={typeof tagIds !== "undefined"}
        title={
          allPosts?.subject ||
          postType ||
          (allPosts?.totalCount ? "All" : "unknown")
        }
        amount={allPosts?.totalCount ?? 0}
        itemViewType={itemViewType}
      />
      <div
        className={cn(
          "col-span-3",
          itemViewType === "thumbnail" &&
            allPosts &&
            "grid grid-cols-3 gap-x-[1.5vw] gap-y-[4.5vw]",
        )}
      >
        {/* BLOGITEMS */}
        {allPosts?.data && allPosts?.data.length ? (
          allPosts?.data?.map(
            ({
              id,
              title,
              previewText,
              createdAt,
              categoryLabel,
              groupLabel,
              tags,
              author,
              thumbnailUrl,
              readPermisson,
              score,
            }) => (
              <BlogItem
                key={id}
                id={id}
                title={title}
                previewText={previewText}
                author={author}
                // category & group
                groupLabel={groupLabel}
                categoryLabel={categoryLabel}
                tags={tags}
                date={createdAt}
                thumbnailUrl={thumbnailUrl}
                readPermisson={readPermisson}
                itemViewType={itemViewType}
              />
            ),
          )
        ) : (
          <div
            className={
              "col-span-4 mb-5 flex h-80 flex-col items-center justify-center py-10 text-gray-200"
            }
          >
            <LuCircleAlert size={24} className="mb-1" />
            <span className="text-lg font-semibold">{t("noPost.title")}</span>
            <span>{t("noPost.desc")}</span>
          </div>
        )}

        {/* PAGE-NATION */}
        <div className="col-span-3">
          <Pagenation
            pageSize={allPosts?.pageSize ?? 12}
            totalCount={allPosts?.totalCount ?? 1}
            currentPage={allPosts?.currentPage ?? 1}
          />
        </div>
      </div>
    </div>
  );
}
