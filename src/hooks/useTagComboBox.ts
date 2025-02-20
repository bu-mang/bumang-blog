"use client";
import { TagProps } from "@/types";
import { useState } from "react";

interface TagComboBoxProps {
  selectedArr: TagProps[];
  unselectedArr: TagProps[];
  _name: string;
}

const useTagComboBox = ({
  _name,
  selectedArr,
  unselectedArr,
}: TagComboBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<TagProps[]>(selectedArr);
  const [unselected, setUnselected] = useState<TagProps[]>(unselectedArr);

  const handleIsOpen = () => setIsOpen((prev) => !prev);

  const handleSwitch = ({
    targetId,
    from,
  }: {
    targetId: string;
    from: "selected" | "unselected";
  }) => {
    console.log("clicked at least???");
    // 선택된 배열에서 시작
    if (from === "selected") {
      const foundIndex = selected.findIndex((item) => item.id === targetId);
      if (foundIndex === -1) return;

      const newTo = [selected[foundIndex], ...unselected];
      const newFrom = [...selected].filter(
        (item) => item.id !== selected[foundIndex].id,
      );

      setSelected(newFrom);
      setUnselected(newTo);

      // 선택되지 않은 배얄에서 시작
    } else if (from === "unselected") {
      const foundIndex = unselected.findIndex((item) => item.id === targetId);
      if (foundIndex === -1) return;

      const newTo = [unselected[foundIndex], ...selected];
      const newFrom = [...unselected].filter(
        (item) => item.id !== unselected[foundIndex].id,
      );

      setSelected(newTo);
      setUnselected(newFrom);
    }
  };

  return {
    isOpen,
    handleIsOpen,
    handleSwitch,
    selected,
    unselected,
  };
};

export default useTagComboBox;
