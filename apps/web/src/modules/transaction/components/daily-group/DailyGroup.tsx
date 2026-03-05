import type { TransactionModel } from "@my-wallet/types";
import { TransactionCard } from "../transaction-card";
import { AmountDisplay } from "@/components/amount/AmountDisplay";
// import TransactionCard, {
//   type TransactionCardData,
// } from "../transaction-card/TransactionCard";

export interface DailyGroupData {
  date: string;
  label: string; // "Today", "Yesterday", "Mon, Jan 12"
  total: number;
  transactions: TransactionModel.TransactionWithCategoryDto[];
}

interface DailyGroupProps extends DailyGroupData {
  onTransactionClick?: (transactionId: string) => void;
}

export default function DailyGroup({
  date,
  label,
  total,
  transactions,
  onTransactionClick,
}: DailyGroupProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Date Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex flex-col">
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-muted-foreground text-xs">{date}</p>
        </div>
        <AmountDisplay
          value={-total}
          colorize={false}
          className="font-semibold"
        />
      </div>

      {/* Transactions */}
      <div className="flex flex-col gap-2">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            onClick={() => onTransactionClick?.(transaction.id.toString())}
          >
            <TransactionCard transaction={transaction} />
          </div>
        ))}
      </div>
    </div>
  );
}
