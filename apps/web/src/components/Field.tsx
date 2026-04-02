import type { ReactNode } from "react";

export function Field({
  label,
  hint,
  required,
  className,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`space-y-2 ${className ?? ""}`}>
      <div className="flex items-end justify-between gap-3">
        <span className="text-sm font-medium">
          {label}
          {required ? <span className="ml-1 text-muted-foreground">*</span> : null}
        </span>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </div>
      {children}
    </label>
  );
}

