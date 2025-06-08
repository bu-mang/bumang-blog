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
  Calendar,
  FolderIcon,
  AlignJustifyIcon,
} from "lucide-react";
import { PiHandsClappingDuotone as Clapping } from "react-icons/pi";
import Image from "next/image";
import BlogComment from "./blogComment";
import { PostDetailResponseDto } from "@/types/dto/blog/[id]";
import { html } from "@yoopta/exports";
import RelatedPost from "./relatedPosts";
import { format } from "date-fns";

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
        <TagWrapper as="collapsible" align="center">
          {post?.tags.length ? (
            post.tags.map((tag) => (
              <Tag id={tag.id} title={tag.label} key={tag.id} />
            ))
          ) : (
            <Tag id={0} title="No Tags" className="pointer-events-none" />
          )}
        </TagWrapper>

        <div className="mb-10 mt-4 text-center text-6xl font-semibold leading-tight">
          {post?.title}
        </div>

        <div className="mb-12 flex items-center justify-center">
          <div className="group flex cursor-pointer items-center justify-center gap-2 text-sm text-gray-300 transition-all hover:scale-105">
            <FolderIcon size={18} className="group-hover:text-gray-600" />
            <span className="group-hover:text-gray-600">
              {post?.group.label ?? "No Group"}
            </span>
          </div>

          <span className="mx-2 text-gray-200">•</span>

          <div className="group flex cursor-pointer items-center justify-center gap-2 text-sm text-gray-300 transition-all hover:scale-105">
            <AlignJustifyIcon size={18} className="group-hover:text-gray-600" />
            <span className="group-hover:text-gray-600">
              {post?.category.label ?? "No Category"}
            </span>
          </div>

          <Divider className="mx-5" />

          <div className="pointer-events-none flex items-center justify-center gap-2 text-sm text-gray-300">
            <Calendar size={18} />
            <span>
              {post
                ? format(post.createdAt, "yyyy. MM. dd.")
                : "No Date Context."}
            </span>
          </div>
        </div>

        <div className="relative mb-14 aspect-video w-full overflow-hidden rounded-2xl shadow-md">
          <Image
            alt="Thumnail"
            src={post?.thumbnailUrl || "/thumbnails/frontendThumbnail1.5.png"}
            className="bg-gray-100 object-cover"
            priority
            fill
          />
        </div>

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
