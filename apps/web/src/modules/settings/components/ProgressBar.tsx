import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  className,
  tone,
}: {
  value: number; // 0..100
  className?: string;
  tone: "green" | "orange" | "red";
}) {
  const toneClass =
    tone === "green"
      ? "bg-green-500"
      : tone === "orange"
        ? "bg-orange-500"
        : "bg-red-500";

  return (
    <div
      className={cn(
        "bg-secondary h-2 w-full overflow-hidden rounded-full",
        className,
      )}
    >
      <div
        className={cn("h-full", toneClass)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
