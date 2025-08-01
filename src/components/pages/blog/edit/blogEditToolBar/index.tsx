"use client";

import { useEffect } from "react";
import { LuChevronLeft as ChevronLeftIcon } from "react-icons/lu";

import { getButtonColorStyle } from "@/utils/styles/filButtonManager";
import { cn } from "@/utils/cn";

import {
  TagCombobox,
  Divider,
  ComboBox,
  FillButton,
} from "@/components/common";
import { useRouter } from "@/i18n/navigation";
import { TagType, GroupType, CategoryType } from "@/types";
import DraftController from "../draftController";
import { YooEditor, YooptaContentValue } from "@yoopta/editor";
import { PublishDrawer } from "@/components/pages/blog/edit/blogEditToolBar/publishDrawer";
import { useTranslations } from "next-intl";
import { PATHNAME } from "@/constants/routes";

interface BlogEditorToolBarProps {
  // List
  groupLists: GroupType[];

  // Group
  selectedGroup: GroupType | null;
  onChangeSelectedGroup: (v: GroupType) => void;

  // Category
  selectedCategory: CategoryType | null;
  onChangeSelectedCategory: (v: CategoryType) => void;

  selectedTags: TagType[];
  unselectedTags: TagType[];
  handleSwitchTags: (v: {
    targetId: number;
    from: "selectedTags" | "unselectedTags";
  }) => void;

  // Draft
  isDraftOpen: boolean;
  handleDraftOpen: () => void;
  handleEditValues: (
    title: string,
    content: string | undefined,
    group: GroupType | null,
    category: CategoryType | null,
    tags: TagType[],
  ) => void;

  editorValue?: YooptaContentValue;
  title: string;

  editor: YooEditor;
  onSerialize: (type?: "html" | "plainText") => string | undefined;
  onDeserialize: (text: string) => void;
  onDisablePrevent: () => void;
}

const BlogEditorToolBar = ({
  groupLists,

  //
  selectedGroup,
  onChangeSelectedGroup,

  //
  selectedCategory,
  onChangeSelectedCategory,

  selectedTags,
  unselectedTags,
  handleSwitchTags,

  // Draft
  isDraftOpen,
  handleDraftOpen,
  handleEditValues,

  // publish
  title,
  editor,
  editorValue,
  onDisablePrevent,

  onSerialize,
  onDeserialize,
}: BlogEditorToolBarProps) => {
  // i18n
  const t = useTranslations("blogEdit");

  /**
   * @그룹_변경_시_카테고리_전환
   */
  useEffect(() => {
    const CategoriesInSelectedGroup = selectedGroup?.categories;
    if (CategoriesInSelectedGroup) {
      onChangeSelectedCategory(CategoriesInSelectedGroup[0]);
    }
    // eslint-disable-next-line
  }, [selectedGroup]);

  /**
   * @버튼_스타일
   */
  const {
    fillStyle: LightFillStyle,
    textStyle: LightTextStyle,
    flexBoxClass,
  } = getButtonColorStyle("light");

  /**
   * @뒤로가기_로직
   */
  const router = useRouter();
  const handleGoBack = () => {
    router.push(PATHNAME.BLOG);
  };

  return (
    <div className="fixed left-0 top-0 z-10 flex h-14 w-full border-b-[1px] border-gray-5 bg-white shadow-sm">
      {/* LEFT MODULE */}
      <div className="flex flex-1 items-center pl-4">
        <FillButton className={LightFillStyle} onClick={handleGoBack}>
          <div className={cn(flexBoxClass, "-translate-x-1")}>
            <ChevronLeftIcon className={LightTextStyle} />
            <span className={LightTextStyle}>{t("header.backToList")}</span>
          </div>
        </FillButton>
      </div>

      {/* CENTER MODULE */}
      <div className="flex w-7/12 items-center justify-center gap-3">
        {/* GROUP BOX */}
        <ComboBox<GroupType>
          selectedValue={selectedGroup}
          handleChangeSelectedValue={onChangeSelectedGroup}
          // 전체 리스트
          selectingList={groupLists ?? []}
          iconType="folder"
          placeholder={t("header.selectGroup.button")}
          searchPlaceholder={t("header.selectGroup.inputPlaceHolder")}
        />

        <Divider />

        {/* CATEGORY BOX */}
        <ComboBox<CategoryType>
          selectedValue={selectedCategory}
          handleChangeSelectedValue={onChangeSelectedCategory}
          // 전체 리스트
          selectingList={selectedGroup?.categories ?? []}
          iconType="menu"
          placeholder={t("header.selectCategory.button")}
          searchPlaceholder={t("header.selectCategory.inputPlaceHolder")}
        />

        <Divider />

        {/* TAG BOX */}
        <TagCombobox
          selectedTags={selectedTags}
          unselectedTags={unselectedTags}
          handleSwitchTags={handleSwitchTags}
        />
      </div>

      {/* RIGHT MODULE */}
      <div className="flex flex-1 items-center justify-end pr-4">
        <DraftController
          isDraftOpen={isDraftOpen}
          handleDraftOpen={handleDraftOpen}
          handleEditValues={handleEditValues}
          className="ml-2"
          title={title}
          content={editorValue}
          selectedGroup={selectedGroup}
          selectedCategory={selectedCategory}
          selectedTags={selectedTags}
          onSerialize={onSerialize}
          onDeserialize={onDeserialize}
        />
        <Divider className="ml-3" />

        {/* 발행 버튼 */}
        <PublishDrawer
          editor={editor}
          // 타이틀
          title={title}
          // 본문 => previewText, thumbnail
          editorValue={editorValue}
          // group,
          selectedGroup={selectedGroup}
          selectedCategory={selectedCategory}
          // tags
          selectedTags={selectedTags}
          onSerialize={onSerialize}
          onDisablePrevent={onDisablePrevent}
        />
      </div>
    </div>
  );
};

export default BlogEditorToolBar;
