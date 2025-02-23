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

import { Divider as DividerComp } from "@/components/common";
import { BlogPublishingView } from "@/components/pages";
import BlogEditorToolBar from "@/components/pages/blog/blogEditToolBar";
import useComboBox from "@/hooks/useComboBox";
import useTagComboBox from "@/hooks/useTagComboBox";
import { BlogStep, TagType } from "@/types";
import { SelectedDateType } from "@/types/date";

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
  /**
   * @FUNNEL
   */
  const [step, setStep] = useState(BlogStep.EDITTING);
  const handleStep = (v: BlogStep) => setStep(v);

  const editor = useMemo(() => createYooptaEditor(), []);

  /**
   * @MAIN_CATEGORIES
   */
  const {
    isOpen: isMainOpen,
    handleIsOpen: handleMainOpen,
    selectedValue: selectedMainValue,
    handleSelectedValue: handleSelectedMainValue,
  } = useComboBox({
    _name: "mainCategories",
  });

  /**
   * @SUB_SUBJECT
   */
  const {
    isOpen: isSubOpen,
    handleIsOpen: handleSubOpen,
    selectedValue: selectedSubValue,
    handleSelectedValue: handleSelectedSubValue,
  } = useComboBox({
    _name: "subCategories",
  });

  /**
   * @TAGS
   */
  const selectedArr: TagType[] = [
    { id: "a1", value: "abc", label: "abc" },
    { id: "a2", value: "def", label: "def" },
    { id: "a3", value: "ghi", label: "ghi" },
    { id: "a4", value: "www", label: "www" },
    { id: "a5", value: "eee", label: "eee" },
    { id: "a6", value: "aaa", label: "aaa" },
    { id: "a7", value: "bbb", label: "bbb" },
    { id: "a8", value: "ccc", label: "ccc" },
    { id: "a9", value: "dsd", label: "dsd" },
    { id: "a0", value: "nds", label: "nds" },
    { id: "a11", value: "psx", label: "psx" },
    { id: "a12", value: "tsn", label: "tsn" },
    { id: "a13", value: "vnf", label: "vnf" },
  ];
  const unselectedArr: TagType[] = [
    { id: "d1", value: "anf", label: "anf" },
    { id: "d2", value: "wmf", label: "wmf" },
    { id: "d3", value: "enf", label: "enf" },
    { id: "d4", value: "snd", label: "snd" },
    { id: "d5", value: "zkj", label: "zkj" },
    { id: "d6", value: "qna", label: "qna" },
    { id: "d7", value: "dmk", label: "dmk" },
    { id: "d8", value: "gka", label: "gka" },
    { id: "d9", value: "gka", label: "gka" },
    { id: "d0", value: "1ks", label: "1ks" },
    { id: "d11", value: "3ms", label: "3ms" },
    { id: "d12", value: "qnd", label: "qnd" },
    { id: "d13", value: "poo", label: "poo" },
  ];

  const {
    isOpen: isTagOpen,
    handleIsOpen: handleIsTagOpen,
    handleSwitch: handleSwitchTag,
    selected: selectedTags,
    unselected: unslectedTag,
  } = useTagComboBox({
    _name: "tags",
    selectedArr,
    unselectedArr,
  });

  /**
   * @DRAFT
   */
  const [isDraftOpen, setIsDraftOpen] = useState(false);
  const handleDraftOpen = () => setIsDraftOpen((prev) => !prev);
  const handleEditorValue = (title: string, content: YooptaContentValue) => {
    console.log(title, content);
  };

  /**
   * @TITLE_LOGIC
   */
  const [title, setTitle] = useState("");

  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "auto"; // 높이를 초기화한 후
    target.style.height = `${target.scrollHeight}px`;
  };

  /**
   * @EDITOR_LOGIC
   */
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
    // eslint-disable-next-line
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

  /**
   * @DATE_LOGIC
   */
  const [publishingDate, setPublishingDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedDateType, setSelectedDateType] = useState<SelectedDateType>(
    SelectedDateType.rightNow,
  );
  const handleSelectedDateType = (v: SelectedDateType) =>
    setSelectedDateType(v);

  useEffect(() => {
    console.log(selectedDateType, "selectedDateType");
  }, [selectedDateType]);

  // Step Changing
  useEffect(() => {
    setTimeout(() => setStep(BlogStep.PUBLISHING), 2000);
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col">
      {step === BlogStep.EDITTING && (
        <>
          {/* TOOLBAR */}
          <BlogEditorToolBar
            // MainCategory
            isMainOpen={isMainOpen}
            handleMainOpen={handleMainOpen}
            selectedMainValue={selectedMainValue}
            handleSelectedMainValue={handleSelectedMainValue}
            // SubCategory
            isSubOpen={isSubOpen}
            handleSubOpen={handleSubOpen}
            selectedSubValue={selectedSubValue}
            handleSelectedSubValue={handleSelectedSubValue}
            // Tags
            isTagOpen={isTagOpen}
            handleIsTagOpen={handleIsTagOpen}
            handleSwitchTag={handleSwitchTag}
            selectedTags={selectedTags}
            unslectedTag={unslectedTag}
            // Draft
            isDraftOpen={isDraftOpen}
            handleDraftOpen={handleDraftOpen}
            handleEditorValue={handleEditorValue}
          />

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
                onChange={handleChangeTitle}
              />

              {/* DIVIDER */}
              <DividerComp
                direction="horizontal"
                className={"w-full bg-gray-5"}
              />

              {/* EDITOR */}
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
        </>
      )}
      {step === BlogStep.PUBLISHING && (
        <BlogPublishingView
          selectedTags={selectedTags}
          selectedDateType={selectedDateType}
          onChangeSelectedDateType={handleSelectedDateType}
          publishingDate={publishingDate}
          onChangePublishingDate={setPublishingDate}
          onChangeStep={handleStep}
        />
      )}
    </main>
  );
}
