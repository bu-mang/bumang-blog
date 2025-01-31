import { LuChevronRight } from "react-icons/lu";
import DropDown from "../common/dropdownContainer";
import Tag from "../common/tags";
import useOverflow from "@/hooks/useOverflow";
import { useRef, useState } from "react";

const FilterBar = () => {
  /**
   * Tag Width Size Logic
   */
  const tagsRef = useRef<HTMLDivElement | null>(null);
  const isOverflowing = useOverflow(tagsRef);
  console.log(isOverflowing, "isOverflowing");

  // 드롭다운 state
  const options = ["All of Devs", "Frontend", "Backend", "CI/CD"];
  const [selected, setSelected] = useState(options[0]);
  const onSelect = (target: string) => {
    setSelected(target);
  };
  // 태그 State
  // ...

  return (
    <div className="flex min-h-0 w-full items-center gap-2">
      <div className="relative z-10 flex items-center gap-2 bg-white">
        <DropDown
          position="bottom"
          selected={selected}
          options={options}
          onSelect={onSelect}
        >
          <DropDown.Trigger className="w-28" />
          <DropDown.Menu className="w-28">
            {options.map((option) => (
              <DropDown.Option key={option} target={option}>
                {option}
              </DropDown.Option>
            ))}
          </DropDown.Menu>
        </DropDown>

        {/* Divider */}
        <div className="h-3 w-[1px] bg-gray-50" />
      </div>
      <div className="flex flex-1 gap-2 overflow-x-hidden pr-8" ref={tagsRef}>
        <Tag title={"Frontend"} layout="label" type="button" />
        <Tag title={"asd"} type="button" />
        <Tag title={"asd"} type="button" />
        <Tag title={"asd"} type="button" />
        <Tag title={"asd"} type="button" />
        <Tag title={"asd"} type="button" />
        <Tag title={"Backend"} layout="label" type="button" />
        <Tag title={"asd"} type="button" />
        <Tag title={"asd"} type="button" />
        <Tag title={"asd"} type="button" />
        <Tag title={"asd"} type="button" />
        <Tag title={"asd"} type="button" />
        <Tag title={"asd"} type="button" />
        <Tag title={"asd"} type="button" />
        <Tag title={"asd"} type="button" />
        <Tag title={"asd"} type="button" />
        <Tag title={"asd"} type="button" />
        <Tag title={"asd"} type="button" />
        <Tag title={"asd"} type="button" />
        <Tag title={"asd"} type="button" />
        <Tag title={"asd"} type="button" />
        <Tag title={"asd"} type="button" />
        <Tag title={"asd"} type="button" />
        <Tag title={"asd"} type="button" />
      </div>
      {isOverflowing && (
        <div className="pointer-events-none absolute bottom-0 right-0 h-7 w-fit">
          <div className="h-full w-24 bg-gradient-to-r from-transparent via-white to-white" />
          <button className="pointer-events-auto absolute bottom-0 right-1 top-0 m-auto flex h-6 w-6 items-center justify-center rounded-full bg-gray-1 transition-all duration-100 hover:bg-gray-5">
            <LuChevronRight className="text-gray-300" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
