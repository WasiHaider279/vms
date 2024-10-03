import { ButtonHTMLAttributes, ReactNode } from "react";
import Loader from "../Loader";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "disabled";
  isLoading?: boolean;
  className?: string;
  children?: ReactNode;
}

const Button = ({
  variant = "primary",
  isLoading = false,
  type = "button",
  className = "",
  children,
  ...props
}: ButtonProps) => {
  const variantStyles = {
    primary: "btn",
    secondary: "btn-success",
    disabled: "btn-disabled",
  };

  const buttonStyles = `${className} ${
    variantStyles[variant] || variantStyles.primary
  }`;

  return (
    <button
      type={type}
      className={buttonStyles}
      {...props}
      disabled={isLoading}
    >
      {isLoading ? <Loader color="white" w={"20px"} h={"20px"} /> : children}
    </button>
  );
};

export default Button;
