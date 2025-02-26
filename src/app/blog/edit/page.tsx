"use client";

import { useEffect, useMemo, useState } from "react";
import YooptaEditor, {
  createYooptaEditor,
  YooptaContentValue,
  YooptaOnChangeOptions,
} from "@yoopta/editor";

import { Divider as DividerComp, Editor } from "@/components/common";
import { BlogPublishingView } from "@/components/pages";
import BlogEditorToolBar from "@/components/pages/blog/blogEditToolBar";
import useComboBox from "@/hooks/useComboBox";
import useTagComboBox from "@/hooks/useTagComboBox";
import { BlogStep, TagType } from "@/types";
import { SelectedDateType } from "@/types/date";
import { WITH_BASIC_INIT_VALUE } from "@/components/common/editor/initValue";

export default function BlogEdit() {
  /**
   * @FUNNEL
   */
  const [step, setStep] = useState(BlogStep.EDITTING);
  const handleStep = (v: BlogStep) => setStep(v);

  const editor = useMemo(() => createYooptaEditor(), []);
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

  /**
   * @MAIN_CATEGORIES
   */
  const {
    isOpen: isMainOpen,
    handleIsOpen: handleMainOpen,
    selectedValue: selectedMainValue,
    handleSelectedValue: handleSelectedMainValue,
  } = useComboBox({
    _name: "mainCategories",
  });

  /**
   * @SUB_SUBJECT
   */
  const {
    isOpen: isSubOpen,
    handleIsOpen: handleSubOpen,
    selectedValue: selectedSubValue,
    handleSelectedValue: handleSelectedSubValue,
  } = useComboBox({
    _name: "subCategories",
  });

  /**
   * @TAGS
   */
  const selectedArr: TagType[] = [
    { id: "a1", value: "abc", label: "abc" },
    { id: "a2", value: "def", label: "def" },
    { id: "a3", value: "ghi", label: "ghi" },
    { id: "a4", value: "www", label: "www" },
    { id: "a5", value: "eee", label: "eee" },
    { id: "a6", value: "aaa", label: "aaa" },
    { id: "a7", value: "bbb", label: "bbb" },
    { id: "a8", value: "ccc", label: "ccc" },
    { id: "a9", value: "dsd", label: "dsd" },
    { id: "a0", value: "nds", label: "nds" },
    { id: "a11", value: "psx", label: "psx" },
    { id: "a12", value: "tsn", label: "tsn" },
    { id: "a13", value: "vnf", label: "vnf" },
  ];
  const unselectedArr: TagType[] = [
    { id: "d1", value: "anf", label: "anf" },
    { id: "d2", value: "wmf", label: "wmf" },
    { id: "d3", value: "enf", label: "enf" },
    { id: "d4", value: "snd", label: "snd" },
    { id: "d5", value: "zkj", label: "zkj" },
    { id: "d6", value: "qna", label: "qna" },
    { id: "d7", value: "dmk", label: "dmk" },
    { id: "d8", value: "gka", label: "gka" },
    { id: "d9", value: "gka", label: "gka" },
    { id: "d0", value: "1ks", label: "1ks" },
    { id: "d11", value: "3ms", label: "3ms" },
    { id: "d12", value: "qnd", label: "qnd" },
    { id: "d13", value: "poo", label: "poo" },
  ];

  const {
    isOpen: isTagOpen,
    handleIsOpen: handleIsTagOpen,
    handleSwitch: handleSwitchTag,
    selected: selectedTags,
    unselected: unslectedTag,
  } = useTagComboBox({
    _name: "tags",
    selectedArr,
    unselectedArr,
  });

  /**
   * @DRAFT
   */
  const [isDraftOpen, setIsDraftOpen] = useState(false);
  const handleDraftOpen = () => setIsDraftOpen((prev) => !prev);
  const handleEditorValue = (title: string, content: YooptaContentValue) => {
    console.log(title, content);
  };

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
    console.log(selectedDateType, "selectedDateType");
  }, [selectedDateType]);

  // Step Changing
  // useEffect(() => {
  //   setTimeout(() => setStep(BlogStep.PUBLISHING), 2000);
  // }, []);

  return (
    <main className="flex min-h-screen w-full flex-col">
      {step === BlogStep.EDITTING && (
        <>
          {/* TOOLBAR */}
          <BlogEditorToolBar
            // MainCategory
            isMainOpen={isMainOpen}
            handleMainOpen={handleMainOpen}
            selectedMainValue={selectedMainValue}
            handleSelectedMainValue={handleSelectedMainValue}
            // SubCategory
            isSubOpen={isSubOpen}
            handleSubOpen={handleSubOpen}
            selectedSubValue={selectedSubValue}
            handleSelectedSubValue={handleSelectedSubValue}
            // Tags
            isTagOpen={isTagOpen}
            handleIsTagOpen={handleIsTagOpen}
            handleSwitchTag={handleSwitchTag}
            selectedTags={selectedTags}
            unslectedTag={unslectedTag}
            // Draft
            isDraftOpen={isDraftOpen}
            handleDraftOpen={handleDraftOpen}
            handleEditorValue={handleEditorValue}
          />

          <div className="flex w-full flex-1 justify-center px-[10vw] pt-24">
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
