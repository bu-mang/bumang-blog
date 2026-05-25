import type { Theme } from "@blocknote/mantine";

// BlockNote 에디터 배경을 페이지 배경(globals.css의 --background)에 맞춤.
// CSS override는 BlockNote가 .bn-container[data-color-scheme=...] 같은 자체
// 셀렉터로 변수를 정의하고 page.css에 늦게 주입되어 specificity/cascade-layer
// 양쪽에서 막혔다. 공식 권장 방식인 theme prop으로 변수만 갈아끼운다.
const sharedColors = {
  colors: {
    editor: {
      background: "hsl(var(--background))",
    },
  },
} satisfies Theme;

export const EDITOR_TRANSPARENT_THEME = {
  light: sharedColors,
  dark: sharedColors,
};
