import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { CashflowStat } from "./CashflowStats";

type CashflowSummaryProps = {
  income: number;
  spent: number;
  className?: string;
};

export default function CashflowSummary({
  income,
  spent,
  className,
}: CashflowSummaryProps) {
  return (
    <div
      className={cn(
        "bg-secondary col-span-2 rounded-xl border p-3 sm:p-4",
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Cash Flow</p>
          <p className="text-muted-foreground text-xs">
            Quick snapshot of money in and out
          </p>
        </div>
        <Icon
          icon="solar:wallet-money-bold-duotone"
          className="text-muted-foreground size-5"
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <CashflowStat
          title="Income"
          amount={income}
          description="Money added to your wallet"
          tone="income"
        />
        <CashflowStat
          title="Spent"
          amount={spent}
          description="Total outgoing transactions"
          icon="solar:arrow-up-bold-duotone"
          tone="spent"
        />
      </div>
    </div>
  );
}
