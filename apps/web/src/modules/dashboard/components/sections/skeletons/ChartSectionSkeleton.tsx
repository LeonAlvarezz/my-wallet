import { Skeleton } from "@/components/ui/skeleton";

export function ChartSectionSkeleton() {
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
