import React from "react";

export function Card({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "1.5em",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        marginBottom: "1em"
      }}
      {...props}
    >
      {children}
    </div>
  );
} 