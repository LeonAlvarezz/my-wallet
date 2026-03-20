import { useState } from "react";
import { BaseModel } from "@my-wallet/types";
import CashflowSummary from "./components/cashflow/CashflowSummary";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { CartesianGrid, XAxis, Bar, BarChart } from "recharts";
import { useCategories } from "../category/hooks/query/use-categories";
import CategoryAmountCard from "./components/category-stats/CategoryAmountCard";
import CategoryAmountCardSkeleton from "./components/category-stats/CategoryAmountCardSkeleton";
import { TransactionCard } from "../transaction/components/transaction-card";
import { useGetTotalByCategory } from "./hooks/use-get-total-by-category";
import { Link } from "@tanstack/react-router";
import { useGetCashflowSummary } from "./hooks/use-get-cashflow-summary";
import { useGetStatistic } from "./hooks/use-get-statistic";
import TimeframeButtonGroups from "@/components/time-frame-button-groups/TimeframeButtonGroups";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Empty from "@/components/empty/Empty";
import { formatAmount } from "@/utils/currency";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetRecentTransactions } from "./hooks/use-get-recent-transactions";
import { useGetMe } from "../auth/hooks/use-get-me";

const chartConfig = {
  amount: {
    label: "Amount",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export default function Dashboard() {
  const [timeFrame, setTimeFrame] = useState<BaseModel.TimeFrameEnum>(
    BaseModel.TimeFrameEnum.MONTH,
  );

  const { data: me } = useGetMe();
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
  const { data: statisticData } = useGetStatistic({ time_frame: timeFrame });
  const chartData = statisticData ?? [];
  const { data: summary } = useGetCashflowSummary();

  const { data: categories } = useCategories();
  const {
    data: totalByCategory,
    isFetching: isCategoryFetching,
    isLoading: isCategoryLoading,
  } = useGetTotalByCategory({
    time_frame: timeFrame,
  });
  const { data: recentTransactionResult, isLoading: isRecentLoading } =
    useGetRecentTransactions();
  const recentTransactions = recentTransactionResult?.data ?? [];
  const categoryTotal =
    totalByCategory?.reduce((sum, c) => sum + c.amount, 0) ?? 0;
  const visibleCategories = isCategoryExpanded
    ? (totalByCategory ?? [])
    : (totalByCategory ?? []).slice(0, 3);

  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-y-auto p-4 pb-[calc(var(--bottom-nav-total-h))]">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-white/50">Good morning</p>
          <p className="text-primary text-xl font-bold">{me?.username} 👋</p>
        </div>
      </div>
      <CashflowSummary
        expense={summary?.expense}
        top_up={summary?.top_up}
        total={summary?.total_remaining_balance}
      />

      <section className="space-y-4">
        <div className="flex justify-between">
          <h1>Chart</h1>
          <div className="flex items-center gap-2">
            <TimeframeButtonGroups value={timeFrame} onChange={setTimeFrame} />
          </div>
        </div>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-52 w-full"
        >
          {chartData.length === 0 ? (
            <div className="flex h-full w-full">
              <Empty
                title="No chart data"
                description="No spending data for selected timeframe"
                className="w-full"
              />
            </div>
          ) : (
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  if (timeFrame === BaseModel.TimeFrameEnum.TODAY) {
                    return date.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                  }
                  return date.toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                  });
                }}
              />
              <ChartTooltip
                cursor={true}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      const date = new Date(value);
                      if (timeFrame === BaseModel.TimeFrameEnum.TODAY) {
                        return date.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        });
                      }
                      return date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    formatter={(value) => {
                      return `$${formatAmount(value.toString())}`;
                    }}
                    indicator="dot"
                  />
                }
              />
              <Bar
                dataKey="amount"
                fill="var(--color-amount)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          )}
        </ChartContainer>
      </section>

      <section className="space-y-4">
        <h1 className="font-bold">Top Category</h1>
        {isCategoryLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <CategoryAmountCardSkeleton key={index} />
            ))}
          </div>
        ) : !totalByCategory || totalByCategory.length === 0 ? (
          <Empty
            title="No category data"
            description="No spending data for selected timeframe"
          />
        ) : (
          <>
            <div
              className={`space-y-4 transition-opacity duration-300 ${
                isCategoryFetching ? "opacity-60" : "opacity-100"
              }`}
            >
              {visibleCategories.map((item) => {
                const category = categories?.find((c) => c.name === item.name);
                return (
                  <CategoryAmountCard
                    key={item.name}
                    item={item}
                    total={categoryTotal}
                    category={category}
                  />
                );
              })}
            </div>
            {totalByCategory.length > 3 && (
              <Button
                type="button"
                variant="ghost"
                className="h-fit w-full p-0"
                aria-expanded={isCategoryExpanded}
                onClick={() => setIsCategoryExpanded((prev) => !prev)}
              >
                <Icon
                  icon={
                    isCategoryExpanded
                      ? "solar:alt-arrow-up-bold"
                      : "solar:alt-arrow-down-bold"
                  }
                  className="size-6"
                />
                {isCategoryExpanded ? "Show less" : "See more"}
              </Button>
            )}
          </>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex justify-between">
          <h1 className="font-bold">Recent</h1>
          <Link to="/transaction" className="text-primary text-sm">
            See all
          </Link>
        </div>
        {isRecentLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        ) : recentTransactions.length === 0 ? (
          <Empty
            title="No recent transactions"
            description="Your latest transactions will appear here"
          />
        ) : (
          <div className="space-y-2">
            {recentTransactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
