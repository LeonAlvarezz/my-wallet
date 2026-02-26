import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import StatsCard from "../components/stats-card/StatsCard";
import DailyGroup from "../components/daily-group/DailyGroup";
import { useGetTransactions } from "@/modules/add/hooks/use-get-transactions";
import type { TransactionModel } from "@my-wallet/types";
import { formatDate, getDateLabel } from "@/utils/date";

interface DailyGroupData {
  date: string;
  label: string;
  total: number;
  transactions: TransactionModel.TransactionWithCategoryDto[];
}

const groupTransactionsByDate = (
  transactions: TransactionModel.TransactionWithCategoryDto[],
): DailyGroupData[] => {
  const grouped: Record<string, TransactionModel.TransactionWithCategoryDto[]> =
    {};

  transactions.forEach((transaction) => {
    const dateKey = new Date(transaction.created_at).toDateString();
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }

    grouped[dateKey].push(transaction);
  });

  // Convert grouped object to array and sort by date (newest first)
  return Object.entries(grouped)
    .map(([dateKey, txns]) => {
      const isoDate = new Date(dateKey).toISOString();
      return {
        date: formatDate(isoDate),
        label: getDateLabel(isoDate),
        total: txns.reduce((sum, t) => sum + t.amount, 0),
        transactions: txns.sort((a, b) => {
          // Sort by time descending (newest first)
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        }),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export default function TransactionPage() {
  const { data: transactions = [] } = useGetTransactions();
  const [searchQuery, setSearchQuery] = useState("");

  // Group transactions by date
  const groupedTransactions = groupTransactionsByDate(transactions);

  // Calculate stats
  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
  const avgPerTransaction =
    transactions.length > 0 ? totalSpent / transactions.length : 0;
  const highestTransaction =
    transactions.length > 0
      ? Math.max(...transactions.map((t) => t.amount))
      : 0;

  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-y-auto p-4 pb-[calc(var(--bottom-nav-total-h)+1rem)]">
      {/* Search Bar */}
      <div className="relative">
        <Input
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Icon
          icon="solar:magnifer-bold"
          className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
        />
      </div>

      {/* At a Glance Stats */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">At a Glance</h2>
          <Button variant="ghost" size="sm">
            This Month
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <StatsCard
            title="Total Spent"
            amount={totalSpent.toFixed(2)}
            icon="solar:wallet-bold-duotone"
            className="sm:col-span-2"
          />
          <StatsCard
            title="Average"
            amount={avgPerTransaction.toFixed(2)}
            icon="solar:chart-2-bold-duotone"
            description="per transaction"
          />
          <StatsCard
            title="Highest"
            amount={highestTransaction.toFixed(2)}
            icon="solar:arrow-up-bold-duotone"
            trend="up"
            description="single transaction"
          />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        {groupedTransactions.length > 0 ? (
          <div className="flex flex-col gap-6">
            {groupedTransactions.map((dailyGroup) => (
              <DailyGroup
                key={dailyGroup.date}
                date={dailyGroup.date}
                label={dailyGroup.label}
                total={dailyGroup.total}
                transactions={dailyGroup.transactions}
              />
            ))}
          </div>
        ) : (
          <div className="bg-card/50 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-12">
            <Icon
              icon="solar:inbox-bold"
              className="text-muted-foreground size-8"
            />
            <p className="text-muted-foreground text-sm">
              No transactions found
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
