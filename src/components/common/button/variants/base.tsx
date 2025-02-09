import { forwardRef } from "react";
import { ButtonProps } from "../types";

const ButtonBase = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      isLoading = false,
      disabled = false,
      onClick,
      children,
      className = "",
      ...props
    }: ButtonProps,
    ref,
  ) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={className}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? <span className="animate-spin">🔄</span> : children}
      </button>
    );
  },
);

ButtonBase.displayName = "ButtonBase";
export default ButtonBase;
