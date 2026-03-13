import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { AmountDisplay } from "@/components/amount/AmountDisplay";
import { formatAmount } from "@/utils/currency";

type CashflowSummaryProps = {
  total: number;
  income: number;
  expense: number;
  className?: string;
};

export default function CashflowSummary({
  total,
  income,
  expense,
  className,
}: CashflowSummaryProps) {
  return (
    <Card
      className={cn(
        "border-input/50 bg-card relative overflow-hidden",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-20 -right-12 size-40 rounded-full bg-emerald-500/10 blur-xl" />
        <div className="absolute -bottom-16 -left-10 size-36 rounded-full bg-rose-500/10 blur-xl" />
        <div className="text-foreground absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] bg-size-[18px_18px] opacity-[0.06]" />
      </div>
      <CardContent className="relative">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm">Total Balance</p>
            <AmountDisplay
              value={formatAmount(total)}
              showSign={false}
              colorize={false}
              className="text-3xl font-bold"
            />
          </div>
          <div className="flex gap-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-emerald-500" />
                <p className="text-muted-foreground text-xs">Income</p>
              </div>
              <AmountDisplay
                value={formatAmount(income)}
                className="font-semibold"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-red-500" />
                <p className="text-muted-foreground text-xs">Spent</p>
              </div>
              <AmountDisplay
                value={formatAmount(-expense)}
                className="font-semibold"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
