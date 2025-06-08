"use client";

import {
  ButtonBase,
  Divider,
  Editor,
  Tag,
  TagWrapper,
} from "@/components/common";
import { createYooptaEditor, YooptaContentValue } from "@yoopta/editor";
import { useEffect, useMemo, useState } from "react";
import BlogIndex from "../(list)/blogIndex";

import {
  ArrowLeft,
  ArrowRight,
  // Calendar,
  // Eye,
  // MessageCircle,
} from "lucide-react";
// import { PiHandsClappingDuotone as Clapping } from "react-icons/pi";
import Image from "next/image";
import BlogComment from "./blogComment";
import { PostDetailResponseDto } from "@/types/dto/blog/[id]";
import { html } from "@yoopta/exports";
import RelatedPost from "./relatedPosts";

interface BlogDetailInnerProps {
  post: PostDetailResponseDto | null;
}

export default function BlogDetailInner({ post }: BlogDetailInnerProps) {
  /**
   * @EDITOR_LOGIC
   */
  // 댓글, 좋아요
  const handleScrollTo = (target: string) => {
    return;
  };

  const editor = useMemo(() => createYooptaEditor(), []);
  const [editorValue] = useState<YooptaContentValue>();

  // parsing해서 HTML로.
  const getDeserializeHTML = (text: string) => {
    const content = html.deserialize(editor, text);

    editor.setEditorValue(content);
  };

  useEffect(() => {
    getDeserializeHTML(post?.content ?? "내용 없음");
  }, []);

  return (
    <>
      {/* 본문 ARTICLE */}
      <div className="col-start-3 col-end-9 mb-10 flex h-fit flex-col justify-center gap-x-[1.5vw]">
        {post?.tags && (
          <TagWrapper as="collapsible" align="center">
            {post.tags.map((tag) => (
              <Tag id={tag.id} title={tag.label} key={tag.id} />
            ))}
          </TagWrapper>
        )}

        <div className="mb-10 mt-2 text-center text-6xl font-semibold leading-tight">
          {post?.title}
        </div>

        {/* <div className="mb-12 mt-8 flex items-center justify-center">
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
        </div> */}

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-md">
          <Image
            alt="Thumnail"
            src={post?.thumbnailUrl || "/thumbnails/frontendThumbnail1.5.png"}
            className="mb-14 bg-gray-100 object-cover"
            priority
            fill
          />
        </div>

        {/* <Divider direction="horizontal" className="mt-8 w-full bg-gray-5" /> */}
        <Editor
          editor={editor}
          editorValue={editorValue}
          onChangeEditorValue={() => {}}
          readOnly
        />
      </div>

      {/* 목차 */}
      <div className="col-start-9 col-end-11">
        <BlogIndex />
      </div>

      {/* 댓글 */}
      <BlogComment />

      <RelatedPost id={post?.id} />
    </>
  );
}
