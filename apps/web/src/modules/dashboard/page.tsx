import { BaseModel, CategoryModel, TransactionModel } from "@my-wallet/types";
import CashflowSummary from "./components/cashflow/CashflowSummary";
import { useGetSpendingOverview } from "../transaction/hooks/use-get-spending-overview";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { CartesianGrid, XAxis, Area, AreaChart } from "recharts";
import { useCategories } from "../category/hooks/query/use-categories";
import CategoryStatsCard from "../category/components/category-stats/CategoryStatsCard";
import { randomNumber } from "@/utils/number";
import { TransactionCard } from "../transaction/components/transaction-card";
import { Link } from "@tanstack/react-router";

export default function Dashboard() {
  // const search = useSearch({ from: "/_homeLayout/" });
  const timeFrame = BaseModel.TimeFrameEnum.ALL_TIME;
  const overview = useGetSpendingOverview({ time_frame: timeFrame });
  const totalSpent = overview.data?.expense ?? 0;
  const totalTopUp = overview.data?.top_up ?? 0;
  const totalBalance = totalTopUp - totalSpent;
  const chartData = [
    { date: "2026-03-09", amount: 186 },
    { date: "2026-03-10", amount: 305 },
    { date: "2026-03-11", amount: 237 },
    { date: "2026-03-11", amount: 73 },
    { date: "2026-03-12", amount: 209 },
    { date: "2026-03-12", amount: 214 },
  ];
  const chartConfig = {
    amount: {
      label: "Amount",
      color: "var(--primary)",
    },
  } satisfies ChartConfig;
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
        expense={totalSpent}
        income={totalTopUp}
        total={totalBalance}
      />

      <section className="space-y-4 font-bold">
        <h1>Chart</h1>
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
        {!categories ? (
          <div>Empty</div>
        ) : (
          categories.slice(0, 3).map((category) => {
            const progress = randomNumber(0, 100);
            return (
              <CategoryStatsCard
                category={category}
                key={category.id}
                progress={progress}
              />
            );
          })
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
