import { useState } from "react";

interface ComboBoxProps {
  _name?: string;
}

const useComboBox = ({ _name }: ComboBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleChangeIsOpen = (v?: boolean) => {
    // 명시적인 값으로 설정할 때
    if (typeof v === "boolean") {
      setIsOpen(v);
      return;
    }

    // 자동적인 반대값으로 스위칭
    setIsOpen((prev) => !prev);
  };

  const handleSelectedValue = (v: string) => {
    setSelectedValue(v);
  };

  return {
    // 노출 여부
    isOpen,
    handleChangeIsOpen,

    // 선택한 값
    selectedValue,
    handleSelectedValue,
  };
};

export default useComboBox;
