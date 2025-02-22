import { useEffect, useRef, useState } from "react";
import {
  LuChevronLeft as ChevronLeftIcon,
  LuPlaneTakeoff as PublishPlaneIcon,
} from "react-icons/lu";

import useComboBox from "@/hooks/useComboBox";
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
import useTagComboBox from "@/hooks/useTagComboBox";
import { TagType } from "@/types";

const mainCatogories = CATEGORIES.filter((item) => item.parent === null);
const subCategories = CATEGORIES.filter((item) => item.parent !== null);

const BlogEditorToolBar = () => {
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
  const { isOpen, handleIsOpen, handleSwitch, selected, unselected } =
    useTagComboBox({
      _name: "tags",
      selectedArr,
      unselectedArr,
    });

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
          isOpen={isOpen}
          handleIsOpen={handleIsOpen}
          handleSwitch={handleSwitch}
          selected={selected}
          unselected={unselected}
        />
        {/* TODO: ADJUST COMMAND TO TAG BOX... */}
      </div>

      {/* RIGHT MODULE */}
      <div className="flex flex-1 items-center justify-end pr-4">
        <FillButton className={cn("px-4", DarkFillStyle)}>
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
