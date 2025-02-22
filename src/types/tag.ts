import { IndicatorValues } from "./indicatorValue";

/**
 * 태그의 기능
 * 1. 링크: 누르면 쿼리스트링 바꾸기 -> 데이터 패칭
 * 2. 버튼: 누르면 핸들러 발동 -> ui조작 혹은 데이터 패칭
 * 3. 라벨: 상호작용없이 정보 보여주기
 */

/**
 * TagType:
 * 서버에서 패칭 해오는 값.
 * id: string, value: string, label: string
 */
export interface TagType extends IndicatorValues {
  id: string;
}

export interface TagCompType {
  url: string;
  onClick: () => void;
  type: "link" | "button";
  size: "sm" | "lg";

  className: string;
  hasBackground: boolean;
  fixedBgColor: "dark" | "lightGray";

  hasXButton: boolean;
  isActivated: boolean;
  setIsActivated: (v?: boolean) => void; // 단순 Label로 쓸 경우 불필요하기 때문에 Optional
}

/**
 * 컴포넌트의 CONTROLLER 로직과 결합한 PROPS
 */
export type TagProps = TagType & Partial<TagCompType>;
