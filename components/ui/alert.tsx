import React from "react";

export function Alert({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div style={{ border: "1px solid #f5c518", padding: "1em", borderRadius: "4px", background: "#fffbe6" }} {...props}>
      {children}
    </div>
  );
}

export function AlertDescription({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p style={{ margin: 0, color: "#856404" }} {...props}>
      {children}
    </p>
  );
} 