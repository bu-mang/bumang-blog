"use client";
import { TagType } from "@/types";
import { sortStringOrder } from "@/utils/sortTagOrder";
import { useState } from "react";

interface TagComboBoxProps {
  tags: TagType[];
  _name: string;
}

const useTagComboBox = ({ _name, tags }: TagComboBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [unselectedTags, setUnselectedTags] = useState<TagType[]>(tags);

  const handleIsOpen = () => setIsOpen((prev) => !prev);

  const handleSwitchTags = ({
    targetId,
    from,
  }: {
    targetId: number;
    from: "selectedTags" | "unselectedTags";
  }) => {
    // 선택된 배얄에서 선택 안 된 배열로 보내기
    if (from === "selectedTags") {
      const foundIndex = selectedTags.findIndex((item) => item.id === targetId);
      if (foundIndex === -1) return;

      const newUnselectedTags = sortStringOrder([
        selectedTags[foundIndex],
        ...unselectedTags,
      ]);
      const newSelectedTags = [...selectedTags].filter(
        (item) => item.id !== selectedTags[foundIndex].id,
      );

      setSelectedTags(newSelectedTags);
      setUnselectedTags(newUnselectedTags);

      // 선택되지 않은 배얄에서 선택된 배열로 보내기
    } else if (from === "unselectedTags") {
      const foundIndex = unselectedTags.findIndex(
        (item) => item.id === targetId,
      );
      if (foundIndex === -1) return;

      const newSelectedTags = [unselectedTags[foundIndex], ...selectedTags];
      const newUnselectedTags = [...unselectedTags].filter(
        (item) => item.id !== unselectedTags[foundIndex].id,
      );

      setSelectedTags(newSelectedTags);
      setUnselectedTags(sortStringOrder(newUnselectedTags));
    }
  };

  return {
    // 열림 여부
    isOpen,
    handleIsOpen,

    // 스위칭 함수
    handleSwitchTags,

    // 결과
    selectedTags,
    unselectedTags,
  };
};

export default useTagComboBox;
