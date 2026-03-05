import { AmountDisplay } from "@/components/amount/AmountDisplay";
import { cn } from "@/lib/utils";
import { toNumber } from "@/utils/currency";
import { Icon } from "@iconify/react";

export interface StatsCardProps {
  title: string;
  amount: number | string;
  icon?: string;
  trend?: "up" | "down" | "neutral";
  description?: string;
  className?: string;
}

export default function StatsCard({
  title,
  amount,
  icon,
  trend = "neutral",
  description,
  className,
}: StatsCardProps) {
  const trendColor = {
    up: "text-green-500",
    down: "text-red-500",
    neutral: "text-muted-foreground",
  };

  return (
    <div
      className={cn(
        "bg-secondary flex flex-col gap-2 rounded-lg border p-4",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-xs font-medium uppercase">
          {title}
        </p>
        {icon && <Icon icon={icon} className="text-muted-foreground size-5" />}
      </div>

      <div className="flex items-baseline gap-2">
        <AmountDisplay
          value={toNumber(amount)}
          className="text-3xl font-bold"
          showSign={false}
          colorize={false}
        />
        {trend !== "neutral" && (
          <Icon
            icon={
              trend === "up" ? "solar:arrow-up-bold" : "solar:arrow-down-bold"
            }
            className={`size-4 ${trendColor[trend]}`}
          />
        )}
      </div>

      {description && (
        <p className="text-muted-foreground text-xs">{description}</p>
      )}
    </div>
  );
}
