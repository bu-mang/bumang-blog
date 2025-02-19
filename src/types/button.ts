export type ButtonColorType = "dark" | "light";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: (...args: any[]) => void | Promise<void>;
  children?: React.ReactNode;
  colorTheme?: ButtonColorType;
}
