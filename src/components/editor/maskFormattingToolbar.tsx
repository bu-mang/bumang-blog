"use client";

import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EyeOff } from "lucide-react";
import {
  FormattingToolbar,
  FormattingToolbarController,
  getFormattingToolbarItems,
  useBlockNoteEditor,
  useComponentsContext,
  useEditorSelectionChange,
} from "@blocknote/react";
import { getUserGroups } from "@/services/api/userGroups";
import type { BlogBlockNoteEditor } from "./blogBlockNoteSchema";

/**
 * 포맷 툴바의 "가리기" 버튼 — 선택 구간에 인라인 마스킹(styles.masked) 적용.
 * 드롭다운에서 audience 그룹을 토글하면 그 그룹id들이 콤마조인되어 스타일 값으로 들어간다.
 * BlockNote 메뉴는 툴바 내부라 에디터 선택이 유지된다.
 */
function MaskMenuButton() {
  const editor = useBlockNoteEditor() as unknown as BlogBlockNoteEditor;
  const Components = useComponentsContext()!;
  const { data: groups = [] } = useQuery({
    queryKey: ["user-groups"],
    queryFn: getUserGroups,
    retry: false,
  });

  // 선택/내용 변경 시 활성 상태 반영을 위한 리렌더.
  // useEditorSelectionChange는 콜백을 effect 의존성으로 쓰므로, 인라인 함수를 넘기면
  // 매 렌더마다 구독을 해제·재등록한다. useCallback으로 정체성을 고정한다.
  const [, force] = useState(0);
  const onSelectionChange = useCallback(() => force((n) => n + 1), []);
  useEditorSelectionChange(onSelectionChange, editor);

  const active = editor.getActiveStyles().masked;
  const current =
    typeof active === "string" && active.length > 0
      ? active
          .split(",")
          .map((s) => Number(s))
          .filter((n) => Number.isFinite(n))
      : [];

  const toggle = (id: number) => {
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    if (next.length > 0) editor.addStyles({ masked: next.join(",") });
    else editor.removeStyles({ masked: active ?? "" });
    editor.focus();
  };

  return (
    <Components.Generic.Menu.Root>
      <Components.Generic.Menu.Trigger>
        <Components.FormattingToolbar.Button
          className="bn-button"
          label="가리기"
          mainTooltip="선택 구간을 특정 그룹만 보이게 (인라인 마스킹)"
          icon={<EyeOff size={16} />}
          isSelected={current.length > 0}
        />
      </Components.Generic.Menu.Trigger>
      <Components.Generic.Menu.Dropdown className="bn-menu-dropdown">
        {groups.length === 0 ? (
          <Components.Generic.Menu.Item>
            그룹이 없어요 (/admin/groups)
          </Components.Generic.Menu.Item>
        ) : (
          groups.map((g) => (
            <Components.Generic.Menu.Item
              key={g.id}
              checked={current.includes(g.id)}
              onClick={() => toggle(g.id)}
            >
              {g.name}
            </Components.Generic.Menu.Item>
          ))
        )}
      </Components.Generic.Menu.Dropdown>
    </Components.Generic.Menu.Root>
  );
}

/**
 * ⚠️ 반드시 모듈 스코프에 둔다.
 * FormattingToolbarController의 `formattingToolbar` prop 타입은 `FC`(컴포넌트 타입)라
 * 렌더 함수처럼 호출되는 게 아니라 `<Component />`로 렌더된다. 여기에 인라인 화살표
 * 함수를 넘기면 부모가 리렌더될 때마다 "새로운 컴포넌트 타입"이 되어 툴바 서브트리가
 * 통째로 리마운트되고, uncontrolled인 Mantine 메뉴의 열림 상태가 날아간다
 * (= 드롭다운이 열렸다가 곧바로 닫히는 간헐적 증상).
 */
const MaskToolbar = () => (
  <FormattingToolbar>
    {getFormattingToolbarItems()}
    <MaskMenuButton key="mask" />
  </FormattingToolbar>
);

/** 기본 포맷 툴바 + "가리기" 버튼. editInner의 BlockNoteView 자식으로 넣는다. */
export function MaskFormattingToolbar() {
  return <FormattingToolbarController formattingToolbar={MaskToolbar} />;
}
