"use client";

import { createContext, useContext, ReactNode } from "react";
import {
  BlogBlockNoteEditor,
  BlogPartialBlock,
} from "@/components/editor/blogBlockNoteSchema";
import { CategoryType, GroupType, TagType } from "@/types";
import { SaveStatus } from "@/hooks/useAutoSave";

// State Context (자주 변경되는 값들)
export interface BlogEditorStateContextValue {
  editor: BlogBlockNoteEditor | null;
  title: string;
  draftId: number;
  selectedGroup: GroupType | null;
  selectedCategory: CategoryType | null;
  selectedTags: TagType[];
  unselectedTags: TagType[];
  isDraftOpen: boolean;
  saveStatus?: SaveStatus;
  lastSavedAt?: Date | null;
  /** block.id → groupId[]. 키 없거나 빈 배열은 공개. */
  blockAudienceMap: Record<string, number[]>;
  /** 공개대상 설정 다이얼로그가 타겟으로 잡은 block.id. null이면 다이얼로그 닫힘. */
  audienceTargetBlockId: string | null;
}

// Actions Context (거의 변경되지 않는 함수들)
export interface BlogEditorActionsContextValue {
  onChangeSelectedGroup: (v: GroupType) => void;
  onChangeSelectedCategory: (v: CategoryType) => void;
  handleSwitchTags: (v: {
    targetId: number;
    from: "selectedTags" | "unselectedTags";
  }) => void;
  handleDraftOpen: () => void;
  setDraftId: (id: number) => void;
  loadDraftToEditor: (
    title: string,
    content: BlogPartialBlock[] | undefined,
    group: GroupType | null,
    category: CategoryType | null,
    tags: TagType[],
    draftId?: number,
  ) => void;
  onSerialize: () => BlogPartialBlock[] | undefined;
  onDeserialize: (content: BlogPartialBlock[]) => void;
  onDisablePrevent: () => void;
  groupLists: GroupType[]; // 거의 안 변함
  setBlockAudience: (blockId: string, groupIds: number[] | undefined) => void;
  setBlockAudienceMap: (next: Record<string, number[]>) => void;
  openBlockAudience: (blockId: string) => void;
  closeBlockAudience: () => void;
}

const BlogEditorStateContext =
  createContext<BlogEditorStateContextValue | null>(null);
const BlogEditorActionsContext =
  createContext<BlogEditorActionsContextValue | null>(null);

BlogEditorStateContext.displayName = "BlogEditorStateContext";
BlogEditorActionsContext.displayName = "BlogEditorActionsContext";

// 전체 값을 받는 통합 인터페이스
export interface BlogEditorContextValue
  extends BlogEditorStateContextValue,
    BlogEditorActionsContextValue {}

export interface BlogEditorProviderProps {
  state: BlogEditorStateContextValue;
  actions: BlogEditorActionsContextValue;
  children: ReactNode;
}

export function BlogEditorProvider({
  state,
  actions,
  children,
}: BlogEditorProviderProps) {
  return (
    <BlogEditorActionsContext.Provider value={actions}>
      <BlogEditorStateContext.Provider value={state}>
        {children}
      </BlogEditorStateContext.Provider>
    </BlogEditorActionsContext.Provider>
  );
}

// State만 가져오는 훅
export function useBlogEditorState(): BlogEditorStateContextValue {
  const context = useContext(BlogEditorStateContext);

  if (!context) {
    throw new Error(
      "useBlogEditorState must be used within a BlogEditorProvider",
    );
  }

  return context;
}

// Actions만 가져오는 훅
export function useBlogEditorActions(): BlogEditorActionsContextValue {
  const context = useContext(BlogEditorActionsContext);

  if (!context) {
    throw new Error(
      "useBlogEditorActions must be used within a BlogEditorProvider",
    );
  }

  return context;
}

// 전체를 가져오는 훅 (기존 호환성 유지)
export function useBlogEditorContext(): BlogEditorContextValue {
  const state = useBlogEditorState();
  const actions = useBlogEditorActions();

  return { ...state, ...actions };
}
