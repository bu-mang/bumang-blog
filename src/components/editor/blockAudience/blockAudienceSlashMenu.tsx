"use client";

import {
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  type DefaultReactSuggestionItem,
} from "@blocknote/react";
import { filterSuggestionItems } from "@blocknote/core";
import { Lock } from "lucide-react";

type AnyEditor = any;

interface Props {
  editor: AnyEditor;
  onSetAudience: (blockId: string) => void;
}

/**
 * "/" 슬래시 메뉴에 "공개대상 설정" 항목을 추가하는 컨트롤러.
 * editInner의 <BlockNoteView slashMenu={false}> 아래에 children으로 박는다.
 */
export default function BlockAudienceSlashMenu({
  editor,
  onSetAudience,
}: Props) {
  return (
    <SuggestionMenuController
      triggerCharacter="/"
      getItems={async (query) => {
        const defaults = getDefaultReactSlashMenuItems(editor);
        const audience: DefaultReactSuggestionItem = {
          title: "Set audience",
          subtext: "Choose which groups can see this block",
          aliases: ["audience", "permission", "lock", "visibility"],
          group: "Permissions",
          icon: <Lock size={16} />,
          onItemClick: () => {
            const pos = editor.getTextCursorPosition?.();
            const blockId = pos?.block?.id;
            if (blockId) onSetAudience(blockId);
          },
        };
        return filterSuggestionItems([...defaults, audience], query);
      }}
    />
  );
}
