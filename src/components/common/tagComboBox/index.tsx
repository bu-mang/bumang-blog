"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { LuPlus } from "react-icons/lu";
import { Divider, Tag, TagWrapper } from "@/components/common";
import type { IndicatorValues } from "@/types/category";
import { useState } from "react";

interface TagBoxProps {
  isOpen: boolean;
  handleIsOpen: (v: boolean) => void;

  tagList: IndicatorValues[];

  selectedValues: string[];
  handleSelectedValue: (v: string) => void;
}

const TagCombobox = ({
  isOpen,
  handleIsOpen,

  tagList,

  selectedValues,
  handleSelectedValue,
}: TagBoxProps) => {
  //
  const [tagAStatus, setTagAStatus] = useState(true);
  const [tagBStatus, setTagBStatus] = useState(true);
  const [tagCStatus, setTagCStatus] = useState(true);
  const [tagDStatus, setTagDStatus] = useState(true);

  return (
    <Popover open={isOpen} onOpenChange={handleIsOpen}>
      {/* TRIGGER */}
      <PopoverTrigger asChild>
        <div className="group flex h-10 min-w-40 cursor-pointer items-center justify-center gap-2 rounded-md transition-all hover:bg-gray-5">
          <div className="flex items-center gap-1.5">
            <LuPlus className="text-gray-100" />
            <span>Add Tag</span>
          </div>
          <div className="flex min-w-10 items-center justify-evenly gap-1 rounded-full bg-gray-5 px-2 py-0.5 group-hover:bg-gray-50">
            <span className="text-xs">1</span>
            <Divider size={16} direction="vertical" />
            <span className="text-xs">3</span>
          </div>
        </div>
      </PopoverTrigger>
      {/* CONTENT */}
      <PopoverContent className="w-[320px] p-0">
        <Command>
          {/* TagSelected */}
          <div className="flex flex-col gap-1 border-b-[1px] p-2.5">
            <span className="text-xs text-gray-200">Selected Tags</span>
            <TagWrapper className="min-h-8 items-center rounded-sm bg-gray-1 p-2">
              <Tag
                value="asd"
                label="Asd"
                fixedBgColor="dark"
                isActivated={tagAStatus}
                setIsActivated={() => setTagAStatus((prev) => !prev)}
              />
              <Tag
                value="asd"
                label="Asd"
                fixedBgColor="dark"
                isActivated={tagAStatus}
                setIsActivated={() => setTagAStatus((prev) => !prev)}
              />
              <Tag
                value="asd"
                label="Asd"
                fixedBgColor="dark"
                isActivated={tagAStatus}
                setIsActivated={() => setTagAStatus((prev) => !prev)}
              />
              <Tag
                value="asd"
                label="Asd"
                fixedBgColor="dark"
                isActivated={tagBStatus}
                setIsActivated={() => setTagBStatus((prev) => !prev)}
              />
              <Tag
                value="asd"
                label="Asd"
                fixedBgColor="dark"
                isActivated={tagCStatus}
                setIsActivated={() => setTagCStatus((prev) => !prev)}
              />
              <Tag
                value="asd"
                label="Asd"
                fixedBgColor="dark"
                isActivated={tagDStatus}
                setIsActivated={() => setTagDStatus((prev) => !prev)}
              />
            </TagWrapper>
          </div>
          {/* INPUT */}
          <CommandInput />
          {/* COMMAND_LIST */}
          <CommandList>
            <CommandEmpty>No Tag found.</CommandEmpty>
            <CommandGroup>
              {tagList.map((listItem) => (
                <CommandItem
                  key={listItem.value}
                  value={listItem.value}
                  onSelect={(currentValue) => {
                    handleSelectedValue(
                      selectedValues.includes(currentValue) ? "" : currentValue,
                    );
                    handleIsOpen(false);
                  }}
                >
                  {listItem.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TagCombobox;

{
  /* <div className="flex w-full flex-1 flex-wrap gap-2 pr-8"></div> */
}
