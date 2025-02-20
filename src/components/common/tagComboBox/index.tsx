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
import type { TagProps } from "@/types";

interface TagBoxProps {
  isOpen: boolean;
  handleIsOpen: (v: boolean) => void;

  handleSwitch: (props: {
    target: TagProps;
    from: TagProps[];
    to: TagProps[];
  }) => void;

  selected: TagProps[];
  unselected: TagProps[];
}

const TagCombobox = ({
  isOpen,
  handleIsOpen,

  handleSwitch,

  selected,
  unselected,
}: TagBoxProps) => {
  // const [layeredTagLists, setLayeredTagLists] = useState<{
  //   selected: TagProps[];
  //   unselected: TagProps[];
  // }>({
  //   selected: [],
  //   unselected: [],
  // });

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
          {/* SELECTED_LIST */}
          <div className="flex flex-col gap-1 border-b-[1px] p-2.5">
            <span className="text-xs text-gray-200">Selected Tags</span>
            <TagWrapper className="min-h-8 items-center rounded-sm bg-gray-1 p-2">
              {unselected.map((tagItem) => (
                <Tag
                  key={tagItem.id}
                  id={tagItem.id}
                  value="asd"
                  label="Asd"
                  fixedBgColor="dark"
                  isActivated={true}
                />
              ))}
            </TagWrapper>
          </div>

          {/* INPUT */}
          <CommandInput />

          {/* COMMAND_LIST */}
          <CommandList>
            <CommandEmpty>No Tag found.</CommandEmpty>

            {/* UNSELECTED_LIST */}
            <CommandGroup>
              {selected.map((listItem) => (
                // <ButtonBase
                //   key={listItem.value}
                //   // value={listItem.value}
                //   onClick={(currentValue) => {
                //     handleSwitch(
                //       selectedValues.includes(currentValue) ? "" : currentValue,
                //     );
                //     handleIsOpen(false);
                //   }}
                // >
                //   {listItem.label}
                // </ButtonBase>
                <div key={listItem.id} className="h-12 w-full">
                  <Tag
                    id={listItem.id}
                    value={listItem.value}
                    label={listItem.label}
                    fixedBgColor={listItem.fixedBgColor}
                    isActivated={false}
                  />
                </div>
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
