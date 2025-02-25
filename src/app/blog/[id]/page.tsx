"use client";

import { Divider, Editor } from "@/components/common";
import { YooptaContentValue, YooptaOnChangeOptions } from "@yoopta/editor";
import { useState } from "react";

export default function BlogDetail() {
  /**
   * @EDITOR_LOGIC
   */
  const [value, setValue] = useState<YooptaContentValue>();

  const onChangeEditorValue = (
    value: YooptaContentValue,
    options: YooptaOnChangeOptions,
  ) => {
    setValue(value);
  };

  return (
    <>
      <div className="col-start-3 col-end-9 flex h-fit flex-col justify-center gap-x-[1.5vw]">
        <span className="text-5xl font-semibold leading-tight">
          When The Title of this Article is too long
        </span>
        <Divider direction="horizontal" className="mt-8 w-full bg-gray-5" />
        <Editor
          value={value}
          onChangeEditorValue={onChangeEditorValue}
          readOnly
        />
      </div>
      <div className="col-start-9 col-end-13 bg-blue"></div>
    </>
  );
}
