"use client";

import { useEffect, useMemo, useReducer, useState } from "react";
import { Lock } from "lucide-react";
import {
  BlockPopover,
  useBlockNoteEditor,
  useEditorChange,
} from "@blocknote/react";
import { useQuery } from "@tanstack/react-query";
import { getUserGroups } from "@/services/api/userGroups";

const formatLabel = (
  groupIds: number[],
  groupNameById: Map<number, string>,
): string => {
  const names = groupIds
    .map((id) => groupNameById.get(id))
    .filter((n): n is string => !!n);
  if (names.length === 0) return `${groupIds.length}개 그룹`;
  if (names.length <= 2) return names.join(", ");
  return `${names[0]} +${names.length - 1}`;
};

interface MarkerProps {
  blockId: string;
  groupIds: number[];
  groupNameById: Map<number, string>;
  onClick?: (blockId: string) => void;
}

/**
 * 한 블록에 대한 audience 마커.
 * BlockPopover가 blockId로 해당 블록의 DOM 위치를 찾아 floating-ui로 앵커.
 * 블록이 이동·재배치돼도 autoUpdate가 자동 추적.
 */
function AudienceMarker({
  blockId,
  groupIds,
  groupNameById,
  onClick,
}: MarkerProps) {
  const label = useMemo(
    () => formatLabel(groupIds, groupNameById),
    [groupIds, groupNameById],
  );

  return (
    <BlockPopover
      blockId={blockId}
      useFloatingOptions={{ placement: "left-start", open: true }}
      elementProps={{ style: { zIndex: 10 } }}
    >
      <button
        type="button"
        data-audience-marker-block-id={blockId}
        onClick={onClick ? () => onClick(blockId) : undefined}
        title={`Audience: ${label}`}
        className="mt-0.5 flex h-6 cursor-pointer items-center gap-1 px-1.5 text-xs text-foreground/40 hover:text-foreground/70"
      >
        <Lock size={12} />
        <span className="max-w-32 truncate">{label}</span>
      </button>
    </BlockPopover>
  );
}

interface LayerProps {
  blockAudienceMap: Record<string, number[]>;
  /** 마커 클릭 핸들러. 에디터에선 다이얼로그 열기, 상세 페이지에선 생략. */
  onClick?: (blockId: string) => void;
}

/**
 * blockAudienceMap에 등록된 모든 블록에 audience 마커를 floating으로 띄우는 레이어.
 * BlockNoteView 안에 children으로 박는다.
 *
 * 그룹명 캐시는 다이얼로그가 한 번이라도 열려야 채워짐(enabled:false).
 * 캐시가 비어있으면 "N개 그룹" 폴백 라벨로 표시.
 */
export default function AudienceMarkerLayer({
  blockAudienceMap,
  onClick,
}: LayerProps) {
  // BlockPopover는 editor.transact → prosemirrorView.domAtPos를 호출한다.
  // BlockNoteView가 마운트되기 전엔 view가 없어 throw하므로,
  // editor.prosemirrorView가 준비될 때까지 렌더 보류.
  // detail 페이지(editable=false)에서 첫 렌더 시 충돌 회피용.
  const editor = useBlockNoteEditor<any, any, any>();
  const [editorReady, setEditorReady] = useState(false);
  useEffect(() => {
    if (editor?.prosemirrorView) {
      setEditorReady(true);
      return;
    }
    // view가 아직 안 붙었으면 다음 microtask에서 한 번 더 확인.
    const id = requestAnimationFrame(() => {
      if (editor?.prosemirrorView) setEditorReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, [editor]);

  // 문서가 바뀔 때마다 BlockPopover의 reference 재계산을 유도하기 위해 강제 리렌더.
  const [, forceRerender] = useReducer((x) => x + 1, 0);
  useEditorChange(() => forceRerender());

  const { data: groups = [] } = useQuery({
    queryKey: ["user-groups"],
    queryFn: getUserGroups,
    enabled: false,
  });
  const groupNameById = useMemo(() => {
    const m = new Map<number, string>();
    groups.forEach((g) => m.set(g.id, g.name));
    return m;
  }, [groups]);

  const entries = useMemo(
    () =>
      Object.entries(blockAudienceMap).filter(
        ([, ids]) => ids && ids.length > 0,
      ),
    [blockAudienceMap],
  );

  if (!editorReady) return null;

  return (
    <>
      {entries.map(([blockId, groupIds]) => (
        <AudienceMarker
          key={blockId}
          blockId={blockId}
          groupIds={groupIds}
          groupNameById={groupNameById}
          onClick={onClick}
        />
      ))}
    </>
  );
}
