"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { createContext, useContext, useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";

interface DropDownOuterProps {
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  alignCentered?: boolean;

  options: string[];
  selected: string;
  onSelect: (selected: string) => void;
}

interface DropDownInnerProps {
  isOpen: boolean;
  toggleDropdown: () => void;
  handleSelected: (title: string) => void;
}

const DropDownContext = createContext<
  | (Omit<DropDownOuterProps, "children" | "onSelect"> & DropDownInnerProps)
  | null
>(null);

const DropDown = ({
  children,
  position,
  alignCentered,

  options,
  selected,
  onSelect,
}: DropDownOuterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelected = (title: string) => {
    onSelect(title);
    toggleDropdown();
  };

  const alignClass = cn("relative flex justify-center", {
    ["flex-col"]: position === "top" || position === "bottom",
  });

  return (
    <DropDownContext.Provider
      value={{
        // OuterProps
        position,
        alignCentered,
        options,
        selected,

        // InnerProps
        isOpen,
        handleSelected,
        toggleDropdown,
      }}
    >
      <div className={alignClass}>{children}</div>
    </DropDownContext.Provider>
  );
};

const Trigger = ({ className }: { className?: string }) => {
  const context = useContext(DropDownContext);
  const triggerClass = cn(
    "flex h-fit min-w-20 justify-between gap-1 rounded-8 bg-gray-1 px-2.5 py-1 text-sm text-gray-200",
    className,
  );

  return (
    <Button onClick={context?.toggleDropdown} className={triggerClass}>
      {context?.selected}
      <RiArrowDownSFill className="text-xs" />
    </Button>
  );
};

export const Menu = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const context = useContext(DropDownContext);

  const menuClass = cn(
    "absolute z-50 flex h-fit flex-col rounded-lg border-[1px] border-gray-50 bg-white shadow-md overflow-hidden",
    {
      ["top-0 bottom-0 m-auto"]: context?.alignCentered,
      [`left-full ml-2`]: context?.position === "right",
      ["right-full mr-2"]: context?.position === "left",
      ["top-full mt-2"]: context?.position === "bottom",
    },
    className,
  );

  if (!context?.isOpen) return null; // `isOpen`이 false면 렌더링 안 함!

  return <div className={menuClass}>{children}</div>;
};

export const Option = ({
  children,
  target,
}: {
  children: React.ReactNode;
  target: string;
}) => {
  const context = useContext(DropDownContext);

  return (
    <button
      className="cursor-pointer px-2.5 py-1 text-sm text-gray-700 hover:bg-gray-1"
      onClick={() => context?.handleSelected(target)}
    >
      {children}
    </button>
  );
};

DropDown.Trigger = Trigger;
DropDown.Option = Option;
DropDown.Menu = Menu;

export default DropDown;
