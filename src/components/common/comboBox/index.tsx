"use client";

import * as React from "react";
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
import type { CategoryNode } from "@/types";
import { ButtonBase } from "../button";

interface ComboBoxProps {
  isOpen: boolean;
  selectedValue: string | null;

  comboBoxlist: CategoryNode[];
  placeholder?: string;
  iconType?: "folder" | "menu";

  handleIsOpen: (v: boolean) => void;
  handleSelectedValue: (v: string) => void;
}

function ComboBox({
  isOpen,
  handleIsOpen,

  comboBoxlist,
  iconType = "folder",

  selectedValue,
  handleSelectedValue,

  placeholder,
}: ComboBoxProps) {
  return (
    <Popover open={isOpen} onOpenChange={handleIsOpen}>
      <PopoverTrigger asChild>
        <ButtonBase
          role="combobox"
          aria-expanded={isOpen}
          className="flex min-w-40 items-center justify-between gap-3 rounded-md p-2 transition-all hover:bg-gray-5"
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
                ? comboBoxlist.find(
                    (listItem) => listItem.value === selectedValue,
                  )?.label
                : (placeholder ?? "Select listItem...")}
            </span>
          </div>
          <ChevronDown size="16" className="text-gray-500 opacity-50" />
        </ButtonBase>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Category..." className="h-9" />
          <CommandList>
            <CommandEmpty>No listItem found.</CommandEmpty>
            <CommandGroup>
              {comboBoxlist.map((listItem) => (
                <CommandItem
                  className="text-sm"
                  key={listItem.value}
                  value={listItem.value}
                  onSelect={(currentValue) => {
                    handleSelectedValue(
                      currentValue === selectedValue ? "" : currentValue,
                    );
                    handleIsOpen(false);
                  }}
                >
                  {listItem.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedValue === listItem.value
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
