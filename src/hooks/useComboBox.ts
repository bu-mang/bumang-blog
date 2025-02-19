import { useState } from "react";

interface ComboBoxProps {
  _name?: string;
}

const useComboBox = ({ _name }: ComboBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleIsOpen = (v?: boolean) => {
    if (v !== undefined) {
      setIsOpen(v);
      return;
    }
    setIsOpen((prev) => !prev);
  };

  const handleSelectedValue = (v: string) => {
    setSelectedValue(v);
  };

  return {
    // 노출 여부
    isOpen,
    handleIsOpen,

    // 선택 값
    selectedValue,
    handleSelectedValue,
  };
};

export default useComboBox;
