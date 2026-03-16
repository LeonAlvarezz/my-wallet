import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryAmountCardSkeleton() {
  return (
    <div className="flex w-full items-center gap-4">
      <Skeleton className="h-10 w-10 shrink-0 rounded-md" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex justify-between gap-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
      </div>
      <Skeleton className="h-4 w-8" />
    </div>
  );
}