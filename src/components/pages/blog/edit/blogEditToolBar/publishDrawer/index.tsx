"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { LuPlaneTakeoff as PublishPlaneIcon } from "react-icons/lu";
import { getButtonColorStyle } from "@/utils/styles/filButtonManager";
import { Tag } from "../../../../../common/tag";
import { ButtonBase } from "../../../../../common/button";
import { RoleType } from "@/types";
import { cn } from "@/utils/cn";

interface DrawerSheetProps {
  onPublish: () => Promise<void>;
}

export function PublishDrawer({ onPublish }: DrawerSheetProps) {
  const { fillStyle: DarkFillStyle, textStyle: DarkTextStyle } =
    getButtonColorStyle("dark");

  const [readPermission, setReadPermission] = React.useState<RoleType>(null);

  return (
    <Drawer>
      {/* TRIGGER */}
      <DrawerTrigger asChild className="ml-8">
        <Button variant="outline" className={DarkFillStyle}>
          <PublishPlaneIcon className={DarkTextStyle} />
          <span className={DarkTextStyle}>Publish</span>
        </Button>
      </DrawerTrigger>

      {/* CONTENT */}
      <DrawerContent>
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader className="mb-6">
            <DrawerTitle>Publication Setup</DrawerTitle>
            <DrawerDescription>
              Complete the settings before publishing your post.
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex gap-4 px-4">
            {/* Thumbnail */}
            <div className="flex aspect-video h-full flex-1 rounded-lg bg-gray-10" />

            {/* Information */}
            <div className="flex flex-1 flex-col">
              <div className="flex-1">
                {/* TITLE */}
                <h1 className="text-xl font-semibold tracking-tighter">
                  Title of The Post
                </h1>

                {/* DESC */}
                <span>Description of the Post in one line...</span>

                {/* GROUP/CATEGORY */}
                <div className="flex gap-1 text-sm text-gray-200">
                  <span>Group Name</span>
                  <span>•</span>
                  <span>Category Name</span>
                </div>

                {/* TAGS */}
                <div className="pointer-events-none mt-3 flex gap-2">
                  <Tag id={1} title="title" className="w-fit" />
                  <Tag id={1} title="title" className="w-fit" />
                  <Tag id={1} title="title" className="w-fit" />
                </div>
              </div>

              <div>
                <div className="mb-1 font-medium">Read Permission</div>
                <div className="relative flex overflow-hidden rounded-lg border border-gray-50">
                  <ButtonBase
                    className={cn(
                      "flex-1 py-2 transition-all active:scale-100",
                      readPermission === null && "text-white",
                    )}
                    onClick={() => setReadPermission(null)}
                  >
                    Public
                  </ButtonBase>

                  <ButtonBase
                    className={cn(
                      "flex-1 py-2 transition-all active:scale-100",
                      readPermission === "user" && "text-white",
                    )}
                    onClick={() => setReadPermission("user")}
                  >
                    Logged In User
                  </ButtonBase>

                  <ButtonBase
                    className={cn(
                      "flex-1 py-2 transition-all active:scale-100",
                      readPermission === "admin" && "text-white",
                    )}
                    onClick={() => setReadPermission("admin")}
                  >
                    Admin only
                  </ButtonBase>

                  {/* BACKGROUND */}
                  <div
                    className={cn(
                      "absolute -z-[1] flex h-full w-1/3 bg-gray-800 transition-all",
                      readPermission === null && "translate-x-0",
                      readPermission === "user" && "translate-x-full",
                      readPermission === "admin" && "translate-x-[200%]",
                      "will-change-transform",
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
