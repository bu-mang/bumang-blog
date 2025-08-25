"use client";

import { SectionLabel, Pagenation } from "@/components/common";
import { BlogItem } from "@/components/pages";

import { PaginatedResponseDto, PostListItemType } from "@/types";
import { useTranslations } from "next-intl";
import { cn } from "@/utils/cn";

import { LuCircleAlert } from "react-icons/lu";
import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/api/queryKey";
import { getAllPostAuthenticated } from "@/services/api/blog/(list)";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import { useAuthStore } from "@/store/auth";
import { BlogItemFallback } from "./blogItem";
import { PagenationFallback } from "@/components/common/pageNation";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useHeaderStore } from "@/store/header";

interface BlogListViewProps {
  allPosts: null | PaginatedResponseDto<PostListItemType>;
  itemViewType: "list" | "thumbnail";
  groupId?: number;
  categoryId?: number;
  postType?: string;
  tagIds?: string | string[];

  pageIndex: number;
  pageSize: number;
}

export default function BlogInner({
  allPosts,
  itemViewType,
  groupId,
  categoryId,
  postType,
  tagIds,

  pageIndex,
  pageSize,
}: BlogListViewProps) {
  const user = useAuthStore((state) => state.user);

  const { resolvedTheme } = useTheme();
  const setDefaultSetting = useHeaderStore((state) => state.setDefaultSetting);
  useEffect(() => {
    setDefaultSetting(resolvedTheme ?? "light");
    // eslint-disable-next-line
  }, []);

  if (!allPosts && !user) {
    return <BlogListFallback itemViewType={itemViewType} />;
  }

  return allPosts ? (
    <BlogListViewSSR
      allPosts={allPosts}
      itemViewType={itemViewType}
      groupId={groupId}
      categoryId={categoryId}
      postType={postType}
      tagIds={tagIds}
      pageIndex={pageIndex}
      pageSize={pageSize}
    />
  ) : (
    <ErrorBoundary fallback={<></>}>
      <Suspense
        clientOnly
        fallback={<BlogListFallback itemViewType={itemViewType} />}
      >
        <BlogListViewCSR
          itemViewType={itemViewType}
          groupId={groupId}
          categoryId={categoryId}
          postType={postType}
          tagIds={tagIds}
          pageIndex={pageIndex}
          pageSize={pageSize}
        />
      </Suspense>
    </ErrorBoundary>
  );
}

function BlogListViewSSR({
  allPosts,
  itemViewType,
  postType,
  tagIds,
}: BlogListViewProps) {
  const t = useTranslations("blog");

  return (
    <div className="col-span-full h-fit md:col-span-3">
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
          "col-span-full",
          itemViewType === "thumbnail" &&
            allPosts &&
            "grid grid-cols-2 gap-x-[1.5vw] gap-y-[4.5vw] md:grid-cols-3",
        )}
      >
        {/* BLOGITEMS */}
        {allPosts?.data && allPosts?.data.length ? (
          allPosts?.data?.map(
            (
              {
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
              },
              index,
            ) => (
              <BlogItem
                index={index}
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
        <div className="col-span-full scale-75 md:col-span-3 md:scale-100">
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

function BlogListViewCSR({
  itemViewType,
  groupId,
  categoryId,
  postType,
  tagIds,

  pageIndex,
  pageSize,
}: Omit<BlogListViewProps, "allPosts">) {
  const t = useTranslations("blog");

  const { data: allPosts } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_POSTS(
      pageIndex,
      pageSize,
      groupId,
      categoryId,
      tagIds,
      postType,
    ),
    queryFn: () =>
      getAllPostAuthenticated(
        pageIndex,
        pageSize,
        groupId,
        categoryId,
        tagIds,
        postType,
      ),
  });

  return (
    <div className="col-span-full h-fit md:col-span-3">
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
          "col-span-full",
          itemViewType === "thumbnail" &&
            allPosts &&
            "grid grid-cols-2 gap-x-[1.5vw] gap-y-[4.5vw] md:grid-cols-3",
        )}
      >
        {/* BLOGITEMS */}
        {allPosts?.data && allPosts?.data.length ? (
          allPosts?.data?.map(
            (
              {
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
              },
              index,
            ) => (
              <BlogItem
                index={index}
                key={id}
                id={id}
                title={title}
                previewText={previewText + "!!"}
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
        <div className="col-span-full scale-75 md:col-span-3 md:scale-100">
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

interface BlogListFallbackProps {
  itemViewType: "list" | "thumbnail";
}

function BlogListFallback({ itemViewType }: BlogListFallbackProps) {
  const arr = Array.from({ length: 12 }, (_, i) => i + 1);
  return (
    <div className="col-span-full grid h-fit grid-cols-3 gap-x-[1.5vw] md:col-span-3">
      <Skeleton
        className={cn("h-8 w-24", itemViewType === "thumbnail" && "mb-5")}
      />
      <div
        className={cn(
          "col-span-full",
          itemViewType === "thumbnail" &&
            "grid grid-cols-2 gap-x-[1.5vw] gap-y-[4.5vw] md:grid-cols-3",
        )}
      >
        {/* BLOGITEMS */}
        {arr.map((key) => (
          <BlogItemFallback key={key} itemViewType={itemViewType} />
        ))}

        {/* PAGE-NATION */}
        <div className="col-span-full scale-75 md:col-span-3 md:scale-100">
          <PagenationFallback />
        </div>
      </div>
    </div>
  );
}
