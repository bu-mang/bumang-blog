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
import { useRouter } from "next/navigation";
import { TagType, GroupType, CategoryType, BlogStep, RoleType } from "@/types";
import DraftController from "../draftController";
import { YooptaContentValue } from "@yoopta/editor";
import { PublishDrawer } from "@/components/pages/blog/edit/blogEditToolBar/publishDrawer";

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
  handleEditorValue: (title: string, content: YooptaContentValue) => void;

  onPublish: () => Promise<void>;
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
  handleEditorValue,

  // publish
  onPublish,
}: BlogEditorToolBarProps) => {
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
    if (window.history.length > 1) {
      router.back(); // 이전 페이지가 있으면 뒤로 가기
    } else {
      router.push("/"); // 없으면 홈으로 이동
    }
  };

  return (
    <div className="fixed left-0 top-0 z-10 flex h-14 w-full border-b-[1px] border-gray-5 bg-white shadow-sm">
      {/* LEFT MODULE */}
      <div className="flex flex-1 items-center pl-4">
        <FillButton className={LightFillStyle} onClick={handleGoBack}>
          <div className={cn(flexBoxClass, "-translate-x-1")}>
            <ChevronLeftIcon className={LightTextStyle} />
            <span className={LightTextStyle}>Back to List</span>
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
          placeholder={"Select Category..."}
        />

        <Divider />

        {/* CATEGORY BOX */}
        <ComboBox<CategoryType>
          selectedValue={selectedCategory}
          handleChangeSelectedValue={onChangeSelectedCategory}
          // 전체 리스트
          selectingList={selectedGroup?.categories ?? []}
          iconType="menu"
          placeholder={"Select Subject..."}
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
        {
          <span className="pointer-events-none text-sm text-gray-300">
            saving...
          </span>
        }
        <DraftController
          isDraftOpen={isDraftOpen}
          handleDraftOpen={handleDraftOpen}
          handleEditorValue={handleEditorValue}
          className="ml-2"
        />
        <Divider className="ml-3" />

        {/* 발행 버튼 */}
        <PublishDrawer
          onPublish={async () => {}}
          //
        />
      </div>
    </div>
  );
};

export default BlogEditorToolBar;
