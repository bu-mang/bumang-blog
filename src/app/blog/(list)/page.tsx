import { SectionLabel, Pagenation } from "@/components/common";
import { BlogItem } from "@/components/pages";
import { getAllPosts } from "@/services/api/blog/(list)/server";
import { PaginatedResponseDto, PostListItemType } from "@/types";
import { cn } from "@/utils/cn";

interface PageProps {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Blog({ searchParams }: PageProps) {
  let allPosts: null | PaginatedResponseDto<PostListItemType> = null;
  let itemViewType: "list" | "thumbnail" =
    searchParams.view === "list" ? "list" : "thumbnail";

  try {
    allPosts = await getAllPosts();
    console.log(allPosts);
  } catch (err) {
    console.log(allPosts, err, "allPost error");
  }

  return (
    <div className="col-span-3 grid h-fit grid-cols-3 gap-x-[1.5vw]">
      <SectionLabel title="PageTitle" amount={0} />
      <div
        className={cn(
          "col-span-3",
          itemViewType === "thumbnail" &&
            "grid grid-cols-3 gap-x-[1.5vw] gap-y-[4.5vw]",
        )}
      >
        {/* BLOGITEMS */}

        {allPosts?.data?.map(
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
        )}

        {/* PAGE-NATION */}
        <div className="col-span-3">
          <Pagenation />
        </div>
      </div>
    </div>
  );
}
