import { ButtonProps } from "../types";

const ButtonBase: React.FC<ButtonProps> = ({
  isLoading = false,
  disabled = false,
  onClick,
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={className}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <span className="animate-spin">🔄</span> : children}
    </button>
  );
};

export default ButtonBase;
