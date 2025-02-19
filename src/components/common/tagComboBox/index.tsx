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
import { Divider } from "@/components/common";
import type { IndicatorValues } from "@/types/category";

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
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {/* INPUT */}
          <CommandInput />
          <CommandInput />
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
