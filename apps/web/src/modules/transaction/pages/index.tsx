import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import StatsCard from "../components/stats-card/StatsCard";
import DailyGroup from "../components/daily-group/DailyGroup";
import { BaseModel } from "@my-wallet/types";
import InfiniteScroll from "@/components/infinite-scroll/InfiniteScroll";
import { Spinner } from "@/components/ui/spinner";
import { useInfiniteTransactions } from "../hooks/use-infinite-transactions";
import { useSearchDebounce } from "@/hooks/use-search-debounce";
import { useGetSpendingOverview } from "@/modules/add/hooks/use-get-spending-overview";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { groupTransactionsByDate } from "@/utils/transaction";
import CashflowSummary from "../components/cashflow/CashflowSummary";

export default function TransactionPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/_homeLayout/transaction/" });
  const { debouncedValue, setSearchQuery, searchQuery } =
    useSearchDebounce(500);

  const timeFrame = search.time_frame ?? BaseModel.TimeFrameEnum.ALL_TIME;

  const infinite = useInfiniteTransactions({
    page_size: 10,
    query: debouncedValue.trim() || undefined,
    time_frame: timeFrame,
  });
  const overview = useGetSpendingOverview({ time_frame: timeFrame });

  const transactions = infinite.data?.pages.flatMap((p) => p.data) || [];
  const extras =
    infinite.data?.pages
      .flatMap((p) => p.extra)
      .filter((data) => data !== undefined) || [];

  const hasMore = !!infinite.hasNextPage;

  const next = () => {
    if (infinite.isFetchingNextPage) return;
    if (!infinite.hasNextPage) return;
    void infinite.fetchNextPage();
  };

  // Group transactions by date
  const groupedTransactions = groupTransactionsByDate(transactions, extras);

  const totalSpent = overview.data?.expense ?? 0;
  const totalTopUp = overview.data?.top_up ?? 0;
  const avgPerTransaction = overview.data?.average ?? 0;
  const highestTransaction = overview.data?.highest ?? 0;

  useEffect(() => {
    const nextQuery = debouncedValue.trim();
    if ((search.query ?? "") === nextQuery) return;

    navigate({
      to: "/transaction",
      search: (prev) => ({
        ...prev,
        query: nextQuery.length ? nextQuery : undefined,
      }),
      replace: true,
    });
  }, [debouncedValue, navigate, search.query]);

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
      {!debouncedValue && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Overview</h2>
            <Select
              value={timeFrame}
              onValueChange={(value) => {
                navigate({
                  to: "/transaction",
                  search: (prev) => ({
                    ...prev,
                    time_frame: value as BaseModel.TimeFrameEnum,
                  }),
                  replace: true,
                });
              }}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="week">This week</SelectItem>
                  <SelectItem value="month">This month</SelectItem>
                  <SelectItem value="year">This year</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* <Button variant="ghost" size="sm">
            This Month
          </Button> */}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-1">
            {/* <CashflowSummary income={totalTopUp} spent={totalSpent} /> */}
            <StatsCard
              title="Income"
              amount={totalTopUp.toFixed(2)}
              icon="solar:arrow-up-bold-duotone"
              className="border-emerald-500/50"
              description="Money added to your wallet"
            />
            <StatsCard
              title="Spent"
              amount={-totalSpent.toFixed(2)}
              icon="solar:arrow-down-bold-duotone"
              trend="up"
              className="border-rose-500/50"
              description="Total outgoing transactions"
            />
          </div>
        </section>
      )}

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
                  day={dailyGroup.day}
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
