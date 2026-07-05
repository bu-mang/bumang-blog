import ButtonBase from "./base";
import { ButtonProps } from "@/types/button";
import { cn } from "@/utils/cn";

const FillButton: React.FC<ButtonProps> = ({
  isLoading = false,
  disabled = false,
  onClick,
  children,
  className = "",
  colorTheme = "dark",
  ...props
}) => {
  // colorTheme "dark" = 메인 액션(primary), "light" = 서브/취소(secondary).
  // 시맨틱 토큰이라 .dark 클래스에 따라 라이트/다크 색이 자동 반전된다.
  const darkClass = cn(
    "bg-primary text-primary-foreground hover:bg-primary/90 px-4 h-8 rounded-md transition-colors",
    {
      "cursor-not-allowed opacity-50": disabled,
      "cursor-wait": isLoading,
    },
    className,
  );
  const lightClass = cn(
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 h-8 rounded-md transition-colors",
    {
      "cursor-not-allowed opacity-50": disabled,
      "cursor-wait": isLoading,
    },
    className,
  );

  return (
    <ButtonBase
      className={colorTheme === "dark" ? darkClass : lightClass}
      onClick={onClick}
      isLoading={isLoading}
      disabled={disabled}
      {...props}
    >
      {children}
    </ButtonBase>
  );
};

export default FillButton;
