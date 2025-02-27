"use client";

import { Divider, Editor, Tag, TagWrapper } from "@/components/common";
import { WITH_BASIC_INIT_VALUE } from "@/components/common/editor/initValue";
import { BlogIndex } from "@/components/pages";

import { YooptaContentValue, YooptaOnChangeOptions } from "@yoopta/editor";
import { PiHandsClappingDuotone as Clapping } from "react-icons/pi";
import {
  ArrowBigLeft,
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Calendar,
  Eye,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import BlogComment from "@/components/pages/blog/blogComment";

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

  // 댓글, 좋아요
  const handleScrollTo = (target: string) => {
    return;
  };

  return (
    <>
      {/* 본문 ARTICLE */}
      <div className="col-start-3 col-end-9 mb-10 flex h-fit flex-col justify-center gap-x-[1.5vw]">
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

        <div className="mt-2 flex text-center text-6xl font-semibold leading-tight">
          When The Title of this Article is too long
        </div>

        <div className="mb-12 mt-8 flex items-center justify-center">
          <div className="pointer-events-none flex w-20 items-center justify-center gap-2 text-sm text-gray-300">
            <Eye size={18} />
            <span>1,410</span>
          </div>

          <div className="group flex w-20 cursor-pointer items-center justify-center gap-2 text-sm text-gray-300 transition-all hover:scale-105">
            <Clapping size={18} className="group-hover:text-gray-600" />
            <span className="group-hover:text-gray-600">60</span>
          </div>

          <div className="group flex w-20 cursor-pointer items-center justify-center gap-2 text-sm text-gray-300 transition-all hover:scale-105">
            <MessageCircle size={18} className="group-hover:text-gray-600" />
            <span className="group-hover:text-gray-600">5</span>
          </div>

          <Divider className="mx-3" />

          <div className="pointer-events-none flex w-40 items-center justify-center gap-2 text-sm text-gray-300">
            <Calendar size={18} />
            <span>2025. 05. 10.</span>
          </div>
        </div>

        <Image
          alt="Thumnail"
          src=""
          className="mb-14 aspect-video w-full rounded-2xl bg-gray-100"
        />

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

      {/* 댓글 */}
      <BlogComment />

      {/* 이전글 읽기 / 다음글 읽기 */}
      <div className="col-start-3 col-end-9 mt-10 flex">
        <div className="flex flex-1">
          <ArrowLeftFromLine />
          <span>Prev</span>
        </div>
        <div className="flex flex-1 justify-end">
          <span>Next</span>
          <ArrowRightFromLine />
        </div>
      </div>

      {/* 이 카테고리의 다른 글 */}
      <div></div>
    </>
  );
}
