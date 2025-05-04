import { SectionLabel, Pagenation } from "@/components/common";
import { BlogItem } from "@/components/pages";
import { blogItems } from "@/constants/blogItems";

export default function Blog() {
  return (
    <div className="col-span-3 grid h-fit grid-cols-3 gap-x-[1.5vw]">
      <SectionLabel title="PageTitle" amount={0} isActionButtonOn />
      <div className="col-span-3 grid grid-cols-3 gap-x-[1.5vw] gap-y-[4.5vw]">
        {/* BLOGITEMS */}
        {blogItems.map(
          ({ id, title, content, categoryValue, tags, date, imageUrl }) => (
            <BlogItem
              key={id}
              id={id}
              title={title}
              content={content}
              categoryValue={categoryValue}
              tags={tags}
              date={date}
              imageUrl={imageUrl}
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
