import { Skeleton } from "@/components/ui/skeleton";

export function CategorySectionSkeleton() {
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
