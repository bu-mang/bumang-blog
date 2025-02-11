"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import "highlight.js/styles/panda-syntax-dark.css";

/**
 * MARKS
 */
import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import Highlight from "@tiptap/extension-highlight";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";

/**
 * NODES
 */
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Heading from "@tiptap/extension-heading";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";

import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

import Youtube from "@tiptap/extension-youtube";

import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import Document from "@tiptap/extension-document";
import StarterKit from "@tiptap/starter-kit";

/**
 * FUNCTIONS
 */
import Dropcursor from "@tiptap/extension-dropcursor";
import ListKeymap from "@tiptap/extension-list-keymap";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";

import { all, createLowlight } from "lowlight";

// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all);

export default function BlogEdit() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      /**
       * MARK
       */
      Bold,
      Code,
      Highlight.configure({
        multicolor: true,
      }),
      Italic,
      Link.configure({
        protocols: ["ftp", "mailto"],
        defaultProtocol: "https",
        HTMLAttributes: {
          // Change rel to different value
          // Allow search engines to follow links(remove nofollow)
          rel: "noopener noreferrer",
          // Remove target entirely so links open in current tab
          target: null,
        },
      }),
      Strike,
      TextStyle.configure({ mergeNestedSpanStyles: true }),
      Underline,
      /**
       * NODES
       */
      Blockquote,
      BulletList,
      // CodeBlock,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "typescript",
      }),

      Document,
      Heading.configure({
        levels: [1, 2, 3, 4, 5],
      }),
      HorizontalRule,
      Image.configure({
        allowBase64: true,
      }),
      ListItem,
      OrderedList,

      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,

      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Youtube,

      Text,
      Paragraph,

      /**
       * FUNCTIONS
       */
      Color,
      Dropcursor,
      ListKeymap,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Typography,
    ],
    editorProps: {
      attributes: {
        class: "prose m-5 focus:outline-none leading-normal",
      },
    },
  });

  return (
    <main className="grid grid-cols-8 gap-x-[1.5vw] px-[10vw]">
      <div className="col-start-2 col-end-8 grid h-fit grid-cols-6 gap-x-[1.5vw] border">
        <div className="col-start-2 col-end-6 h-40 border">
          <EditorContent editor={editor} />
        </div>
      </div>
    </main>
  );
}
