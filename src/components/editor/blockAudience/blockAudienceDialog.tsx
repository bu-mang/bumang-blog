"use client";

import { Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useBlogEditorActions,
  useBlogEditorState,
} from "@/contexts/BlogEditorContext";
import AudienceGroupPicker from "./audienceGroupPicker";

/**
 * 블록 단위 공개대상 설정 다이얼로그.
 * 컨텍스트의 `audienceTargetBlockId`가 set되면 열림. 그룹 토글 시 즉시 map에 반영.
 * 빈 배열로 만들면 setBlockAudience가 알아서 key를 제거 (공개로 환원).
 */
export default function BlockAudienceDialog() {
  const { audienceTargetBlockId, blockAudienceMap } = useBlogEditorState();
  const { closeBlockAudience, setBlockAudience } = useBlogEditorActions();

  const isOpen = audienceTargetBlockId !== null;
  const current = audienceTargetBlockId
    ? (blockAudienceMap[audienceTargetBlockId] ?? [])
    : [];

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(next) => {
        if (!next) closeBlockAudience();
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock size={16} />
            이 블록 공개대상
          </DialogTitle>
          <DialogDescription>
            그룹을 토글해 누가 볼 수 있는지 정하세요. 비우면 전체 공개.
          </DialogDescription>
        </DialogHeader>

        {audienceTargetBlockId && (
          <AudienceGroupPicker
            value={current}
            onChange={(next) =>
              setBlockAudience(audienceTargetBlockId, next)
            }
            className="mt-2"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
