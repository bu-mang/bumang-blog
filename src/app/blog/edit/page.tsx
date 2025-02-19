"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import YooptaEditor, {
  createYooptaEditor,
  SlateElement,
  YooptaContentValue,
  YooptaOnChangeOptions,
  YooptaPlugin,
  Blocks,
} from "@yoopta/editor";

import Paragraph from "@yoopta/paragraph";
import Blockquote from "@yoopta/blockquote";
import Embed from "@yoopta/embed";
import Image, { ImageElementProps } from "@yoopta/image";
import Link from "@yoopta/link";
import Callout from "@yoopta/callout";
import Video from "@yoopta/video";
import File from "@yoopta/file";
import Accordion from "@yoopta/accordion";
import { NumberedList, BulletedList, TodoList } from "@yoopta/lists";
import {
  Bold,
  Italic,
  CodeMark,
  Underline,
  Strike,
  Highlight,
} from "@yoopta/marks";
import { HeadingOne, HeadingThree, HeadingTwo } from "@yoopta/headings";
import Code from "@yoopta/code";
import Table from "@yoopta/table";
import Divider from "@yoopta/divider";
import ActionMenuList, {
  DefaultActionMenuRender,
} from "@yoopta/action-menu-list";
import Toolbar, { DefaultToolbarRender } from "@yoopta/toolbar";
import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool";
import { html } from "@yoopta/exports";

import BlogEditorToolBar from "@/components/pages/blog/blogEditToolBar";

const plugins = [
  Paragraph,
  Table,
  Divider.extend({
    elementProps: {
      divider: (props) => ({
        ...props,
        color: "#007aff",
      }),
    },
  }),
  Accordion,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Blockquote,
  Callout.extend({
    options: {
      shortcuts: ["<"],
    },
  }),
  NumberedList,
  BulletedList,
  TodoList,
  Code.extend({
    options: {
      shortcuts: ["\`\`\`"],
    },
  }),
  Link,
  Embed,
  Image.extend({
    elementProps: {
      image: (props: ImageElementProps) => ({
        ...props,
        alt: "ImageExample",
        fit: "contain",
      }),
    },
    options: {
      async onUpload(file) {
        // const data = await uploadToCloudinary(file, 'image');
        // return {
        //   src: data.secure_url,
        //   alt: "cloudinary",
        //   sizes: {
        //     width: data.width,
        //     height: data.height,
        //   },
        // };
        return {};
      },
    },
  }),
  Video,
  // .extend({
  // options: {
  //   onUpload: async (file) => {
  //     const data = await uploadToCloudinary(file, 'video');
  //     return {
  //       src: data.secure_url,
  //       alt: 'cloudinary',
  //       sizes: {
  //         width: data.width,
  //         height: data.height,
  //       },
  //     };
  //   },
  //   onUploadPoster: async (file) => {
  //     const image = await uploadToCloudinary(file, 'image');
  //     return image.secure_url;
  //   },
  // },
  // })
  File,
  // .extend({
  // options: {
  //   onUpload: async (file) => {
  //     const response = await uploadToCloudinary(file, 'auto');
  //     return { src: response.secure_url, format: response.format, name: response.name, size: response.bytes };
  //   },
  // },
  // }),
] as YooptaPlugin<Record<string, SlateElement>, Record<string, unknown>>[];
const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

const TOOLS = {
  Toolbar: {
    tool: Toolbar,
    render: DefaultToolbarRender,
  },
  ActionMenuList: {
    tool: ActionMenuList,
    render: DefaultActionMenuRender,
  },
  LinkTool: {
    tool: LinkTool,
    render: DefaultLinkToolRender,
  },
};

export default function BlogEdit() {
  const editor = useMemo(() => createYooptaEditor(), []);
  const [value, setValue] = useState<YooptaContentValue>();

  const onChange = (
    value: YooptaContentValue,
    options: YooptaOnChangeOptions,
  ) => {
    setValue(value);
  };

  // from html to @yoopta content
  const deserializeHTML = () => {
    const htmlString = "<h1>First title</h1>";
    const content = html.deserialize(editor, htmlString);

    editor.setEditorValue(content);
  };
  useEffect(() => {
    deserializeHTML();
  }, []);

  // from @yoopta content to html string
  const serializeHTML = () => {
    const data = editor.getEditorValue();
    // const data = value;
    if (data) {
      const htmlString = html.serialize(editor, data);
      console.log("html string", htmlString);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const [title, setTitle] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "auto"; // 높이를 초기화한 후
    target.style.height = `${target.scrollHeight}px`;
  };

  const selectionRef = useRef<HTMLDivElement>(null);

  const addBlockData = (index: number, focus = true) => {
    const blockData = Blocks.buildBlockData();
    const insertBlockOptions = {
      blockData,
      at: index,
      focus,
    };
    const insertedId = editor.insertBlock("HeadingOne", insertBlockOptions);

    return insertedId;
  };

  const handleEditorFocus = () => {
    if (selectionRef.current) {
      if (editor.isEmpty()) {
        // 블록이 아무것도 없을 때 클릭하면 라인 추가 후 포커스
        addBlockData(0, true);
      } else {
        // 20줄 이하일 때 영역을 클릭하면 라인 추가
        const length = Object.keys(editor.getEditorValue()).length;
        if (length <= 20) {
          addBlockData(length, false);
        }
      }
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col">
      <BlogEditorToolBar />
      <div className="flex w-full flex-1 justify-center px-[10vw] pt-24">
        <form
          className="flex w-[720px] flex-col"
          // onSubmit={(e) => handleSubmit(e)}
        >
          {/* <button onClick={deserializeHTML} className="bg-blue">
              Deserialize from html to content
            </button>
            <button onClick={serializeHTML} className="bg-red">
              Serialize from content to html
            </button> */}

          {/* INPUT */}
          <textarea
            className="flex h-auto min-h-20 w-full resize-none flex-wrap overflow-hidden rounded-md border-none bg-transparent px-2 py-4 text-5xl font-semibold leading-normal outline-none transition-colors placeholder:text-gray-100 hover:bg-gray-1 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="A Legend has said that..."
            tabIndex={1}
            value={title}
            maxLength={48}
            onChange={handleChange}
          />

          {/* DIVIDER */}
          <div className="h-[1px] w-full bg-gray-5" />
          <div
            className="flex flex-1 flex-col"
            ref={selectionRef}
            onClick={handleEditorFocus}
          >
            <YooptaEditor
              width="100%"
              className="flex-1 p-2"
              editor={editor}
              plugins={plugins}
              placeholder="Type Something Cool...!"
              value={value}
              onChange={onChange}
              selectionBoxRoot={selectionRef}
              tools={TOOLS}
              marks={MARKS}
              autoFocus
            />
          </div>
        </form>
      </div>
    </main>
  );
}
