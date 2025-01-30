"use client";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";

interface DropDownProps {
  isOpen: boolean;
  toggleDropdown: () => void;

  children: React.ReactNode;
  position: "top" | "bottom" | "left" | "right";

  selected: string;
  handleSelected: (title: string) => void;
  alignCentered?: boolean;

  items: string[];
  onChangeSelect: () => void;
}

const DropDownContext = createContext<Pick<
  DropDownProps,
  | "isOpen"
  | "position"
  | "toggleDropdown"
  | "handleSelected"
  | "selected"
  | "alignCentered"
> | null>(null);

const DropDown = ({
  children,
  position,
  onChangeSelect,
  alignCentered,
}: Pick<
  DropDownProps,
  "position" | "children" | "onChangeSelect" | "alignCentered"
>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const toggleDropdown = () => {
    onChangeSelect();
    setIsOpen((prev) => !prev);
  };

  const handleSelected = (title: string) => setSelected(title);

  const alignClass = clsx("relative flex justify-center", {
    ["flex-col"]: position === "top" || position === "bottom",
  });

  return (
    <DropDownContext.Provider
      value={{
        isOpen,
        toggleDropdown,
        position,
        handleSelected,
        selected,
        alignCentered,
      }}
    >
      <div className={alignClass}>{children}</div>
    </DropDownContext.Provider>
  );
};

const DefaultTriggerUi = ({ title }: { title: string }) => {
  const context = useContext(DropDownContext);

  return (
    <Button
      onClick={context?.toggleDropdown}
      className="flex h-fit gap-1 rounded-8 bg-gray-1 px-2 py-1 text-sm text-gray-200"
    >
      <div>{title}</div>
      <RiArrowDownSFill className="text-xs" />
    </Button>
  );
};

interface ItemProps {
  children: React.ReactNode;
}

export const Item = ({ children }: ItemProps) => {
  const context = useContext(DropDownContext);

  context?.handleSelected;
  return <div>{children}</div>;
};

interface MenuProps {
  children: React.ReactNode;
}

export const Menu = ({ children }: MenuProps) => {
  const context = useContext(DropDownContext);

  const menuClass = clsx("absolute z-50 bg-white h-fit shadow-md", {
    ["top-0 bottom-0 m-auto"]: context?.alignCentered,
    [`left-full ml-2`]: context?.position === "right",
    ["right-full mr-2"]: context?.position === "left",
    ["top-full mt-2"]: context?.position === "bottom",
  });

  if (!context?.isOpen) return null; // `isOpen`이 false면 렌더링 안 함!

  return <div className={menuClass}>{children}</div>;
};

DropDown.DefaultTriggerUi = DefaultTriggerUi;
DropDown.Item = Item;
DropDown.Menu = Menu;

export default DropDown;
