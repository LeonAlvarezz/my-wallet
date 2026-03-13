import { AmountDisplay } from "@/components/amount/AmountDisplay";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatAmount } from "@/utils/currency";
import { Icon } from "@iconify/react";

export interface StatsCardProps {
  title: string;
  amount: number | string;
  icon?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export default function StatsCard({
  title,
  amount,
  icon,
  trend = "neutral",
  className,
}: StatsCardProps) {
  const parsedAmount = formatAmount(amount);
  const trendStyles = {
    up: {
      accent: "text-emerald-600 dark:text-emerald-400",
      description: "text-emerald-700/80 dark:text-emerald-300/80",
      iconBg: "bg-emerald-500/10",
    },
    down: {
      accent: "text-rose-600 dark:text-rose-400",
      description: "text-rose-700/80 dark:text-rose-300/80",
      iconBg: "bg-rose-500/10",
    },
    neutral: {
      accent: "text-foreground",
      description: "text-muted-foreground",
      iconBg: "bg-muted",
    },
  };
  const styles = trendStyles[trend];

  return (
    <Card
      className={cn("relative min-w-0 overflow-hidden px-4 py-3", className)}
    >
      {/* <div className="pointer-events-none absolute inset-0 opacity-70">
        <div
          className={cn(
            "absolute -top-20 -right-12 size-40 rounded-full opacity-50 blur-xl",
            styles.iconBg,
          )}
        />
        <div className="text-foreground absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] bg-size-[18px_18px] opacity-[0.06]" />
      </div> */}
      <CardContent className="min-w-0 px-0">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-xs font-medium uppercase">
            {title}
          </p>
          {icon && (
            <span
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-md",
                styles.iconBg,
              )}
            >
              <Icon icon={icon} className={cn("size-4", styles.accent)} />
            </span>
          )}
        </div>

        <div className="flex min-w-0 items-baseline gap-2">
          <AmountDisplay
            value={parsedAmount}
            colorize={false}
            className={cn(
              "block max-w-full truncate text-[clamp(1rem,4vw,1.5rem)] leading-tight font-bold",
              styles.accent,
            )}
          />
        </div>

        {/* {description && (
          <p className={cn("text-xs", styles.description)}>{description}</p>
        )} */}
      </CardContent>
    </Card>
  );
}
