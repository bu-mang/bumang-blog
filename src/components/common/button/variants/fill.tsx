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
  const darkClass = cn(
    "bg-gray-600 hover:bg-gray-800 px-4 h-8 rounded-md transition-colors",
    {
      "cursor-not-allowed opacity-50": disabled,
      "cursor-wait": isLoading,
    },
    className,
  );
  const lightClass = cn(
    "bg-gray-600 hover:bg-gray-800 px-4 h-8 rounded-md transition-colors",
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
