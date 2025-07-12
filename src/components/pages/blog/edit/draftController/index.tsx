"use client";

import { ButtonBase } from "@/components/common";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuthStore } from "@/store/auth";
import { CategoryType, GroupType, TagType, DraftType } from "@/types";
import { cn } from "@/utils/cn";
import { YooptaContentValue } from "@yoopta/editor";
import { format } from "date-fns";
import { Plus, Save } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

interface DraftControllerProps {
  isDraftOpen: boolean;
  handleDraftOpen: (v?: boolean) => void;
  handleEditValues: (
    title: string,
    content: string | undefined,
    group: GroupType | null,
    category: CategoryType | null,
    tags: TagType[],
  ) => void;

  className?: string;

  title: string;
  content: YooptaContentValue | undefined;
  selectedGroup: GroupType | null;
  selectedCategory: CategoryType | null;
  selectedTags: TagType[];

  onSerialize: (type?: "html" | "plainText") => string | undefined;
  onDeserialize: (text: string) => void;
}

const DraftController = ({
  // OPEN
  isDraftOpen,
  handleDraftOpen,
  //
  handleEditValues,
  className,

  title,
  content,
  selectedGroup,
  selectedCategory,
  selectedTags,

  onSerialize,
  onDeserialize,
}: DraftControllerProps) => {
  const triggerClass = cn(
    "group flex h-10 min-w-24 cursor-pointer items-center justify-center gap-2 rounded-md px-4 transition-all hover:bg-gray-5",
    className,
  );

  const user = useAuthStore((state) => state.user);
  const [status, setStatus] = useState<"Auth Checking..." | "Saving..." | "">(
    "Auth Checking...",
  );
  // const [statusText, setStatusText] = useState();
  const [drafts, setDrafts] = useState<DraftType[]>([]);
  const [currentDraftId, setCurrentDraftId] = useState<number | null>(null);

  // 현재 draft 상태 (props에서 가져온 값들)
  const currentDraft = useMemo(
    () => ({
      id: currentDraftId || Date.now(),
      title,
      content,
      selectedGroup,
      selectedCategory,
      selectedTags,
      lastUpdatedAt: new Date().toISOString(),
      selected: true,
    }),
    [
      currentDraftId,
      title,
      content,
      selectedGroup,
      selectedCategory,
      selectedTags,
    ],
  );

  // localStorage 키 생성
  const getDraftKey = useCallback(() => {
    return user ? `${user.nickname}_drafts` : null;
  }, [user]);

  // localStorage에서 임시저장 목록 불러오기
  const loadDraftsFromStorage = useCallback(() => {
    const draftKey = getDraftKey();
    if (!draftKey) return [];

    try {
      const drafts = localStorage.getItem(draftKey);
      return drafts ? JSON.parse(drafts) : [];
    } catch (error) {
      console.error("Draft 불러오기 실패:", error);
      return [];
    }
  }, [getDraftKey]);

  // localStorage에 임시저장 목록 저장
  const saveDraftsToStorage = useCallback(
    (draftsToSave: DraftType[]) => {
      const draftKey = getDraftKey();
      if (!draftKey) return;

      try {
        localStorage.setItem(draftKey, JSON.stringify(draftsToSave));
      } catch (error) {
        console.error("Draft 저장 실패:", error);
      }
    },
    [getDraftKey],
  );

  // 임시저장 추가/업데이트 (state/localStorage)
  const saveDraft = useCallback(
    (draftToSave: DraftType) => {
      setStatus("Saving...");
      draftToSave.content = onSerialize("html");

      setDrafts((prevDrafts) => {
        const existingIndex = prevDrafts.findIndex(
          (draft) => draft.id === draftToSave.id,
        );
        let newDrafts;

        if (existingIndex >= 0) {
          // 기존 draft 업데이트
          newDrafts = [...prevDrafts];
          newDrafts[existingIndex] = draftToSave;
        } else {
          // 새 draft 추가
          newDrafts = [draftToSave, ...prevDrafts];
        }

        saveDraftsToStorage(newDrafts);
        return newDrafts;
      });

      setTimeout(() => setStatus(""), 1000);
    },
    [saveDraftsToStorage, onSerialize],
  );

  // 임시저장 삭제
  const deleteDraft = (draftId: number) => {
    setDrafts((prevDrafts) => {
      const newDrafts = prevDrafts.filter((draft) => draft.id !== draftId);
      saveDraftsToStorage(newDrafts);
      return newDrafts;
    });

    // 현재 선택된 draft가 삭제된 경우
    if (currentDraftId === draftId) {
      setCurrentDraftId(null);
    }
  };

  // 임시저장 불러오기
  const loadDraft = (draftId: number) => {
    const draft = drafts.find((d) => d.id === draftId);
    if (!draft) return;

    setCurrentDraftId(draftId);

    let content = undefined;
    if (typeof draft.content === "string") {
      content = draft.content;
    }

    // 에디터에 값 설정
    handleEditValues(
      draft.title,
      content,
      draft.selectedGroup,
      draft.selectedCategory,
      draft.selectedTags,
    );
  };

  // 현재 내용으로 덮어쓰기
  const overwriteDraft = (draftId: number) => {
    const updatedDraft = {
      ...currentDraft,
      id: draftId,
    };

    setCurrentDraftId(draftId);
    saveDraft(updatedDraft);
  };

  // 수동 저장
  const handleManualSave = () => {
    // 내용이 비어있으면 저장하지 않음
    if (!title.trim() && !content) return;

    saveDraft(currentDraft);
  };

  // // 새 draft 시작
  const startNewDraft = () => {
    const newDraft = { ...currentDraft };
    newDraft.id = Date.now();
    saveDraft(newDraft);
    // handleEditValues("", undefined, null, null, []);
  };

  // 초기 로딩
  useEffect(() => {
    if (typeof window === "undefined" || !user) {
      setStatus("Auth Checking...");
      return;
    }

    setStatus("");
    const savedDrafts = loadDraftsFromStorage();
    setDrafts(savedDrafts);
  }, [user, loadDraftsFromStorage]);

  // 1분마다 자동저장
  useEffect(() => {
    if (!user || (!title.trim() && !content)) return;

    const timeoutId = setTimeout(() => {
      saveDraft(currentDraft);
    }, 60000); // 1분 디바운스

    return () => clearTimeout(timeoutId);
  }, [user, currentDraft, saveDraft, title, content]);

  // 내용 변경 시 currentDraftId 설정 (새 글 작성 시)
  useEffect(() => {
    if (!currentDraftId && title.trim()) {
      setCurrentDraftId(Date.now());
    }
  }, [
    currentDraftId,
    title,
    content,
    selectedCategory,
    selectedGroup,
    selectedTags,
  ]);

  return (
    <Popover open={isDraftOpen} onOpenChange={handleDraftOpen}>
      {/* Status */}
      <span className="pointer-events-none text-center text-xs text-gray-300">
        {status}
      </span>
      <PopoverTrigger asChild>
        {/* Trigger */}
        <div className={triggerClass}>
          <div className="flex items-center gap-1.5 text-sm">
            <span>Draft</span>
          </div>

          <div className="flex min-w-6 items-center justify-evenly gap-1 rounded-full bg-gray-5 px-2 py-0.5 shadow-sm transition-transform group-hover:bg-gray-50">
            <span className="text-xs font-semibold text-gray-700">
              {drafts.length}
            </span>
          </div>
        </div>
      </PopoverTrigger>

      {/* CONTENT */}
      <PopoverContent className="w-[320px] p-0">
        <Command>
          <CommandList>
            {/* SELECTED_LIST */}
            <div className="flex flex-col gap-1 border-b-[1px] p-2.5">
              <span className="text-xs text-gray-200">Drafts</span>
              <CommandEmpty>No Draft found.</CommandEmpty>
              {drafts.map((draft) => (
                <CommandItem
                  className="group flex justify-between px-4 text-sm"
                  key={draft.id}
                  value={`${draft.id}`}
                  onSelect={(currentValue) => {
                    console.log(currentValue);
                    loadDraft(Number(currentValue));
                  }}
                >
                  <div className="flex flex-1 flex-col">
                    <div className="flex flex-1">
                      <h4 className="mr-3 text-[10px] text-gray-200">
                        {format(draft.lastUpdatedAt, "yyyy. MM. dd.")}
                      </h4>
                      <span className="text-[10px] text-gray-200 opacity-0 transition-all group-hover:opacity-100">
                        key: {draft.id.toString().slice(-8)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="font-medium">
                        {draft.title
                          ? `${draft.title}${draft.title.length > 10 ? "..." : ""}`
                          : "제목없음"}
                      </span>

                      {draft.id === currentDraftId && (
                        <div
                          className={cn(
                            "flex h-4 items-center rounded-sm border border-red-200 bg-red-50 px-0.5 text-[8px] text-red-400",
                          )}
                        >
                          Current
                        </div>
                      )}
                    </div>

                    <span className="mb-1 text-xs text-gray-200">
                      {/* {content
                        ? `${JSON.stringify(content)?.slice(0, 10)}${JSON.stringify(content).length > 10 ? "..." : ""}`
                        : "내용없음"} */}
                      {draft.selectedCategory?.label ?? "No Group"}•
                      {draft.selectedGroup?.label ?? "No Category"}
                    </span>
                  </div>

                  <div className="flex gap-1">
                    <ButtonBase
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteDraft(draft.id);
                        overwriteDraft(draft.id);
                      }}
                      className="shrink-0 rounded-sm bg-gray-10 text-gray-400 active:scale-90"
                    >
                      <Save />
                    </ButtonBase>

                    <ButtonBase
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteDraft(draft.id);
                      }}
                      className="shrink-0 rounded-sm bg-gray-10 text-gray-400 active:scale-90"
                    >
                      <IoClose />
                    </ButtonBase>
                  </div>
                </CommandItem>
              ))}
              <Button
                className="mt-3"
                variant="outline"
                onClick={startNewDraft}
              >
                <Plus />
                Add New Draft
              </Button>
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DraftController;
