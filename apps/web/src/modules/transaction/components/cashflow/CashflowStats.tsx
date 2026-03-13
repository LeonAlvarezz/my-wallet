import { AmountDisplay } from "@/components/amount/AmountDisplay";
import { cn } from "@/lib/utils";
import { formatAmount } from "@/utils/currency";
import { Icon } from "@iconify/react";

type CashflowStatProps = {
  title: string;
  amount: number;
  description: string;
  tone: "income" | "spent" | "total";
};

export function CashflowStat({
  title,
  amount,
  description,
  tone,
}: CashflowStatProps) {
  const styles = {
    income: {
      card: "border-emerald-500/20 bg-emerald-500/8",
      text: "text-emerald-500",
    },
    spent: {
      card: "border-rose-500/20 bg-rose-500/8",
      text: "text-rose-500",
    },

    total: {
      card: "border-gray-500/20 bg-gray-500/8",
      text: "text-gray-500",
    },
  } as const;
  const toneStyle = styles[tone];

  return (
    <div className={cn("rounded-xl border p-4", toneStyle.card)}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            {title}
          </p>
          <AmountDisplay
            value={
              tone === "income" ? formatAmount(amount) : formatAmount(-amount)
            }
            className={cn("text-2xl font-bold sm:text-3xl")}
          />
        </div>

        {/* <div
          className={cn(
            "flex size-10 items-center justify-center rounded-full shadow-sm",
            toneStyle.badge,
          )}
        >
          <Icon icon={icon} className="size-5" />
        </div> */}

        <Icon
          icon={
            tone === "income" ? "solar:arrow-up-bold" : "solar:arrow-down-bold"
          }
          className={cn(toneStyle.text)}
        />
      </div>

      <p className="text-muted-foreground mt-3 text-xs">{description}</p>
    </div>
  );
}
