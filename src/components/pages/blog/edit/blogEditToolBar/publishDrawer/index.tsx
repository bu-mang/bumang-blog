"use client";

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
import { CategoryType, GroupType, RoleType, TagType } from "@/types";
import { cn } from "@/utils/cn";
import { SlateElement, YooEditor, YooptaContentValue } from "@yoopta/editor";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PATHNAME } from "@/constants/routes";
import { postCreatePost } from "@/services/api/blog/edit";
import { isAxiosError } from "axios";
import { html, plainText } from "@yoopta/exports";
import { useAuthStore } from "@/store/auth";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getThumbnailByGroup } from "@/utils/getThumnailByGroup";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { QUERY_KEY } from "@/constants/api/queryKey";

interface DrawerSheetProps {
  title: string;
  editorValue?: YooptaContentValue;
  selectedGroup: GroupType | null;
  selectedCategory: CategoryType | null;
  selectedTags: TagType[];
  editor: YooEditor;
  onSerialize: (type?: "html" | "plainText") => string | undefined;
}

export function PublishDrawer({
  title,
  editorValue,
  selectedGroup,
  selectedCategory,
  selectedTags,
  editor,
  onSerialize,
}: DrawerSheetProps) {
  const { fillStyle: DarkFillStyle, textStyle: DarkTextStyle } =
    getButtonColorStyle("dark");

  const user = useAuthStore((state) => state.user);
  const [readPermission, setReadPermission] = useState<RoleType>(null);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [previewText, setPreviewText] = useState("");

  const [open, setOpen] = useState(false);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);

  const router = useRouter();
  const postMutation = useMutation({
    mutationFn: postCreatePost,
    onSuccess: () => {
      router.replace(PATHNAME.BLOG);
      router.refresh();
    },
    onError: (error) => {
      if (!isAxiosError(error)) return;

      console.log(error.response?.config.data, "error.response?.config.data");
      console.log(error.message, "error.message");
    },
  });

  const handleChangeThumbnailIndex = (value: -1 | 1) => {
    setThumbnailIndex((prev) =>
      value === -1
        ? Math.max(prev + value, 0)
        : Math.min(prev + value, thumbnails.length - 1),
    );
  };

  // PUBLISH!!
  const handlePublish = async () => {
    const serializedHTML = onSerialize("html");
    const categoryId = selectedCategory?.id;
    const tagIds = selectedTags.map((item) => item.id);
    const thumbnailUrl = thumbnails[thumbnailIndex];

    // 로그인을 안 했을 때
    if (!user?.role) {
      toast.error("You didn't login.");
      return;
    }

    // 카테고리 미선택 시
    if (categoryId === undefined) {
      toast.error("Category and Group needed, Me!");
      return;
    }

    // 타이틀 미입력 시
    if (!title) {
      toast.error("Write Some Title, Me!");
      return;
    }

    // 본문 미입력 시
    if (!serializedHTML || !previewText) {
      toast.error("Write Some Contents, Me!");
      return;
    }

    postMutation.mutateAsync({
      title,
      content: serializedHTML,
      previewText,
      categoryId,
      tagIds,
      readPermission,
      thumbnailUrl,
    });
  };

  // string 직렬화해서 서버 패칭

  const getImages = (): string[] => {
    const data = editor.getEditorValue();
    const imageBlocks = Object.values(data).filter(
      (item) => item.type === "Image",
    );

    const imageUrls: string[] = [];

    imageBlocks.forEach((block) => {
      if (!block?.value || !Array.isArray(block.value)) return;

      block.value.forEach((element) => {
        // 타입 가드 추가
        if (element && typeof element === "object" && "props" in element) {
          const slateElement = element as SlateElement;
          const src = slateElement.props?.src;

          if (typeof src === "string" && src.trim()) {
            imageUrls.push(src);
          }
        }
      });
    });

    return imageUrls;
  };

  useEffect(() => {
    setThumbnails(getImages());
    setPreviewText((onSerialize("plainText") ?? "").slice(0, 200));
  }, [open]);

  // parsing해서 HTML로.
  // const getDeserializeHTML = () => {
  //   const content = html.deserialize(editor, serializedEditorValue);

  //   editor.setEditorValue(content);
  // };

  return (
    <Drawer
      onOpenChange={(e) => {
        setOpen(e);
      }}
    >
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
            <div className="relative flex aspect-video h-full flex-1 items-center justify-center overflow-hidden rounded-lg bg-gray-10 text-gray-200">
              {thumbnails.length > 0 || selectedGroup ? (
                <Image
                  src={
                    thumbnails?.[thumbnailIndex] ??
                    getThumbnailByGroup(selectedGroup?.label ?? "") ??
                    ""
                  } // thumbnails
                  alt="thumbnail Image"
                  fill
                  className="object-cover object-top"
                />
              ) : (
                <div className="flex flex-wrap items-center justify-center gap-1">
                  <span>Images in Article</span>
                  <span>or Group Selection</span>
                  <span> are Needed</span>
                </div>
              )}

              {thumbnails.length > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 h-8 w-8 shrink-0 rounded-full"
                  onClick={() => handleChangeThumbnailIndex(-1)}
                  disabled={false}
                >
                  <ArrowLeft />
                  <span className="sr-only">Decrease</span>
                </Button>
              )}

              {thumbnails.length > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 h-8 w-8 shrink-0 rounded-full"
                  onClick={() => handleChangeThumbnailIndex(1)}
                  disabled={false}
                >
                  <ArrowRight />
                  <span className="sr-only">Increase</span>
                </Button>
              )}
            </div>

            {/* Information */}
            <div className="flex flex-1 flex-col">
              <div className="flex-1">
                {/* TITLE */}
                <h1
                  className={cn(
                    "text-xl font-semibold tracking-tighter",
                    !title && "text-red-500",
                  )}
                >
                  {title ? title : "No Title"}
                </h1>

                {/* DESC */}
                <span
                  className={cn(!previewText && "font-medium text-red-500")}
                >
                  {previewText ? previewText : "No Description"}
                </span>

                {/* GROUP/CATEGORY */}
                <div className="flex gap-1 text-sm text-gray-200">
                  <span
                    className={cn(
                      !selectedGroup?.label && "font-bold text-red-500",
                    )}
                  >
                    {selectedGroup?.label ? selectedGroup.label : "No Group"}
                  </span>

                  <span>•</span>

                  <span
                    className={cn(
                      !selectedCategory?.label && "font-bold text-red-500",
                    )}
                  >
                    {selectedCategory?.label
                      ? selectedCategory.label
                      : "No Group"}
                  </span>
                </div>

                {/* TAGS */}
                <div className="pointer-events-none mt-3 flex gap-2">
                  {selectedTags.map((item) => {
                    return (
                      <Tag id={item.id} title={item.title} className="w-fit" />
                    );
                  })}
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
            <Button onClick={handlePublish}>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

// const getFirstImageUrl = (): string | undefined => {
//   const data = editor.getEditorValue();
//   const values = Object.values(data);
//   const target = values.find((item) => item.type === "Image");
//   const image: string | undefined = (target?.value?.[0] as SlateElement)
//     ?.props?.src;

//   return image;
// };
