import { createReactStyleSpec } from "@blocknote/react";

/**
 * 인라인 마스킹 스타일 `masked`.
 * 값 = 콤마조인 groupId (예: "3,5") — 이 그룹들만 원문을 볼 수 있다.
 * 서버(maskContent)가 권한 없는 뷰어에겐 텍스트를 더미로 치환하고 이 스타일을 유지시켜 내려주며,
 * 프론트는 `.masked-inline` 클래스로 블러(읽기뷰)/하이라이트(에디터·소유자)를 적용한다.
 */
export const maskedStyleSpec = createReactStyleSpec(
  { type: "masked", propSchema: "string" },
  {
    render: (props) => (
      <span
        className="masked-inline"
        data-groups={props.value}
        ref={props.contentRef}
      />
    ),
  },
);