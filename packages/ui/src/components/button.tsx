import * as React from "react";
import { cn } from "../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "rounded-md px-6 py-2 text-sm font-medium text-white transition-colors bg-zinc-800 hover:bg-zinc-600 active:scale-[0.98] cursor-pointer disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
