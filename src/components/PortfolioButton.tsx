import type { ButtonHTMLAttributes, ReactNode } from "react";

type PortfolioButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  tone?: "solid" | "outline" | "ghost";
};

export function PortfolioButton({
  children,
  className = "",
  tone = "outline",
  ...props
}: PortfolioButtonProps) {
  return (
    <button
      className={`portfolio-button portfolio-button--${tone} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}