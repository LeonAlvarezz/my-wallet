import { cn } from "@/lib/utils";

export function ToggleRow({
  title,
  description,
  checked,
  onCheckedChange,
}: {
  title: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="bg-card flex items-center justify-between gap-3 rounded-lg border p-3">
      <div className="flex flex-col">
        <p className="text-sm font-medium">{title}</p>
        {description && (
          <p className="text-muted-foreground text-xs">{description}</p>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full border transition-colors",
          checked ? "bg-primary" : "bg-secondary",
        )}
      >
        <span
          className={cn(
            "bg-background inline-block size-5 translate-x-0.5 rounded-full shadow-xs transition-transform",
            checked ? "translate-x-5" : "translate-x-0.5",
          )}
        />
      </button>
    </div>
  );
}
