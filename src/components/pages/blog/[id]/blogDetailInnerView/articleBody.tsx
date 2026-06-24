"use client";

import { useEffect } from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { PartialBlock } from "@blocknote/core";
import { blogBlockNoteSchema } from "@/components/editor/blogBlockNoteSchema";
import AudienceMarkerLayer, {
  AudienceMarkerSpec,
} from "@/components/editor/blockAudience/audienceMarkerLayer";
import { PATHNAME } from "@/constants/routes/pathnameRoutes";

import "@blocknote/mantine/style.css";

interface ArticleBodyProps {
  blockNoteContent: PartialBlock[];
  maskedBlockIds: string[];
  isAnon: boolean;
  audienceMarkers: AudienceMarkerSpec[];
}

/**
 * BlockNote 에디터 본문.
 * useCreateBlockNote는 생성 시 DOM(window)에 접근하므로 서버에서 렌더하면
 * "window is not defined"로 페이지가 500을 반환한다(크롤러가 OG를 거부).
 * 따라서 이 컴포넌트는 index에서 next/dynamic ssr:false로만 로드한다.
 */
export default function ArticleBody({
  blockNoteContent,
  maskedBlockIds,
  isAnon,
  audienceMarkers,
}: ArticleBodyProps) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const editor = useCreateBlockNote({
    schema: blogBlockNoteSchema,
    initialContent: blockNoteContent,
  });

  // 백엔드가 마스킹한 블록에 블러 클래스/툴팁/클릭 핸들러 부여.
  // BlockNote가 각 블록을 [data-id="..."]로 렌더하므로 그걸로 찾는다.
  useEffect(() => {
    const ids = maskedBlockIds ?? [];
    if (ids.length === 0) return;

    const tooltip = isAnon
      ? "로그인하면 볼 수 있어요"
      : "권한이 있는 그룹에 속해야 볼 수 있어요";

    const handlers: Array<{ el: HTMLElement; onClick: () => void }> = [];

    const raf = requestAnimationFrame(() => {
      ids.forEach((id) => {
        const el = document.querySelector<HTMLElement>(`[data-id="${id}"]`);
        if (!el) return;
        el.classList.add("audience-blocked");
        el.title = tooltip;
        const onClick = () => {
          if (isAnon) router.push(PATHNAME.LOGIN);
        };
        el.addEventListener("click", onClick);
        handlers.push({ el, onClick });
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      handlers.forEach(({ el, onClick }) => {
        el.classList.remove("audience-blocked");
        el.removeAttribute("title");
        el.removeEventListener("click", onClick);
      });
    };
  }, [maskedBlockIds, isAnon, router]);

  return (
    <div className="max-sm:[&_.bn-editor]:px-0 lg:-mx-[46px]">
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        editable={false}
      >
        {audienceMarkers.length > 0 && (
          <AudienceMarkerLayer markers={audienceMarkers} />
        )}
      </BlockNoteView>
    </div>
  );
}
