"use client";

import { Divider, Editor, Tag, TagWrapper } from "@/components/common";
import { WITH_BASIC_INIT_VALUE } from "@/components/common/editor/initValue";
import { BlogIndex } from "@/components/pages";
import { YooptaContentValue, YooptaOnChangeOptions } from "@yoopta/editor";
import { useState } from "react";

export default function BlogDetail() {
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

  return (
    <>
      <div className="col-start-3 col-end-9 flex h-fit flex-col justify-center gap-x-[1.5vw]">
        <TagWrapper as="collapsible" align="center">
          <Tag id="1" value="design" label="Design1" />
          <Tag id="1" value="design" label="Design2" />
          <Tag id="1" value="design" label="Design3" />
          <Tag id="1" value="design" label="Design4" />
          <Tag id="1" value="design" label="Design5" />
          <Tag id="1" value="design" label="Design6" />
          <Tag id="1" value="design" label="Design7" />
          <Tag id="1" value="design" label="Design8" />
        </TagWrapper>
        <div className="mb-20 mt-4 flex text-center text-6xl font-semibold leading-tight">
          When The Title of this Article is too long
        </div>

        {/* <Divider direction="horizontal" className="mt-8 w-full bg-gray-5" /> */}
        <Editor
          value={value}
          onChangeEditorValue={onChangeEditorValue}
          readOnly
        />
      </div>
      <div className="col-start-9 col-end-11">
        <BlogIndex />
      </div>
    </>
  );
}
