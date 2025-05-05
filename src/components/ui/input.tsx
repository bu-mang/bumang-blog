import * as React from "react";

import { cn } from "@/utils/cn";

interface InputProps {
  isTouchedField?: boolean;
  errorHint?: string;
  successHint?: string;
  containerClassName?: string;
}

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & InputProps
>(
  (
    {
      className,
      type,

      // FOR CONTAINER STYLE
      containerClassName,

      // RHF
      errorHint,
      isTouchedField,
      successHint,

      ...props
    },
    ref,
  ) => {
    return (
      <div className={containerClassName}>
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            isTouchedField && !errorHint && "border-green-500",
            className,
          )}
          ref={ref}
          {...props}
        />

        {/* ERROR MESSAGE: ""거나 null이면 표출하지 않음 */}
        {errorHint && (
          <span className="text-sm text-red-500 transition-all">
            {errorHint}
          </span>
        )}

        {/* SUCCESS MESSAGE: ""거나 null이면 표출하지 않음 */}
        {!errorHint && isTouchedField && successHint && (
          <span className="text-sm text-green-500 transition-all">
            {successHint}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
