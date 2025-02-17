import ButtonBase from "./base";
import { ButtonProps } from "../types";
import { cn } from "@/utils/cn";

const FillButton: React.FC<ButtonProps> = ({
  isLoading = false,
  disabled = false,
  onClick,
  children,
  className = "",
  ...props
}) => {
  const buttonClass = cn(
    "px-4 h-8 rounded-md text-white transition-colors",
    {
      "bg-gray-600 hover:bg-gray-800": !disabled && !isLoading,
      "cursor-not-allowed opacity-50": disabled,
      "cursor-wait": isLoading,
    },
    className,
  );

  return (
    <ButtonBase
      className={buttonClass}
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
