"use client";

import { Tag, TagWrapper } from "@/components/common";
import { TagType } from "@/types";

interface TagWrapperLayerProps {
  tags: TagType[] | null;
}

const TagWrapperLayer = ({ tags }: TagWrapperLayerProps) => {
  return (
    <TagWrapper className="pr-8">
      {tags?.map((tag) => {
        return <Tag key={tag.id} id={tag.id} title={tag.title} type="button" />;
      })}
    </TagWrapper>
  );
};

export default TagWrapperLayer;
