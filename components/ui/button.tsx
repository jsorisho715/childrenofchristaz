import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, children, ...props }, ref) => {
    if (asChild) {
      // If asChild is true, render children directly (for use with Link, etc.)
      return React.cloneElement(children as React.ReactElement, {
        ref,
        ...props,
      });
    }
    return (
      <button ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button"; 