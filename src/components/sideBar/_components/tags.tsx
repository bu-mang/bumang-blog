// import { LuChevronRight } from "react-icons/lu";
// import DropDown from "../common/dropdown";
// import useOverflow from "@/hooks/useOverflow";
// import { useRef, useState } from "react";
import Tag from "../../common/tags";

const Tags = () => {
  return (
    <div className="mt-8 flex w-full flex-col gap-2 px-2">
      <h4 className="text-lg font-semibold">Tags</h4>
      <div className="flex w-full flex-1 flex-wrap gap-2 pr-8">
        <Tag title={"asd"} type="button" onClick={() => {}} />
        <Tag title={"asd"} type="button" onClick={() => {}} />
        <Tag title={"asd"} type="button" onClick={() => {}} />
        <Tag title={"asd"} type="button" onClick={() => {}} />
        <Tag title={"asd"} type="button" onClick={() => {}} />
        <Tag title={"asd"} type="button" onClick={() => {}} />
        <Tag title={"asd"} type="button" onClick={() => {}} />
        <Tag title={"asd"} type="button" onClick={() => {}} />
        <Tag title={"asd"} type="button" onClick={() => {}} />
        <Tag title={"asd"} type="button" onClick={() => {}} />
        <Tag title={"asd"} type="button" onClick={() => {}} />
        <Tag title={"asd"} type="button" onClick={() => {}} />
        <Tag title={"asd"} type="button" onClick={() => {}} />
        <Tag title={"asd"} type="button" onClick={() => {}} />
        <Tag title={"asd"} type="button" onClick={() => {}} />
        <Tag title={"asd"} type="button" onClick={() => {}} />
        <Tag title={"asd"} type="button" onClick={() => {}} />
        <Tag title={"asd"} type="button" onClick={() => {}} />
        <Tag title={"asd"} type="button" onClick={() => {}} />
        <Tag title={"asd"} type="button" onClick={() => {}} />
        <Tag title={"asd"} type="button" onClick={() => {}} />
        <Tag title={"asd"} type="button" onClick={() => {}} />
      </div>
    </div>
  );
};

export default Tags;

// 드롭다운 state
// const options = ["All of Devs", "Frontend", "Backend", "CI/CD"];
// const [selected, setSelected] = useState(options[0]);
// const onSelect = (target: string) => {
//   setSelected(target);
// };

/* DROPDOWN
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
      // DIVIDER
      <div className="h-3 w-[1px] bg-gray-50" />
    </div>; 
  */
