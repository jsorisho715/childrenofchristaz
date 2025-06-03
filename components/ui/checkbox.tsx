import React from "react";

export const Checkbox = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => <input type="checkbox" ref={ref} {...props} />
);

Checkbox.displayName = "Checkbox"; 