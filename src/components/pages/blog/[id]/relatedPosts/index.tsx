"use client";

import { ButtonBase } from "@/components/common";
import { QUERY_KEY } from "@/constants/api/queryKey";
import { PATHNAME } from "@/constants/routes";
import { getAdjacentPosts, getRelatedPosts } from "@/services/api/blog/[id]";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import BlogItem from "../../(list)/blogItem";

interface RelatedPostInnerProps {
  id: number;
}

export default function RelatedPost({ id }: Partial<RelatedPostInnerProps>) {
  if (!id) {
    // FALLBACK
    return <></>;
  }

  return (
    <ErrorBoundary fallback={<></>}>
      <Suspense clientOnly fallback={<></>}>
        <RelatedPostInner id={id} />
      </Suspense>
    </ErrorBoundary>
  );
}

function RelatedPostInner({ id }: RelatedPostInnerProps) {
  const { data: relatedPosts } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_RELATED_POSTS(id),
    queryFn: () => getRelatedPosts(id),
  });

  const { data: adjacentPosts } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_ADJACENT_POSTS(id),
    queryFn: () => getAdjacentPosts(id),
  });

  console.log(relatedPosts, adjacentPosts, "relatedPosts, adjacentPosts");

  return (
    <>
      <div className="col-start-1 col-end-12 mt-16 rounded-xl p-9">
        <div className="flex justify-between">
          {/* 이전 */}
          <Link
            href={PATHNAME.BLOG + `/${adjacentPosts.previous.id}`}
            className="group flex flex-col gap-1 font-medium text-gray-400 hover:text-gray-700"
          >
            <div className="flex items-center gap-1.5">
              <ArrowLeft size={18} />
              <span className="text-sm font-semibold">Previous Post</span>
            </div>

            <span className="max-w-64 truncate text-left font-medium group-hover:underline">
              {adjacentPosts.previous.title}
            </span>
          </Link>

          {/* 이후 */}
          <Link
            href={PATHNAME.BLOG + `/${adjacentPosts.next.id}`}
            className="group flex flex-col items-end gap-1 text-gray-400 hover:text-gray-900"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold">Next Post</span>
              <ArrowRight size={18} />
            </div>

            <span className="flex max-w-64 justify-end truncate font-medium group-hover:underline">
              {adjacentPosts.next.title}
            </span>
          </Link>
        </div>
      </div>

      {/* 이 카테고리의 다른 글 */}
      <div className="col-start-1 col-end-12 grid grid-cols-9 gap-x-[1.5vw]">
        <div className="col-span-9 flex justify-center gap-2 pb-8 text-2xl font-semibold text-gray-900">
          <span>More Articles in</span>
          <ButtonBase className="transition-all hover:underline">
            React
          </ButtonBase>
        </div>

        {relatedPosts.map(
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
          }) => {
            return (
              <div className="group col-span-3" key={id}>
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
                  itemViewType="thumbnail"
                />
              </div>
            );
          },
        )}
      </div>
    </>
  );
}
