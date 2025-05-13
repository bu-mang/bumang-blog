"use client";

import { useEffect, useState } from "react";
import { YooptaContentValue, YooptaOnChangeOptions } from "@yoopta/editor";

import { Divider as DividerComp, Editor } from "@/components/common";
import { BlogPublishingView, BlogEditorToolBar } from "@/components/pages";

import { BlogStep, CategoryType, GroupType, TagType } from "@/types";
import { SelectedDateType } from "@/types/date";
import { cn } from "@/utils/cn";

import { WITH_BASIC_INIT_VALUE } from "@/components/common/editor/initValue";
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
  /**
   * @FUNNEL_LOGIC
   */
  const [step, setStep] = useState(BlogStep.EDITTING);
  const handleStep = (v: BlogStep) => setStep(v);

  /**
   * @EDITOR_LOGIC
   */
  const [value, setValue] = useState<YooptaContentValue>(WITH_BASIC_INIT_VALUE);

  const onChangeEditorValue = (
    value: YooptaContentValue,
    options: YooptaOnChangeOptions,
  ) => {
    setValue(value);
  };

  // ------------- 중앙부 그룹/카테고리/태그 -------------
  const [selectedGroup, setSelectedGroup] = useState<GroupType | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null,
  );

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

  // ------------- 우측 DRAFT 로직 -------------

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

  useEffect(() => {
    setTimeout(() => setStep(BlogStep.PUBLISHING), 2000);
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col">
      {step === BlogStep.EDITTING && (
        <>
          {/* TOOLBAR */}
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
          />

          <div
            className={cn(
              "flex w-full flex-1 justify-center pt-24",
              LAYOUT_PADDING_ALONGSIDE,
            )}
          >
            <form
              className="flex w-[720px] flex-col"
              // onSubmit={(e) => handleSubmit(e)}
            >
              {/* INPUT */}
              <textarea
                className="flex h-auto min-h-20 w-full resize-none flex-wrap overflow-hidden rounded-md border-none bg-transparent px-2 py-4 text-5xl font-semibold leading-normal outline-none transition-colors placeholder:text-gray-100 hover:bg-gray-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="A Legend has said that..."
                tabIndex={1}
                value={title}
                maxLength={48}
                onChange={handleChangeTitle}
              />

              {/* DIVIDER */}
              <DividerComp
                direction="horizontal"
                className={"w-full bg-gray-5"}
              />

              {/* EDITOR */}
              <Editor value={value} onChangeEditorValue={onChangeEditorValue} />
            </form>
          </div>
        </>
      )}

      {step === BlogStep.PUBLISHING && (
        <BlogPublishingView
          selectedTags={selectedTags}
          selectedDateType={selectedDateType}
          onChangeSelectedDateType={handleSelectedDateType}
          publishingDate={publishingDate}
          onChangePublishingDate={setPublishingDate}
          onChangeStep={handleStep}
        />
      )}
    </main>
  );
}
