"use client";

import { useMemo, useState } from "react";
import {
  createYooptaEditor,
  YooptaContentValue,
  // YooptaOnChangeOptions,
} from "@yoopta/editor";

import { Divider, Editor } from "@/components/common";
import { BlogEditorToolBar } from "@/components/pages";

import { CategoryType, GroupType, TagType } from "@/types";
import { cn } from "@/utils/cn";

import { LAYOUT_PADDING_ALONGSIDE } from "@/constants/layouts/layout";
import { sortStringOrder } from "@/utils/sortTagOrder";

interface BlogEditInnerProps {
  tagLists: TagType[];
  groupLists: GroupType[];
}

export default function BlogEditInner({
  tagLists,
  groupLists,
}: BlogEditInnerProps) {
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
  const editor = useMemo(() => createYooptaEditor(), []);

  const onChangeEditorValue = (value: YooptaContentValue) => {
    setEditorValue(value);
  };

  return (
    <main className="flex min-h-screen w-full flex-col">
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
        // PUBLISH!
        editorValue={editorValue}
        title={title}
        editor={editor}
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
    </main>
  );
}
