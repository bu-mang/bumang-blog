"use client";

import { useCallback, useMemo, useRef } from "react";
import { Lock } from "lucide-react";
import {
  BlockColorsItem,
  DragHandleMenu,
  RemoveBlockItem,
  SideMenu,
  SideMenuController,
  useBlockNoteEditor,
  useComponentsContext,
  useExtensionState,
} from "@blocknote/react";
import { SideMenuExtension } from "@blocknote/core/extensions";
import { offset } from "@floating-ui/react";

interface BlockAudienceSideMenuProps {
  onSetAudience: (blockId: string) => void;
  blockAudienceMap: Record<string, number[]>;
}

function SetAudienceItem({
  onSetAudience,
}: {
  onSetAudience: (blockId: string) => void;
}) {
  const Components = useComponentsContext()!;
  const editor = useBlockNoteEditor<any, any, any>();
  const block = useExtensionState(SideMenuExtension, {
    editor,
    selector: (state) => state?.block,
  });

  if (!block) return null;

  return (
    <Components.Generic.Menu.Item
      className="bn-menu-item"
      icon={<Lock size={14} />}
      onClick={() => onSetAudience(block.id)}
    >
      Set audience
    </Components.Generic.Menu.Item>
  );
}

/**
 * BlockNote SideMenu에 "공개대상 설정" 메뉴 아이템을 추가한 커스텀 SideMenuController.
 * editInner의 <BlockNoteView sideMenu={false}> 아래에 children으로 박는다.
 *
 * sideMenu / dragHandleMenu 콜백은 반드시 stable reference여야 함.
 * SideMenuController는 props.sideMenu를 React 컴포넌트로 직접 렌더(<Component />)하기 때문에,
 * 매 렌더마다 새 함수면 unmount→remount가 발생해 드롭다운이 즉시 닫힌다.
 */
export default function BlockAudienceSideMenu({
  onSetAudience,
  blockAudienceMap,
}: BlockAudienceSideMenuProps) {
  const dragHandleMenu = useCallback(
    () => (
      <DragHandleMenu>
        <RemoveBlockItem>Delete</RemoveBlockItem>
        <BlockColorsItem>Colors</BlockColorsItem>
        <SetAudienceItem onSetAudience={onSetAudience} />
      </DragHandleMenu>
    ),
    [onSetAudience],
  );

  const sideMenu = useMemo(
    () =>
      function CustomSideMenu(props: { dragHandleMenu?: React.FC }) {
        return <SideMenu {...props} dragHandleMenu={dragHandleMenu} />;
      },
    [dragHandleMenu],
  );

  // SideMenuController에 동적 offset을 주입. 호버한 블록이 audience-set이면
  // BADGE 폭만큼 main-axis(왼쪽 방향)로 더 밀어 마커가 차지하는 자리를 비운다.
  //
  // ⚠️ closure stale 회피: floating-ui의 useFloating은 한 번 받은 middleware를
  // 내부적으로 캐시해 새 closure로 갈아끼우지 않는다. blockAudienceMap을 closure로 잡으면
  // 첫 렌더 시점의 (보통 빈) 값이 영구히 남는다. 그래서 ref로 우회 — middleware는 한 번만
  // 만들고 매 호출 시 ref.current에서 최신 map을 읽는다.
  //
  // BlockPopover가 setPositionReference로 virtual element를 쓸 수 있어 contextElement
  // → closest로 block container까지 올라가 data-id 추출.
  const audienceMapRef = useRef(blockAudienceMap);
  audienceMapRef.current = blockAudienceMap;

  const floatingUIOptions = useMemo(
    () => ({
      useFloatingOptions: {
        middleware: [
          offset(({ elements }) => {
            const ref = elements.reference as
              | (HTMLElement & { contextElement?: HTMLElement })
              | null;
            const ctx =
              (ref?.contextElement as HTMLElement | undefined) ??
              (ref instanceof Element ? ref : null);
            const blockEl = ctx?.closest?.(
              '[data-node-type="blockContainer"][data-id]',
            );
            const blockId = blockEl?.getAttribute("data-id");
            if (!blockId) return 0;
            const ids = audienceMapRef.current[blockId];
            if (!ids || ids.length === 0) return 0;
            // 실제 마커 DOM의 폭을 측정해 정확히 그만큼만 밀어준다.
            // 마커는 FloatingPortal로 body에 떠있어 일반 querySelector로 찾을 수 있음.
            const marker = document.querySelector<HTMLElement>(
              `[data-audience-marker-block-id="${blockId}"]`,
            );
            const width = marker?.offsetWidth ?? 0;
            return width > 0 ? width : 0;
          }),
        ],
      },
    }),
    [],
  );

  return (
    <SideMenuController
      sideMenu={sideMenu}
      floatingUIOptions={floatingUIOptions}
    />
  );
}
