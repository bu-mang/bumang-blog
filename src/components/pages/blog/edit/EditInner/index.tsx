"use client";

import { useMemo, useState } from "react";
import {
  createYooptaEditor,
  SlateElement,
  YooptaContentValue,
  // YooptaOnChangeOptions,
} from "@yoopta/editor";

import { Divider, Editor } from "@/components/common";
import { BlogPublishingView, BlogEditorToolBar } from "@/components/pages";

import { BlogStep, CategoryType, GroupType, TagType } from "@/types";
import { SelectedDateType } from "@/types/date";
import { cn } from "@/utils/cn";

import { LAYOUT_PADDING_ALONGSIDE } from "@/constants/layouts/layout";
import { sortStringOrder } from "@/utils/sortTagOrder";
import { useMutation } from "@tanstack/react-query";
import { postCreatePost } from "@/services/api/blog/edit";
import { html, plainText } from "@yoopta/exports";
import { useRouter } from "next/navigation";
import { PATHNAME } from "@/constants/routes";
import { toast } from "react-toastify";
import CustomNotification from "@/components/common/customNotification";
import { isAxiosError } from "axios";
import { useAuthStore } from "@/store/auth";

interface BlogEditInnerProps {
  tagLists: TagType[];
  groupLists: GroupType[];
}

export default function BlogEditInner({
  tagLists,
  groupLists,
}: BlogEditInnerProps) {
  /**
   * @FUNNEL_LOGIC
   */
  const router = useRouter();
  const [step, setStep] = useState(BlogStep.EDITTING);
  const postMutation = useMutation({
    mutationFn: postCreatePost,
    onSuccess: () => router.replace(PATHNAME.BLOG),
    onError: (error) => {
      if (!isAxiosError(error)) return;

      console.log(error.response?.config.data, "error.response?.config.data");
      console.log(error.message, "error.message");
    },
  });

  const user = useAuthStore((state) => state.user);

  const handleStep = (v: BlogStep) => setStep(v);
  const handlePublish = async () => {
    const serializedHTML = getSerializeHTML("html");
    const previewText = (getSerializeHTML("plainText") ?? "").slice(0, 200);
    const categoryId = selectedCategory?.id;
    const tagIds = selectedTags.map((item) => item.id);
    const thumbnailUrl = getFirstImageUrl();
    const readPermission = null;

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

  // ------------- 중앙부 그룹/카테고리/태그 로직 (중앙) -------------

  // 그룹
  const [selectedGroup, setSelectedGroup] = useState<GroupType | null>(null);
  // 카테고리
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null,
  );
  // 태그
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [unselectedTags, setUnselectedTags] = useState<TagType[]>(tagLists);

  // 그룹 변경
  const handleChangeSelectedGroup = (v: GroupType) => {
    setSelectedGroup(v);
  };
  // 카테고리 변경
  const handleChangeSelectedCategory = (v: CategoryType) => {
    setSelectedCategory(v);
  };
  // 태그 변경
  const handleSwitchTags = ({
    targetId,
    from,
  }: {
    targetId: number;
    from: "selectedTags" | "unselectedTags";
  }) => {
    // 선택된 배얄에서 선택 안 된 배열로 보내기
    if (from === "selectedTags") {
      const foundIndex = selectedTags.findIndex((item) => item.id === targetId);
      if (foundIndex === -1) return;

      const newUnselectedTags = sortStringOrder([
        selectedTags[foundIndex],
        ...unselectedTags,
      ]);
      const newSelectedTags = [...selectedTags].filter(
        (item) => item.id !== selectedTags[foundIndex].id,
      );

      setSelectedTags(newSelectedTags);
      setUnselectedTags(newUnselectedTags);

      // 선택되지 않은 배얄에서 선택된 배열로 보내기
    } else if (from === "unselectedTags") {
      const foundIndex = unselectedTags.findIndex(
        (item) => item.id === targetId,
      );
      if (foundIndex === -1) return;

      const newSelectedTags = [unselectedTags[foundIndex], ...selectedTags];
      const newUnselectedTags = [...unselectedTags].filter(
        (item) => item.id !== unselectedTags[foundIndex].id,
      );

      setSelectedTags(newSelectedTags);
      setUnselectedTags(sortStringOrder(newUnselectedTags));
    }
  };

  // ------------- 임시저장 DRAFT 로직 (우측) -------------

  /**
   * @DRAFT
   */
  const [isDraftOpen, setIsDraftOpen] = useState(false);
  const handleDraftOpen = () => setIsDraftOpen((prev) => !prev);
  const handleEditorValue = (title: string, content: YooptaContentValue) => {
    console.log(title, content);
  };

  // ------------- 본문 로직 -------------

  /**
   * @TITLE_LOGIC
   */
  const [title, setTitle] = useState("");

  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "auto"; // 높이를 초기화한 후
    target.style.height = `${target.scrollHeight}px`;
  };

  /**
   * @EDITOR_LOGIC
   */
  // WITH_BASIC_INIT_VALUE
  const [editorValue, setEditorValue] = useState<YooptaContentValue>();
  // const [serializedEditorValue, setSerializedEditorValue] = useState("");

  const editor = useMemo(() => createYooptaEditor(), []);

  // parsing해서 HTML로.
  // const getDeserializeHTML = () => {
  //   const content = html.deserialize(editor, serializedEditorValue);

  //   editor.setEditorValue(content);
  // };

  // string 직렬화해서 서버 패칭
  const getSerializeHTML = (type: "html" | "plainText" = "html") => {
    const data = editor.getEditorValue();
    if (!data) return;

    if (type === "html") {
      const htmlString = html.serialize(editor, data);
      console.log(htmlString);

      return htmlString;
    }

    if (type === "plainText") {
      const plainString = plainText.serialize(editor, data);
      console.log(plainString);

      return plainString;
    }

    return;
  };

  const getFirstImageUrl = (): string | undefined => {
    const data = editor.getEditorValue();
    const values = Object.values(data);
    const target = values.find((item) => item.type === "Image");
    const image: string | undefined = (target?.value?.[0] as SlateElement)
      ?.props?.src;

    return image;
  };

  const onChangeEditorValue = (value: YooptaContentValue) => {
    setEditorValue(value);
  };

  /**
   * @DATE_LOGIC
   */
  const [publishingDate, setPublishingDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedDateType, setSelectedDateType] = useState<SelectedDateType>(
    SelectedDateType.rightNow,
  );
  const handleSelectedDateType = (v: SelectedDateType) =>
    setSelectedDateType(v);

  return (
    <main className="flex min-h-screen w-full flex-col">
      {step === BlogStep.EDITTING && (
        <>
          {/* 상단 헤더 (ToolBar) */}
          <BlogEditorToolBar
            // Group
            selectedGroup={selectedGroup}
            onChangeSelectedGroup={handleChangeSelectedGroup}
            groupLists={groupLists}
            // Category
            selectedCategory={selectedCategory}
            onChangeSelectedCategory={handleChangeSelectedCategory}
            // Tags
            selectedTags={selectedTags}
            unselectedTags={unselectedTags}
            handleSwitchTags={handleSwitchTags}
            // Draft
            isDraftOpen={isDraftOpen}
            handleDraftOpen={handleDraftOpen}
            handleEditorValue={handleEditorValue}
            // chageStep
            onChangeStep={handleStep}
          />

          {/* 본문 영역 */}
          <div
            className={cn(
              "flex w-full flex-1 justify-center pt-24",
              LAYOUT_PADDING_ALONGSIDE,
            )}
          >
            <div className="flex w-[720px] flex-col">
              {/* INPUT */}
              <textarea
                className="flex h-auto min-h-20 w-full resize-none flex-wrap overflow-hidden rounded-md border-none bg-transparent px-2 py-4 text-5xl font-semibold leading-normal outline-none transition-colors placeholder:text-gray-100 hover:bg-gray-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Title of Your Post here..."
                tabIndex={1}
                value={title}
                maxLength={48}
                onChange={handleChangeTitle}
              />

              {/* DIVIDER */}
              <Divider direction="horizontal" className={"w-full bg-gray-5"} />

              {/* EDITOR */}
              <Editor
                editor={editor}
                editorValue={editorValue}
                onChangeEditorValue={onChangeEditorValue}
              />
            </div>
          </div>
        </>
      )}

      {step === BlogStep.PUBLISHING && (
        <BlogPublishingView
          selectedTags={selectedTags}
          selectedDateType={selectedDateType}
          publishingDate={publishingDate}
          // onChageOptions
          onChangeSelectedDateType={handleSelectedDateType}
          onChangePublishingDate={setPublishingDate}
          // onChageStep
          onChangeStep={handleStep}
          // PUBLISH!
          onPublishing={handlePublish}
        />
      )}
    </main>
  );
}
