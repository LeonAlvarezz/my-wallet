import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryBlockSkeleton() {
  return (
    <div className="grid w-full grid-cols-3 gap-2 sm:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-16 w-full sm:h-24" />
      ))}
    </div>
  );
}
