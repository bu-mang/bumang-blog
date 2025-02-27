"use client";

import { Divider, Editor, Tag, TagWrapper } from "@/components/common";
import { WITH_BASIC_INIT_VALUE } from "@/components/common/editor/initValue";
import { BlogIndex } from "@/components/pages";
import { YooptaContentValue, YooptaOnChangeOptions } from "@yoopta/editor";
import { CalendarDays, Eye } from "lucide-react";
import { useState } from "react";
import { PiHandsClappingDuotone as Clapping } from "react-icons/pi";

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
      {/* 본문 ARTICLE */}
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
        <div className="mt-4 flex text-center text-6xl font-semibold leading-tight">
          When The Title of this Article is too long
        </div>
        <div className="mb-20 mt-4 flex items-center justify-center gap-4">
          <div className="pointer-events-none flex min-w-32 items-center justify-center gap-2 text-sm text-gray-300">
            <CalendarDays size={18} />
            <span>2025. 02. 10.</span>
          </div>
          <Divider />
          <div className="pointer-events-none flex min-w-32 items-center justify-center gap-2 text-sm text-gray-300">
            <Eye size={18} />
            <span>1,410</span>
          </div>
          <Divider />
          <div className="group flex min-w-32 cursor-pointer items-center justify-center gap-2 text-sm text-gray-300 transition-all hover:scale-105">
            <Clapping size={18} className="group-hover:text-gray-600" />
            <span className="group-hover:text-gray-600">60</span>
          </div>
        </div>
        <image className="aspect-video w-full rounded-2xl bg-gray-100" />

        {/* <Divider direction="horizontal" className="mt-8 w-full bg-gray-5" /> */}
        <Editor
          value={value}
          onChangeEditorValue={onChangeEditorValue}
          readOnly
        />
      </div>

      {/* 목차 */}
      <div className="col-start-9 col-end-11">
        <BlogIndex />
      </div>

      {/* 이전글 읽기 / 다음글 읽기 */}

      {/* 이 카테고리의 다른 글 */}

      {/* 댓글 */}
    </>
  );
}
