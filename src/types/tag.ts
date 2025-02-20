import { IndicatorValues } from "./indicatorValue";

interface TagComboBoxType {}

/**
 * 서버에서 패칭 해오는 값.
 * id: string, value: string, label: string
 */
export interface TagType extends IndicatorValues {
  id: string;
}

/**
 * 컴포넌트의 CONTROLLER 로직과 결합한 PROPS
 */
export interface TagProps extends TagType {
  url?: string;
  onClick?: () => void;
  type?: "link" | "button";
  size?: "sm" | "lg";

  className?: string;
  hasBackground?: boolean;
  fixedBgColor?: "dark" | "lightGray";

  isActivated: boolean;
  setIsActivated?: (v?: boolean) => void; // 단순 Label로 쓸 경우 불필요하기 때문에 Optional
}
