import React from "react";

export function RadioGroup({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

export function RadioGroupItem(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input type="radio" {...props} />;
} 