"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";

import { LuPlus } from "react-icons/lu";
import { Divider, Tag, TagWrapper } from "@/components/common";
import type { TagProps } from "@/types";
import { CommandItem } from "cmdk";

interface TagBoxProps {
  isOpen: boolean;
  handleIsOpen: (v: boolean) => void;

  handleSwitch: (props: {
    targetId: string;
    from: "selected" | "unselected";
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
  return (
    <Popover open={isOpen} onOpenChange={handleIsOpen}>
      {/* TRIGGER */}
      <PopoverTrigger asChild>
        {/* TODO: selected 있을 때 없을 때 View 바꾸기 */}
        <div className="group flex h-10 min-w-40 cursor-pointer items-center justify-center gap-2 rounded-md transition-all hover:bg-gray-5">
          <div className="flex items-center gap-1.5 text-sm">
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
              {selected.length > 0 &&
                selected.map((tagItem) => (
                  <CommandItem key={tagItem.id}>
                    <Tag
                      key={tagItem.id}
                      id={tagItem.id}
                      value={tagItem.value}
                      label={tagItem.label}
                      fixedBgColor="dark"
                      isActivated={true}
                      type="button"
                      onClick={() => {
                        handleSwitch({
                          targetId: tagItem.id,
                          from: "selected",
                        });
                      }}
                    />
                  </CommandItem>
                ))}
            </TagWrapper>
          </div>

          {/* INPUT */}
          <CommandInput />

          {/* COMMAND_LIST */}
          <CommandList>
            <CommandEmpty>No Tag found.</CommandEmpty>

            {/* UNSELECTED_LIST */}
            <CommandGroup className="flex">
              <div className="flex flex-wrap gap-2 p-1">
                {unselected.length > 0 &&
                  unselected.map((tagItem) => (
                    <CommandItem className="flex w-fit" key={tagItem.id}>
                      <Tag
                        key={tagItem.id}
                        id={tagItem.id}
                        value={tagItem.value}
                        label={tagItem.label}
                        fixedBgColor={"lightGray"}
                        isActivated={false}
                        type="button"
                        onClick={() =>
                          handleSwitch({
                            targetId: tagItem.id,
                            from: "unselected",
                          })
                        }
                      />
                    </CommandItem>
                  ))}
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TagCombobox;
