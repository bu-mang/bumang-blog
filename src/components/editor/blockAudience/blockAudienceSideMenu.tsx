"use client";

import { useCallback, useMemo } from "react";
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

interface BlockAudienceSideMenuProps {
  onSetAudience: (blockId: string) => void;
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

  return <SideMenuController sideMenu={sideMenu} />;
}
