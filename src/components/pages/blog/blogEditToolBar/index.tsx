import { useEffect, useRef, useState } from "react";
import {
  LuChevronLeft as ChevronLeftIcon,
  LuPlaneTakeoff as PublishPlaneIcon,
} from "react-icons/lu";

import { CATEGORIES } from "@/constants/blogCategory";
import { getButtonColorStyle } from "@/utils/styles/filButtonManager";
import { cn } from "@/utils/cn";

import {
  TagCombobox,
  Divider,
  ComboBox,
  FillButton,
} from "@/components/common";
import { useRouter } from "next/navigation";
import { TagProps } from "@/types";
import DraftController from "../draftController";
import { YooptaContentValue } from "@yoopta/editor";

const mainCatogories = CATEGORIES.filter((item) => item.parent === null);
const subCategories = CATEGORIES.filter((item) => item.parent !== null);

interface BlogEditorToolBarProps {
  // MainCategory
  isMainOpen: boolean;
  handleMainOpen: (v?: boolean) => void;
  selectedMainValue: string;
  handleSelectedMainValue: (v: string) => void;

  // SubCategory
  isSubOpen: boolean;
  handleSubOpen: (v?: boolean) => void;
  selectedSubValue: string;
  handleSelectedSubValue: (v: string) => void;

  // Tag
  isTagOpen: boolean;
  handleIsTagOpen: () => void;
  handleSwitchTag: ({
    targetId,
    from,
  }: {
    targetId: string;
    from: "selected" | "unselected";
  }) => void;
  selectedTags: TagProps[];
  unslectedTag: TagProps[];

  // Draft
  isDraftOpen: boolean;
  handleDraftOpen: () => void;
  handleEditorValue: (title: string, content: YooptaContentValue) => void;
}

const BlogEditorToolBar = ({
  // MainCategory
  isMainOpen,
  handleMainOpen,
  selectedMainValue,
  handleSelectedMainValue,

  // SubCategory
  isSubOpen,
  handleSubOpen,
  selectedSubValue,
  handleSelectedSubValue,

  // Tag
  isTagOpen,
  handleIsTagOpen,
  handleSwitchTag,
  selectedTags,
  unslectedTag,

  // Draft
  isDraftOpen,
  handleDraftOpen,
  handleEditorValue,
}: BlogEditorToolBarProps) => {
  /**
   * @CHANGE_SUBS_WHEN_MAIN_CHANGED
   */
  const [subs, setSubs] = useState(subCategories);
  useEffect(() => {
    const changed = subCategories.filter(
      (item) => item.parent === selectedMainValue,
    );
    setSubs(changed);
    handleSelectedSubValue("");
    // eslint-disable-next-line
  }, [selectedMainValue]);

  /**
   * @ADJUST_ORDER___TODO
   * 1. 만약 카테고리 선택이 안 되어있을 시 서브젝트 비활성화
   * 2. 카테고리 선택이 안 되어있을 때 서브젝트를 누르면 오히려 카테고리가 open
   * 3. 태그는 독립적으로 기능
   */
  const categoryRef = useRef<HTMLButtonElement>(null);
  const subjectRef = useRef<HTMLButtonElement>(null);
  const tagsRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    //
  }, []);

  /**
   * @BUTTON_STYLE_MANAGER
   */
  const { fillStyle: LightFillStyle, textStyle: LightTextStyle } =
    getButtonColorStyle("light");
  const { fillStyle: DarkFillStyle, textStyle: DarkTextStyle } =
    getButtonColorStyle("dark");

  /**
   * @HANDLECLICK
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
        <FillButton
          className={cn("px-4", LightFillStyle)}
          onClick={handleGoBack}
        >
          <div className="flex -translate-x-1 items-center gap-1.5">
            <ChevronLeftIcon className={LightTextStyle} />
            <span className={LightTextStyle}>Back to List</span>
          </div>
        </FillButton>
      </div>

      <div className="flex w-7/12 items-center justify-center gap-3">
        {/* CATEGORY BOX */}
        <ComboBox
          isOpen={isMainOpen}
          handleIsOpen={handleMainOpen}
          selectedValue={selectedMainValue}
          handleSelectedValue={handleSelectedMainValue}
          comboBoxlist={mainCatogories}
          iconType="folder"
          placeholder={"Select Category..."}
        />

        <Divider />

        {/* TOPIC BOX */}
        <ComboBox
          isOpen={isSubOpen}
          handleIsOpen={handleSubOpen}
          selectedValue={selectedSubValue}
          handleSelectedValue={handleSelectedSubValue}
          comboBoxlist={subs}
          iconType="menu"
          placeholder={"Select Subject..."}
        />

        <Divider />

        {/* TAG BOX */}
        <TagCombobox
          isOpen={isTagOpen}
          handleIsOpen={handleIsTagOpen}
          handleSwitch={handleSwitchTag}
          selected={selectedTags}
          unselected={unslectedTag}
        />
        {/* TODO: ADJUST COMMAND TO TAG BOX... */}
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
        <FillButton className={cn("ml-6 px-4", DarkFillStyle)}>
          <div className="flex items-center gap-2">
            <PublishPlaneIcon className={DarkTextStyle} />
            <span className={DarkTextStyle}>Publish</span>
          </div>
        </FillButton>
      </div>
    </div>
  );
};

export default BlogEditorToolBar;
