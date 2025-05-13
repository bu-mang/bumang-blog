"use client";

import { Check, ChevronDown } from "lucide-react";
import { FaFolder as Folder } from "react-icons/fa";
import { IoMenu as Menu } from "react-icons/io5";

import { cn } from "@/utils/cn";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { CategoryType, GroupType } from "@/types";
import { ButtonBase } from "../button";
import { useCallback, useState } from "react";

interface ComboBoxProps<T extends (GroupType | CategoryType) | null> {
  isOpen?: boolean;
  handleChangeIsOpen?: (v: boolean) => void;

  selectedValue: T | null;
  handleChangeSelectedValue: (v: T) => void;

  selectingList: T[];
  placeholder?: string;
  iconType?: "folder" | "menu";
}

function ComboBox<T extends (GroupType | CategoryType) | null>({
  isOpen,
  handleChangeIsOpen,

  selectingList,
  iconType = "folder",

  selectedValue,
  handleChangeSelectedValue,

  placeholder,
}: ComboBoxProps<T>) {
  // 내부 상태 (외부에서 'open' prop이 제공되지 않을 때만 사용)
  const [internalOpen, setInternalOpen] = useState(false);

  // isOpen을 내부에서 처리할지 외부에서 처리할지 (외부 제어 우선)
  const isOpenControlled = isOpen !== undefined;
  const isAdjustedOpen = isOpenControlled ? isOpen : internalOpen;

  // 외부에서 isOpen을 제어할 때 vs 내부에서 isOpen으로 제어할 때 스위칭해주는 함수
  const handleChangeAdjustedIsOpen = useCallback(
    (value: boolean) => {
      if (!isOpenControlled) {
        setInternalOpen(value);
      }

      handleChangeIsOpen?.(value);
    },
    [isOpenControlled, handleChangeIsOpen],
  );

  // 태그 리스트에서 태그 선택할 때
  const onSelectTag = (currentValue: string) => {
    const target = selectingList.find((item) => item?.label === currentValue);
    if (target) {
      handleChangeSelectedValue(target);
    }
    handleChangeAdjustedIsOpen(false);
  };

  return (
    <Popover open={isAdjustedOpen} onOpenChange={handleChangeAdjustedIsOpen}>
      <PopoverTrigger asChild>
        <ButtonBase
          role="combobox"
          aria-expanded={isOpen}
          className="flex min-w-40 items-center justify-between gap-3 rounded-md p-2 hover:bg-gray-5"
        >
          <div className="flex items-center gap-1.5">
            {iconType === "folder" && (
              <Folder size="14" className="text-gray-100" />
            )}
            {iconType === "menu" && (
              <Menu size="16" className="text-gray-100" />
            )}
            <span className="text-sm">
              {selectedValue
                ? selectingList.find(
                    (listItem) => listItem?.label === selectedValue?.label,
                  )?.label
                : (placeholder ?? "Select listItem...")}
            </span>
          </div>
          <ChevronDown size="16" className="text-gray-500 opacity-50" />
        </ButtonBase>
      </PopoverTrigger>

      {/* 컨텐츠 */}
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Category..." className="h-9" />
          <CommandList>
            <CommandEmpty>No listItem found.</CommandEmpty>
            <CommandGroup>
              {selectingList.map((listItem) => (
                <CommandItem
                  className="text-sm"
                  key={listItem?.label}
                  value={listItem?.label}
                  onSelect={onSelectTag}
                >
                  {listItem?.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedValue?.label === listItem?.label
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ComboBox;
