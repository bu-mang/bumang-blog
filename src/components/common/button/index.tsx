import { forwardRef } from "react";
import Loader from "../loader";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onHover?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  classname?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      loading,
      disabled,
      onHover,
      onMouseEnter,
      onMouseLeave,
      classname,
    }: ButtonProps,
    ref,
  ) => {
    const handleClick = () => {
      if (!disabled && !loading) {
        onClick();
      }
    };

    return (
      <button
        ref={ref}
        className={classname + ` ${onHover}`}
        onClick={handleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {loading && <Loader />}
        {children}
      </button>
    );
  },
);

export default Button;
