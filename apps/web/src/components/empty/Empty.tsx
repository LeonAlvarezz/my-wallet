import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  description?: string;
  className?: string;
};
export default function Empty({
  title = "No data found",
  description = "No data available yet",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-1 rounded-2xl border p-10",
        className,
      )}
    >
      <h2 className="text-sm">{title}</h2>
      <p className="text-muted-foreground text-xs">{description}</p>
    </div>
  );
}
