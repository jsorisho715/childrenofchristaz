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

export function CardHeader({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex flex-col space-y-1.5 p-6" {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className="text-2xl font-semibold leading-none tracking-tight" {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className="text-sm text-muted-foreground" {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="p-6 pt-0" {...props}>
      {children}
    </div>
  );
} 