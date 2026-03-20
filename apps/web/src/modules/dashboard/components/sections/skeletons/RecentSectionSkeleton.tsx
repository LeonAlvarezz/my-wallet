import { Skeleton } from "@/components/ui/skeleton";

export function RecentSectionSkeleton() {
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
