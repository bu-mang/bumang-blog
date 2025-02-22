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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CalendarIcon } from "lucide-react";

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
  const selectedLength = selected.length;
  const totalLength = unselected.length + selectedLength;

  // TODO: BOUNCE ANIMATION

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

          {/* HoverCard */}
          <HoverCard
            openDelay={200}
            closeDelay={200}
            open={isOpen ? false : undefined}
          >
            <HoverCardTrigger asChild>
              <div className="flex min-w-10 items-center justify-evenly gap-1 rounded-full bg-gray-600 px-2 py-0.5 shadow-md transition-transform group-hover:bg-gray-900">
                <span className="text-xs font-semibold text-white">
                  {selectedLength}
                </span>
                <Divider
                  size={18}
                  direction="vertical"
                  className="bg-gray-100"
                />
                <span className="text-xs font-semibold text-white">
                  {totalLength}
                </span>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="pointer-events-none w-80">
              {/* <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">@nextjs</h4>
                  <p className="text-sm">
                    The React Framework – created and maintained by @vercel.
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">
                      Joined December 2021
                    </span>
                  </div>
                </div>
              </div> */}
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-200">Selected Tags</span>
                <TagWrapper className="min-h-8 items-center rounded-sm bg-gray-1 p-2">
                  {selected.length > 0 &&
                    selected.map((tagItem) => (
                      <Tag
                        key={tagItem.id}
                        id={tagItem.id}
                        value={tagItem.value}
                        label={tagItem.label}
                        fixedBgColor="dark"
                        isActivated={true}
                        type="button"
                        hasXButton={false}
                        onClick={() => {
                          handleSwitch({
                            targetId: tagItem.id,
                            from: "selected",
                          });
                        }}
                      />
                    ))}
                </TagWrapper>
              </div>
            </HoverCardContent>
          </HoverCard>
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
