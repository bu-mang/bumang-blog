"use client";

import { useEffect, useMemo, useState } from "react";
import YooptaEditor, {
  createYooptaEditor,
  SlateElement,
  YooptaContentValue,
  YooptaOnChangeOptions,
  YooptaPlugin,
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

  // from @yoopta content to html string
  const serializeHTML = () => {
    const data = editor.getEditorValue();
    // const data = value;
    if (data) {
      const htmlString = html.serialize(editor, data);
      console.log("html string", htmlString);
    }
  };

  useEffect(() => {
    deserializeHTML();
  }, []);

  return (
    <main className="grid grid-cols-8 gap-x-[1.5vw] bg-red px-[10vw]">
      <div className="col-start-2 col-end-8 grid h-fit grid-cols-6 gap-x-[1.5vw] border">
        <></>
        <div className="col-start-2 col-end-6 grid grid-cols-1 border">
          <button onClick={deserializeHTML} className="bg-blue">
            Deserialize from html to content
          </button>
          <button onClick={serializeHTML} className="bg-red">
            Serialize from content to html
          </button>
          <YooptaEditor
            width="100%"
            className="p-2"
            editor={editor}
            plugins={plugins}
            placeholder="Type Something Cool...!"
            value={value}
            onChange={onChange}
            tools={TOOLS}
            marks={MARKS}
            autoFocus
          />
        </div>
      </div>
    </main>
  );
}
