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
import type { TagType } from "@/types";
import { CommandItem } from "cmdk";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useTranslations } from "next-intl";

interface TagBoxProps {
  isOpen?: boolean;
  handleIsOpen?: (v: boolean) => void;

  selectedTags: TagType[];
  unselectedTags: TagType[];
  handleSwitchTags: (v: {
    targetId: number;
    from: "selectedTags" | "unselectedTags";
  }) => void;
}

const TagCombobox = ({
  isOpen,
  handleIsOpen,

  selectedTags,
  unselectedTags,
  handleSwitchTags,
}: TagBoxProps) => {
  const t = useTranslations("blogEdit");
  const selectedLength = selectedTags.length;
  const totalLength = unselectedTags.length + selectedLength;

  // TODO: BOUNCE ANIMATION

  return (
    <Popover open={isOpen} onOpenChange={handleIsOpen}>
      {/* TRIGGER */}
      <PopoverTrigger asChild>
        {/* TODO: selected 있을 때 없을 때 View 바꾸기 */}
        <div className="group flex h-10 min-w-40 cursor-pointer items-center justify-center gap-2 rounded-md transition-all hover:bg-gray-5 dark:hover:bg-gray-800">
          <div className="flex items-center gap-1.5 text-sm">
            <LuPlus className="text-gray-100" />
            <span>{t("header.addTags.button")}</span>
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

            {/* CONTENT */}
            <HoverCardContent className="pointer-events-none w-80">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-200">Selected Tags</span>
                <TagWrapper className="min-h-8 items-center rounded-sm bg-gray-1 p-2 dark:bg-gray-600">
                  {selectedTags.length > 0 &&
                    selectedTags.map((tagItem) => (
                      <Tag
                        key={tagItem.id}
                        id={tagItem.id}
                        title={tagItem.title}
                        fixedBgColor="dark"
                        isActivated={true}
                        type="button"
                        hasXButton={false}
                        onClick={() => {
                          handleSwitchTags({
                            targetId: tagItem.id,
                            from: "selectedTags",
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
        {/* SELECTED_LIST */}
        <div className="flex flex-col gap-1 border-b-[1px] p-2.5">
          <span className="text-xs text-gray-200">
            {t("header.addTags.selectedTags")}
          </span>
          <TagWrapper className="min-h-8 items-center rounded-sm bg-gray-1 p-2 dark:bg-gray-800">
            {selectedTags.length > 0 &&
              selectedTags.map((tagItem) => (
                <Tag
                  key={tagItem.id}
                  id={tagItem.id}
                  title={tagItem.title}
                  fixedBgColor="dark"
                  isActivated={true}
                  type="button"
                  onClick={() => {
                    handleSwitchTags({
                      targetId: tagItem.id,
                      from: "selectedTags",
                    });
                  }}
                />
              ))}
          </TagWrapper>
        </div>
        <Command>
          {/* INPUT */}
          <CommandInput placeholder={t("header.addTags.inputPlaceHolder")} />

          {/* COMMAND_LIST */}
          <CommandList>
            <CommandEmpty className="flex h-8 items-end justify-center rounded-sm text-sm text-gray-100">
              {t("header.addTags.noTags")}
            </CommandEmpty>

            {/* UNSELECTED_LIST */}
            <CommandGroup className="flex">
              <div className="flex flex-wrap gap-2 p-1">
                {unselectedTags.length > 0 &&
                  unselectedTags.map((tagItem) => (
                    <CommandItem className="flex w-fit" key={tagItem.id}>
                      <Tag
                        key={tagItem.id}
                        id={tagItem.id}
                        title={tagItem.title}
                        fixedBgColor={"lightGray"}
                        isActivated={false}
                        type="button"
                        onClick={() =>
                          handleSwitchTags({
                            targetId: tagItem.id,
                            from: "unselectedTags",
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
