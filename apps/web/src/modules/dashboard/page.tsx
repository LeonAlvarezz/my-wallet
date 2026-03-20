import { Suspense, lazy, useState } from "react";
import { BaseModel } from "@my-wallet/types";
import CashflowSummary from "./components/cashflow/CashflowSummary";
import { useGetCashflowSummary } from "./hooks/use-get-cashflow-summary";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMe } from "../auth/hooks/use-get-me";
const DashboardChartSection = lazy(
  () => import("./components/sections/DashboardChartSection"),
);
const DashboardCategorySection = lazy(
  () => import("./components/sections/DashboardCategorySection"),
);
const DashboardRecentSection = lazy(
  () => import("./components/sections/DashboardRecentSection"),
);

export default function Dashboard() {
  const [timeFrame, setTimeFrame] = useState<BaseModel.TimeFrameEnum>(
    BaseModel.TimeFrameEnum.MONTH,
  );

  const { data: me } = useGetMe();
  const { data: summary } = useGetCashflowSummary();

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
      <Suspense fallback={<ChartSectionSkeleton />}>
        <DashboardChartSection
          timeFrame={timeFrame}
          onTimeFrameChange={setTimeFrame}
        />
      </Suspense>
      <Suspense fallback={<CategorySectionSkeleton />}>
        <DashboardCategorySection timeFrame={timeFrame} />
      </Suspense>
      <Suspense fallback={<RecentSectionSkeleton />}>
        <DashboardRecentSection />
      </Suspense>
    </div>
  );
}

function ChartSectionSkeleton() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-10 w-40 rounded-full" />
      </div>
      <Skeleton className="h-52 w-full rounded-2xl" />
    </section>
  );
}

function CategorySectionSkeleton() {
  return (
    <section className="space-y-4">
      <Skeleton className="h-6 w-28" />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-12 w-full rounded-xl" />
        ))}
      </div>
    </section>
  );
}

function RecentSectionSkeleton() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-5 w-14" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    </section>
  );
}
