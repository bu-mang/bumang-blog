"use client";

import { Tag, TagWrapper } from "@/components/common";
import { TagType } from "@/types";
import { useSearchParams } from "next/navigation";

interface TagWrapperLayerProps {
  tags: TagType[] | null;
}

const TagWrapperLayer = ({ tags }: TagWrapperLayerProps) => {
  const params = useSearchParams();
  const tagIds = params.getAll("tagIds");

  return (
    <TagWrapper className="pr-8">
      {tags?.map((tag) => {
        return (
          <Tag
            key={tag.id}
            id={tag.id}
            title={tag.title}
            type="link"
            isActivated={tagIds.includes(`${tag.id}`)}
            hasXButton
          />
        );
      })}
    </TagWrapper>
  );
};

export default TagWrapperLayer;
