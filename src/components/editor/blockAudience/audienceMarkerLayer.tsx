"use client";

import { useEffect, useReducer, useState } from "react";
import { Lock } from "lucide-react";
import {
  BlockPopover,
  useBlockNoteEditor,
  useEditorChange,
} from "@blocknote/react";

export interface AudienceMarkerSpec {
  blockId: string;
  /** 이미 렌더 완료된 라벨 텍스트. 예: "친구" 또는 "친한친구, 가족" 또는 "3개 그룹" */
  label: string;
}

interface MarkerProps {
  spec: AudienceMarkerSpec;
  onClick?: (blockId: string) => void;
}

/**
 * 한 블록에 대한 audience 마커.
 * BlockPopover가 blockId로 해당 블록의 DOM 위치를 찾아 floating-ui로 앵커.
 * 블록이 이동·재배치돼도 autoUpdate가 자동 추적.
 */
function AudienceMarker({ spec, onClick }: MarkerProps) {
  return (
    <BlockPopover
      blockId={spec.blockId}
      useFloatingOptions={{ placement: "left-start", open: true }}
      elementProps={{ style: { zIndex: 10 } }}
    >
      <button
        type="button"
        data-audience-marker-block-id={spec.blockId}
        onClick={onClick ? () => onClick(spec.blockId) : undefined}
        title={`Audience: ${spec.label}`}
        className="mt-0.5 flex h-6 cursor-pointer items-center gap-1 px-1.5 text-xs text-foreground/40 hover:text-foreground/70"
      >
        <Lock size={12} />
        <span className="max-w-32 truncate">{spec.label}</span>
      </button>
    </BlockPopover>
  );
}

interface LayerProps {
  markers: AudienceMarkerSpec[];
  /** 마커 클릭 핸들러. 에디터에선 다이얼로그 열기, 상세 페이지에선 생략. */
  onClick?: (blockId: string) => void;
}

/**
 * 주어진 markers에 대해 각 블록 옆에 audience 마커를 floating으로 띄우는 레이어.
 * BlockNoteView 안에 children으로 박는다.
 *
 * markers는 caller가 미리 라벨까지 만들어 넘긴다.
 * - 에디터: blockAudienceMap(IDs) + user-groups 캐시로 직접 라벨 빌드
 * - 상세: post.blockAudienceLabels (이미 백엔드가 풀어준 names)
 */
export default function AudienceMarkerLayer({
  markers,
  onClick,
}: LayerProps) {
  // BlockPopover는 editor.transact → prosemirrorView.domAtPos를 호출한다.
  // BlockNoteView가 마운트되기 전엔 view가 없어 throw하므로,
  // editor.prosemirrorView가 준비될 때까지 렌더 보류.
  const editor = useBlockNoteEditor<any, any, any>();
  const [editorReady, setEditorReady] = useState(false);
  useEffect(() => {
    if (editor?.prosemirrorView) {
      setEditorReady(true);
      return;
    }
    const id = requestAnimationFrame(() => {
      if (editor?.prosemirrorView) setEditorReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, [editor]);

  // 문서가 바뀔 때마다 BlockPopover의 reference 재계산을 유도하기 위해 강제 리렌더.
  const [, forceRerender] = useReducer((x) => x + 1, 0);
  useEditorChange(() => forceRerender());

  if (!editorReady) return null;

  return (
    <>
      {markers.map((spec) => (
        <AudienceMarker key={spec.blockId} spec={spec} onClick={onClick} />
      ))}
    </>
  );
}

/** 그룹명 리스트를 마커에 노출할 라벨로 포맷. */
export function formatAudienceLabel(names: string[]): string {
  if (names.length === 0) return "";
  if (names.length <= 2) return names.join(", ");
  return `${names[0]} +${names.length - 1}`;
}
