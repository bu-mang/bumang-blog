import {
  useEditor,
  EditorContent,
  mergeAttributes,
  NodeViewWrapper,
  NodeViewContent,
  ReactNodeViewRenderer,
  NodeViewProps,
  RawCommands,
} from "@tiptap/react";

/**
 * MARKS
 */
import Bold from "@tiptap/extension-bold";
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
import { all, createLowlight } from "lowlight";
import "highlight.js/styles/panda-syntax-dark.css";

/**
 * FUNCTIONS
 */
import Dropcursor from "@tiptap/extension-dropcursor";
import ListKeymap from "@tiptap/extension-list-keymap";
import { Color } from "@tiptap/extension-color";
import Typography from "@tiptap/extension-typography";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import Placeholder from "@tiptap/extension-placeholder";
import { cn } from "@/lib/utils";
import {
  LuGripVertical as HandleIcon,
  LuPlus as PlusIcon,
} from "react-icons/lu";

type Levels = 1 | 2 | 3;
const classes: Record<PropertyKey, string> = {
  1: "h1 text-4xl my-3 font-bold",
  2: "h2 text-2xl my-2 font-semibold",
  3: "h3 text-lg my-1 font-semibold",
};

interface DragHandleProps {
  lineDragHandleClass?: string;
  lineAddHandleClass?: string;
  lineContainerClass?: string;
}

const HANDLE_WITDH = 32;
const MENU_LINE_GAP_WIDTH = 12;

const LineMenu = ({
  lineDragHandleClass,
  lineAddHandleClass,
  lineContainerClass = "items-center",
}: DragHandleProps) => {
  const DragHandle = () => (
    <div
      className={cn("drag-handle flex items-center", lineDragHandleClass)}
      contentEditable={false}
      draggable="true"
      onDragStart={(event) => {
        // 드래그 시작 로직 추가 가능
        console.log("Drag started!", event);
      }}
    >
      <HandleIcon />
    </div>
  );

  const AddHandle = () => (
    <div className={cn("add-handle flex items-center", lineAddHandleClass)}>
      <PlusIcon />
    </div>
  );

  return (
    <div
      className={cn(
        `line-menu flex justify-between py-3`,
        `w-[${HANDLE_WITDH}px]`,
        lineContainerClass,
      )}
    >
      <DragHandle />
      <AddHandle />
    </div>
  );
};

const DraggableNodeView: React.FC<NodeViewProps> = ({ node }) => {
  const {
    NodeViewWrapperClass, // 전체 컨테이너 클래스
    nodeViewClass, // 실제 컨텐츠 클래스

    lineContainerClass, // 메뉴 컨테이너 클래스
    lineDragHandleClass, // 드래그 핸들메뉴 클래스
    lineAddHandleClass, // 추가 핸들메뉴 클래스

    // translateXValue = HANDLE_WITDH + MENU_LINE_GAP_WIDTH,
    level, // Heading의 경우
  } = node.attrs;

  // -translate-x-[${translateXValue}px]
  return (
    <NodeViewWrapper
      className={`draggable-item flex gap-3 ${NodeViewWrapperClass}`}
    >
      <LineMenu
        lineDragHandleClass={lineDragHandleClass}
        lineAddHandleClass={lineAddHandleClass}
        lineContainerClass={lineContainerClass}
      />
      {/* 노드의 실제 콘텐츠 */}
      <NodeViewContent
        className={`node-content prose flex ${nodeViewClass} ${!!level && classes[level]}`}
      />{" "}
    </NodeViewWrapper>
  );
};

const CustomHeading = Heading.configure({
  levels: [1, 2, 3],
}).extend({
  addAttributes(this) {
    return {
      lineDragHandleClass: {
        default: () => {
          return "flex items-center";
        },
      },
    };
  },

  addNodeView(this) {
    return ReactNodeViewRenderer(DraggableNodeView);
  },

  renderHTML({ node }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level: Levels = hasLevel ? node.attrs.level : this.options.levels[0];

    return [
      `h${level}`,
      {
        class: `${classes[level]}`,
      },
      0,
    ];
  },
});

/**
 * BULLET LIST
 */
const CustomBulletList = BulletList.extend({
  addKeyboardShortcuts() {
    return {
      "Mod-l": () => this.editor.commands.toggleBulletList(),
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(DraggableNodeView);
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      { class: "flex items-center gap-2" },
      ["div", { class: "bullet-symbol flex" }, "•"], // 커스텀 불릿 심볼
      0, // 리스트 텍스트 삽입
    ];
  },
});

const DraggableListView: React.FC<NodeViewProps> = ({
  node,
  editor,
  getPos,
}) => {
  const {
    NodeViewWrapperClass, // 전체 컨테이너 클래스
    nodeViewClass, // 실제 컨텐츠 클래스

    lineContainerClass, // 메뉴 컨테이너 클래스
    lineDragHandleClass, // 드래그 핸들메뉴 클래스
    lineAddHandleClass, // 추가 핸들메뉴 클래스
  } = node.attrs;
  const parentNode = editor.state.doc.resolve(getPos()).node(-1); // 부모 노드

  return (
    <NodeViewWrapper
      className={`draggable-item flex gap-3 ${NodeViewWrapperClass}`}
    >
      <LineMenu
        lineDragHandleClass={lineDragHandleClass}
        lineAddHandleClass={lineAddHandleClass}
        lineContainerClass={lineContainerClass}
      />

      {parentNode.type.name === "bulletList" && <span className="">•</span>}
      {parentNode.type.name === "orderedList" && <span className="">111.</span>}
      <NodeViewContent className="flex-grow" />
    </NodeViewWrapper>
  );
};
const CustomListItemView = () => {
  return (
    <NodeViewWrapper as="li" className="flex gap-2">
      <span className="bullet-symbol">•</span>
      <NodeViewContent className="flex-grow" />
    </NodeViewWrapper>
  );
};
export const CustomListItem = ListItem.extend({
  renderHTML({ HTMLAttributes, node }) {
    return [
      "li",
      { ...HTMLAttributes, class: "custom-list-item flex items-center gap-2" },
      ["span", { class: "bullet-symbol" }, "•"],
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CustomListItemView);
  },
});

/**
 * IMAGE
 */
const CustomImage = Image.configure({
  allowBase64: true,
});

/**
 * TASKLIST & TASKITEM
 */
const CustomTaskList = TaskList.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      "ul",
      mergeAttributes(this.options.HTMLAttributes, {
        class: `list-none p-0 m-0`,
      }),
      0,
    ];
  },
});
const CustomTaskItem = TaskItem.configure({
  nested: true,
  HTMLAttributes: {
    class: "flex gap-1.5 m-0 p-0",
  },
}).extend({
  renderHTML({ HTMLAttributes }) {
    return ["li", { class: "bg-red" }, 0];
  },
});

/**
 * CODEBLOCK
 */
const lowlight = createLowlight(all);
const CustomCodeBlock = CodeBlockLowlight.configure({
  lowlight,
  defaultLanguage: "typescript",
}).extend({
  addAttributes(this) {
    return {
      nodeViewClass: {
        default: () => {
          return "p-2 w-full bg-gray-800 text-gray-1";
        },
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(DraggableNodeView);
  },
});

/**
 * LINK
 */
const CustomLink = Link.configure({
  protocols: ["ftp", "mailto"],
  defaultProtocol: "https",
  HTMLAttributes: {
    rel: "noopener noreferrer",
    target: null,
  },
});

const CustomPlaceholder = Placeholder.configure({
  placeholder: "Now, a Legend is being written by you...!",
  emptyEditorClass: "is-editor-empty", // @Base에서 해당 class에 대한 기본 css 적용
});

const DraggableHorizontalRuleView: React.FC<NodeViewProps> = ({ node }) => {
  const {
    NodeViewWrapperClass, // Wrapper 클래스
    lineContainerClass, // 핸들 컨테이너 클래스
    lineDragHandleClass, // 드래그 핸들 클래스
    lineAddHandleClass, // 추가 핸들 클래스
  } = node.attrs;

  return (
    <NodeViewWrapper
      className={`draggable-item flex items-center gap-3 ${NodeViewWrapperClass}`}
    >
      {/* 핸들 메뉴 */}
      <LineMenu
        lineContainerClass={lineContainerClass}
        lineDragHandleClass={lineDragHandleClass}
        lineAddHandleClass={lineAddHandleClass}
      />

      {/* 실제 수평선 */}
      <hr className="h-0.25 w-full bg-gray-50" />
    </NodeViewWrapper>
  );
};
const CustomHorizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: "bg-blue h-2 w-5",
  },
}).extend({
  addNodeView() {
    return ReactNodeViewRenderer(DraggableHorizontalRuleView);
  },
});

const TableComponents = [
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
];

const CustomParagraph = Paragraph.configure({
  HTMLAttributes: {
    class: "-translate-y-px m-0",
  },
}).extend({
  addNodeView() {
    return ReactNodeViewRenderer(DraggableNodeView);
  },
});

function TiptapEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,

      /**
       * MARK
       */
      Bold,
      Highlight.configure({
        multicolor: true,
      }),
      Italic,
      CustomLink,
      Strike,
      TextStyle.configure({ mergeNestedSpanStyles: false }),
      Underline,

      /**
       * NODES
       */
      Blockquote,
      OrderedList,

      Document,
      CustomImage,
      CustomHeading,
      CustomTaskList,
      CustomTaskItem,
      CustomCodeBlock,
      CustomPlaceholder,
      CustomBulletList,
      CustomListItem,
      CustomHorizontalRule,
      CustomParagraph,

      ...TableComponents,

      Youtube,

      Text,

      /**
       * FUNCTIONS
       */
      Color,
      Dropcursor,
      ListKeymap,
      Typography,
      BubbleMenu,
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose p-5 leading-normal min-h-40 focus:outline-none max-w-full",
        //
      },
    },
    content: `
      <p>This is a basic example of implementing images. Drag to re-order.</p>
      <img src="https://placehold.co/800x400" />
      <img src="https://placehold.co/800x400/6A00F5/white" />
    `,
  });

  return <EditorContent editor={editor} />;
}

export default TiptapEditor;
