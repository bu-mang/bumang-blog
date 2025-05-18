"use client";
import { PiHandsClappingDuotone as Clapping } from "react-icons/pi";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Eye,
  MessageCircle,
} from "lucide-react";

import {
  ButtonBase,
  Divider,
  Editor,
  Tag,
  TagWrapper,
} from "@/components/common";
import { BlogIndex, BlogItem, BlogComment } from "@/components/pages";

import { WITH_BASIC_INIT_VALUE } from "@/components/common/editor/initValue";

import { YooptaContentValue, YooptaOnChangeOptions } from "@yoopta/editor";
import { useState } from "react";
import Image from "next/image";

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
          <Tag id={1} title="design" />
          <Tag id={1} title="design" />
          <Tag id={1} title="design" />
          <Tag id={1} title="design" />
          <Tag id={1} title="design" />
          <Tag id={1} title="design" />
          <Tag id={1} title="design" />
          <Tag id={1} title="design" />
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
      <div className="col-start-1 col-end-12 mt-16 rounded-xl p-9">
        <div></div>
        <div className="flex justify-between">
          <ButtonBase className="group flex flex-col gap-1 font-medium text-gray-400 hover:text-gray-700">
            <div className="flex items-center gap-1.5">
              <ArrowLeft size={18} />
              <span className="text-sm font-semibold">Previous Post</span>
            </div>

            <span className="max-w-3/4 truncate text-left font-medium group-hover:underline">
              가나다라마바사
            </span>
          </ButtonBase>

          <ButtonBase className="group flex flex-col items-end gap-1 text-gray-400 hover:text-gray-900">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold">Next Post</span>
              <ArrowRight size={18} />
            </div>

            <span className="max-w-3/4 flex justify-end truncate font-medium group-hover:underline">
              가나다라마바사
            </span>
          </ButtonBase>
        </div>
      </div>

      {/* 이 카테고리의 다른 글 */}
      <div className="col-start-1 col-end-12 grid grid-cols-9 gap-x-[1.5vw]">
        <div className="col-span-9 flex justify-center gap-2 pb-8 text-2xl font-semibold text-gray-900">
          <span>More Articles in</span>
          <ButtonBase className="transition-all hover:underline">
            React
          </ButtonBase>
        </div>

        {[1, 2, 3].map((item) => {
          return (
            <div className="group col-span-3" key={item}>
              <BlogItem
                title={
                  "이것은 제목입니다. 리엑트 네이티브에 에러바운더리를 쓰는 방법? 지금 알려드리죠"
                }
                content={
                  "컨텐츠 이것은 제목입니다. 리엑트 네이티브에 에러바운더리를 쓰는 방법? 지금 알려드리죠 이것은 제목입니다. 리엑트 네이티브에 에러바운더리를 쓰는 방법? 지금 알려드리죠"
                }
                categoryValue={"프론트엔드"}
                tags={[
                  { value: "Value", label: "Label", id: "abc" },
                  { value: "Value", label: "Label", id: "abc" },
                  { value: "Value", label: "Label", id: "abc" },
                ]}
                date={new Date()}
                id={10}
                imageUrl={""}
                size="lg"
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
