"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { CategoryNode } from "./type";

interface ComboBoxProps {
  isOpen: boolean;
  selectedValue: string | null;

  comboBoxlist: CategoryNode[];

  handleIsOpen: (v: boolean) => void;
  handleSelectedValue: (v: string) => void;
}

function ComboBox({
  isOpen,
  handleIsOpen,

  comboBoxlist,

  selectedValue,
  handleSelectedValue,
}: ComboBoxProps) {
  return (
    <Popover open={isOpen} onOpenChange={handleIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-[200px] justify-between"
        >
          {selectedValue
            ? comboBoxlist.find((listItem) => listItem.value === selectedValue)
                ?.label
            : "Select listItem..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Category..." className="h-9" />
          <CommandList>
            <CommandEmpty>No listItem found.</CommandEmpty>
            <CommandGroup>
              {comboBoxlist.map((listItem) => (
                <CommandItem
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
