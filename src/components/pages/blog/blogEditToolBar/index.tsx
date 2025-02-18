import { FillButton } from "@/components/common/button";
import ComboBox from "@/components/common/comboBox";
import useComboBox from "@/hooks/useComboBox";
import { cn } from "@/utils/cn";
import { getButtonColorStyle } from "@/utils/styles/filButtonManager";
import { useEffect, useState } from "react";
import {
  LuChevronLeft as ChevronLeftIcon,
  LuPlaneTakeoff as PublishPlaneButton,
} from "react-icons/lu";

import { CATEGORIES } from "@/constants/blogCategory";

const mainCatogories = CATEGORIES.filter((item) => item.parent === null);
const subCategories = CATEGORIES.filter((item) => item.parent !== null);

const BlogEditorToolBar = () => {
  const { fillStyle: LightFillStyle, textStyle: LightTextStyle } =
    getButtonColorStyle("light");
  const { fillStyle: DarkFillStyle, textStyle: DarkTextStyle } =
    getButtonColorStyle("dark");

  /**
   * @MAIN_CATEGORIES
   */
  const {
    isOpen: isMainOpen,
    handleIsOpen: handleMainIsOpen,
    selectedValue: selectedMainValue,
    handleSelectedValue: handleSelectedMainValue,
  } = useComboBox({
    _name: "mainCategories",
  });

  /**
   * @SUB_CATEGORIES
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

  return (
    <div className="fixed left-0 top-0 z-10 flex h-14 w-full border-b-[1px] border-gray-5 bg-white shadow-sm">
      <div className="flex flex-1 items-center pl-4">
        <FillButton className={cn("px-4", LightFillStyle)}>
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
          handleIsOpen={handleMainIsOpen}
          selectedValue={selectedMainValue}
          handleSelectedValue={handleSelectedMainValue}
          comboBoxlist={mainCatogories}
        />
        {/* TOPIC BOX */}
        <ComboBox
          isOpen={isSubOpen}
          handleIsOpen={handleSubOpen}
          selectedValue={selectedSubValue}
          handleSelectedValue={handleSelectedSubValue}
          comboBoxlist={subs}
        />
        {/* TAG BOX */}
      </div>
      <div className="flex flex-1 items-center justify-end pr-4">
        <FillButton className={cn("px-4", DarkFillStyle)}>
          <div className="flex items-center gap-2">
            <PublishPlaneButton className={DarkTextStyle} />
            <span className={DarkTextStyle}>Publish</span>
          </div>
        </FillButton>
      </div>
    </div>
  );
};

export default BlogEditorToolBar;
