import TransactionCard, {
  type TransactionCardData,
} from "../transaction-card/TransactionCard";

export interface DailyGroupData {
  date: string;
  label: string; // "Today", "Yesterday", "Mon, Jan 12"
  total: number;
  transactions: TransactionCardData[];
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
        <p className="font-semibold">-${total.toFixed(2)}</p>
      </div>

      {/* Transactions */}
      <div className="flex flex-col gap-2">
        {transactions.map((transaction) => (
          <button
            key={transaction.id}
            onClick={() => onTransactionClick?.(transaction.id)}
            className="w-full text-left"
          >
            <TransactionCard {...transaction} />
          </button>
        ))}
      </div>
    </div>
  );
}
