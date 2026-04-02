export function RadioCard({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={[
        "flex cursor-pointer items-start gap-3 rounded-md border p-4 transition-colors",
        checked ? "border-foreground bg-muted/50" : "border-border bg-background",
      ].join(" ")}
    >
      <input
        type="radio"
        name="appointmentType"
        className="mt-1"
        checked={checked}
        onChange={onChange}
      />
      <span className="space-y-1">
        <span className="block text-sm font-medium">{label}</span>
        <span className="block text-sm text-muted-foreground">{description}</span>
      </span>
    </label>
  );
}

