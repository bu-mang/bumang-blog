import { forwardRef } from "react";
import type { ButtonProps } from "@/types";
import { cn } from "@/utils/cn";

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
        className={cn("active:scale-95", className)}
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
