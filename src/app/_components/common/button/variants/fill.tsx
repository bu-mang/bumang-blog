import ButtonBase from "./base";
import { ButtonProps } from "../types";
import clsx from "clsx";

const FillButton: React.FC<ButtonProps> = ({
  isLoading = false,
  disabled = false,
  onClick,
  children,
  className = "",
  ...props
}) => {
  const buttonClass = clsx(
    "px-4 py-2 rounded-md text-white transition-colors",
    {
      "bg-blue-500 hover:bg-blue-600": !disabled && !isLoading,
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
      children
    </ButtonBase>
  );
};

export default FillButton;
