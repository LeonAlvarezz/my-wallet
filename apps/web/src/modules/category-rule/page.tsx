import { CommonHeader } from "@/components/header/CommonHeader";
import { Suspense, lazy, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { useGetCategoryRuleCount } from "./hooks/use-get-category-rule-count";
import { getCategoryVariantColors } from "../category/constants/category-color-map";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryRuleList = lazy(
  () => import("./components/category-rule/CategoryRuleList"),
);

export default function CategoryMatchPage() {
  const { data, isLoading } = useGetCategoryRuleCount();
  const [expanded, setExpanded] = useState<string>("");

  if (isLoading) {
    return <CategoryRulePageSkeleton />;
  }

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto p-4 pb-[calc(var(--bottom-nav-total-h))]">
      <CommonHeader title="Category Rules" backLabel={true} />
      <Accordion
        type="single"
        collapsible
        value={expanded}
        onValueChange={setExpanded}
        className="space-y-2"
      >
        {data?.map((item) => {
          const color = getCategoryVariantColors(item.category.color);
          const itemValue = `category-${item.category.id}`;
          const isExpanded = expanded === itemValue;

          return (
            <div
              key={item.category.id}
              className="bg-card border-input/30 rounded-xl border px-4"
            >
              <AccordionItem value={itemValue}>
                <AccordionTrigger badge={item.total}>
                  <div className="flex items-center gap-4">
                    <div className={cn("flex rounded-md p-2", color.bg)}>
                      <Icon
                        icon={item.category.icon}
                        className={cn("text-xl", color.text)}
                      />
                    </div>
                    <p>{item.category.name}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  {isExpanded ? (
                    <Suspense fallback={<CategoryRuleListSkeleton />}>
                      <CategoryRuleList id={item.category.id} />
                    </Suspense>
                  ) : null}
                </AccordionContent>
              </AccordionItem>
            </div>
          );
        })}
      </Accordion>
    </div>
  );
}

function CategoryRulePageSkeleton() {
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto p-4 pb-[calc(var(--bottom-nav-total-h))]">
      <CommonHeader title="Category Rules" backLabel={true} />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="bg-card border-input/30 flex items-center justify-between rounded-xl border px-4 py-4"
          >
            <div className="flex items-center gap-4">
              <Skeleton className="size-10 rounded-md" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="size-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryRuleListSkeleton() {
  return (
    <div className="space-y-4 rounded-lg py-2">
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 flex-1 rounded-md" />
        <Skeleton className="h-8 w-16 rounded-md" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between gap-2">
            <Skeleton className="h-4 w-32" />
            <div className="flex items-center gap-2">
              <Skeleton className="size-8 rounded-md" />
              <Skeleton className="size-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
