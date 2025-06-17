// lib/store/useAuthStore.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { DraftType } from "@/types/draft";
import { YooptaContentValue } from "@yoopta/editor";
import { GroupType, TagType } from "@/types";
import { persist } from "zustand/middleware";

interface EditDraftType {
  title: string;
  content: YooptaContentValue | string | undefined;
  selectedGroup: { id: number; label: string } | null;
  selectedCategory: { id: number; label: string } | null;
  selectedTags: { id: number; label: string }[];
}

interface EditState {
  // 쿠키에서 parsing
  id: number | null;
  editDraft: EditDraftType | null;
}

interface EditAction {
  setIdAndEditDraft: (id: number | null, value: EditDraftType | null) => void;
}

export const useEditStore = create<EditState & EditAction>()(
  persist(
    immer((set) => ({
      id: null,
      editDraft: null,

      setIdAndEditDraft: (id, editDraft) => {
        set((state) => {
          state.id = id;
          state.editDraft = editDraft;
        });
      },
    })),
    {
      name: "edit-draft", // localStorage 키 이름
    },
  ),
);
