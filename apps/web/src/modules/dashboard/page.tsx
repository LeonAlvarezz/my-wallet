import { useState } from "react";
import { BaseModel, CategoryModel, TransactionModel } from "@my-wallet/types";
import CashflowSummary from "./components/cashflow/CashflowSummary";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { CartesianGrid, XAxis, Area, AreaChart } from "recharts";
import { useCategories } from "../category/hooks/query/use-categories";
import CategoryAmountCard from "./components/category-stats/CategoryAmountCard";
import { TransactionCard } from "../transaction/components/transaction-card";
import { useGetTotalByCategory } from "./hooks/use-get-total-by-category";
import { Link } from "@tanstack/react-router";
import { useGetCashflowSummary } from "./hooks/use-get-cashflow-summary";
import { useGetStatistic } from "./hooks/use-get-statistic";
import TimeframeButtonGroups from "@/components/time-frame-button-groups/TimeframeButtonGroups";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

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
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
  const { data: statisticData } = useGetStatistic({ time_frame: timeFrame });
  const chartData = statisticData ?? [];

  // const search = useSearch({ from: "/_homeLayout/" });
  const { data: summary } = useGetCashflowSummary();

  const mockRecentTransactions: TransactionModel.TransactionWithCategoryDto[] =
    [
      {
        id: 101,
        wallet_id: 1,
        amount: 18.5,
        description: "Morning coffee",
        type: TransactionModel.TransactionTypeEnum.EXPENSE,
        created_at: "2026-03-16T09:10:00.000Z",
        category: {
          id: 1,
          created_at: "2026-03-01T00:00:00.000Z",
          name: "Coffee",
          color: CategoryModel.CategoryColorEnum.ORANGE,
          order: 1,
          icon: "solar:cup-hot-bold-duotone",
        },
      },
      {
        id: 102,
        wallet_id: 1,
        amount: 85,
        description: "Groceries",
        type: TransactionModel.TransactionTypeEnum.EXPENSE,
        created_at: "2026-03-15T18:30:00.000Z",
        category: {
          id: 2,
          created_at: "2026-03-01T00:00:00.000Z",
          name: "Groceries",
          color: CategoryModel.CategoryColorEnum.GREEN,
          order: 2,
          icon: "solar:cart-large-2-bold-duotone",
        },
      },
      {
        id: 103,
        wallet_id: 1,
        amount: 200,
        description: "Top up",
        type: TransactionModel.TransactionTypeEnum.TOP_UP,
        created_at: "2026-03-14T20:00:00.000Z",
        category: null,
      },
    ];

  const { data: categories } = useCategories();
  const { data: totalByCategory } = useGetTotalByCategory();
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
          <p className="text-primary text-xl font-bold">Leon</p>
        </div>
        <Avatar size="lg">
          <AvatarFallback>L</AvatarFallback>
        </Avatar>
      </div>
      <CashflowSummary
        expense={summary?.expense}
        top_up={summary?.top_up}
        total={summary?.total_remaining_balance}
      />

      <section className="space-y-4 font-bold">
        <div className="flex justify-between">
          <h1>Chart</h1>
          <TimeframeButtonGroups value={timeFrame} onChange={setTimeFrame} />
        </div>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-52 w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillAmount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-amount)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-amount)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="amount"
              type="natural"
              fill="url(#fillAmount)"
              stroke="var(--color-amount)"
              stackId="a"
            />

            {/* <ChartLegend content={<ChartLegendContent />} /> */}
          </AreaChart>
        </ChartContainer>
      </section>

      <section className="space-y-4">
        <h1 className="font-bold">Top Category</h1>
        {!totalByCategory || totalByCategory.length === 0 ? (
          <div>Empty</div>
        ) : (
          <>
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
            {totalByCategory.length > 3 && (
              // <button
              //   onClick={() => setCategoryExpanded((prev) => !prev)}
              //   className="text-primary w-full text-center text-sm"
              // >
              //   {categoryExpanded
              //     ? "See less"
              //     : `See all (${totalByCategory.length})`}
              // </button>
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
        <div className="space-y-2">
          {mockRecentTransactions.slice(0, 3).map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </section>
    </div>
  );
}
