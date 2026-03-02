import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import StatsCard from "../components/stats-card/StatsCard";
import DailyGroup from "../components/daily-group/DailyGroup";
import type { TransactionModel } from "@my-wallet/types";
import { formatDate, getDateLabel } from "@/utils/date";
import InfiniteScroll from "@/components/infinite-scroll/InfiniteScroll";
import { Spinner } from "@/components/ui/spinner";
import { useInfiniteTransactions } from "../hooks/use-infinite-transactions";
import { useSearchDebounce } from "@/hooks/use-search-debounce";
import { useGetSpendingOverview } from "@/modules/add/hooks/use-get-spending-overview";

interface DailyGroupData {
  day: string; // YYYY-MM-DD (matches backend `extra[].day`)
  date: string;
  label: string;
  total: number;
  transactions: TransactionModel.TransactionWithCategoryDto[];
}

const groupTransactionsByDate = (
  transactions: TransactionModel.TransactionWithCategoryDto[],
  totalsByDay: Map<string, number>,
): DailyGroupData[] => {
  const grouped: Record<string, TransactionModel.TransactionWithCategoryDto[]> =
    {};

  for (const transaction of transactions) {
    const day = transaction.created_at.split("T")[0];
    if (!grouped[day]) {
      grouped[day] = [];
    }
    grouped[day].push(transaction);
  }

  return Object.entries(grouped)
    .map(([day, txns]) => {
      // Parse as local date to keep Today/Yesterday labels intuitive.
      // `day` is still the canonical key from backend.
      const localIsoDate = `${day}T00:00:00`;
      return {
        day,
        date: formatDate(localIsoDate),
        label: getDateLabel(localIsoDate),
        total:
          totalsByDay.get(day) ?? txns.reduce((sum, t) => sum + t.amount, 0),
        transactions: txns.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        ),
      };
    })
    .sort((a, b) => b.day.localeCompare(a.day));
};

export default function TransactionPage() {
  const { debouncedValue, setSearchQuery, searchQuery } =
    useSearchDebounce(200);

  const infinite = useInfiniteTransactions({
    page_size: 10,
    query: debouncedValue.trim() || undefined,
  });
  const overview = useGetSpendingOverview();

  const transactions = infinite.data?.pages.flatMap((p) => p.data) || [];

  const totalsByDay = () => {
    const map = new Map<string, number>();
    const pages = infinite.data?.pages ?? [];
    for (const page of pages) {
      const extra = page.extra ?? [];
      for (const item of extra) {
        map.set(item.day, item.total);
      }
    }
    return map;
  };

  const hasMore = !!infinite.hasNextPage;

  const next = () => {
    if (infinite.isFetchingNextPage) return;
    if (!infinite.hasNextPage) return;
    void infinite.fetchNextPage();
  };

  // Group transactions by date
  const groupedTransactions = groupTransactionsByDate(
    transactions,
    totalsByDay(),
  );

  const totalSpent = overview.data?.total ?? 0;
  const avgPerTransaction = overview.data?.average ?? 0;
  const highestTransaction = overview.data?.highest ?? 0;

  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-y-auto p-4 pb-[calc(var(--bottom-nav-total-h))]">
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

      <InfiniteScroll
        isLoading={infinite.isFetchingNextPage}
        hasMore={hasMore}
        next={next}
        rootMargin="200px"
      >
        <section className="flex flex-col gap-6">
          {infinite.isLoading ? (
            <div className="flex w-full justify-center py-6">
              <Spinner />
            </div>
          ) : groupedTransactions.length > 0 ? (
            <div className="flex flex-col gap-6">
              {groupedTransactions.map((dailyGroup) => (
                <DailyGroup
                  key={dailyGroup.day}
                  date={dailyGroup.date}
                  label={dailyGroup.label}
                  total={dailyGroup.total}
                  transactions={dailyGroup.transactions}
                />
              ))}
              {infinite.isFetchingNextPage && (
                <div className="flex w-full justify-center">
                  <Spinner />
                </div>
              )}
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
      </InfiniteScroll>
    </div>
  );
}
