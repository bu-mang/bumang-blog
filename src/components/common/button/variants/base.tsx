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
      defaultShrink = true,
      ...props
    }: ButtonProps,
    ref,
  ) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(defaultShrink && "active:scale-95", className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center justify-center">
            <svg
              className="h-[1em] w-[1em] animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </span>
        ) : (
          children
        )}
      </button>
    );
  },
);

ButtonBase.displayName = "ButtonBase";
export default ButtonBase;
