/** 버튼 컬러 타입 */
export type ButtonColorType = "dark" | "light";

/** 공통 버튼 props */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: (...args: any[]) => void | Promise<void>;
  children?: React.ReactNode;
  colorTheme?: ButtonColorType;
}
