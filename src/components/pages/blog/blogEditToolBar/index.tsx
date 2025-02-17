import { FillButton } from "@/components/common/button";

const BlogEditorToolBar = () => {
  return (
    <div className="fixed left-0 top-0 flex h-14 w-full bg-white">
      <div className="flex flex-1 items-center bg-fuchsia-300 pl-4">
        <FillButton className="px-4">asd</FillButton>
      </div>
      <div className="flex h-full w-1/2 items-center bg-cyan-600">
        <></>
      </div>
      <div className="flex flex-1 items-center justify-end bg-fuchsia-300 pr-4">
        <FillButton className="px-4">asd</FillButton>
      </div>
    </div>
  );
};

export default BlogEditorToolBar;

{
  /* <DropDown.Context
          options={["1", "2", "3"]}
          selectedValue={"1"}
          onSelect={() => {}}
        >
          <DropDown.Trigger />
          <DropDown.Menu>
            <DropDown.Option target="1">1</DropDown.Option>
            <DropDown.Option target="2">2</DropDown.Option>
            <DropDown.Option target="3">3</DropDown.Option>
          </DropDown.Menu>
        </DropDown.Context> */
}
