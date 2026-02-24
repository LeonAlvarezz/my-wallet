import { useState } from "react";
import { Icon } from "@iconify/react";

export interface CategoryData {
  id: string;
  name: string;
  icon: string;
  color: string;
  amount: number;
  percentage: number;
}

interface CategoryBreakdownProps {
  categories: CategoryData[];
  onCategoryClick?: (categoryId: string) => void;
  selectedCategory?: string | null;
}

const colorMap: Record<string, string> = {
  green: "bg-green-500",
  blue: "bg-blue-500",
  yellow: "bg-yellow-500",
  gray: "bg-gray-500",
  red: "bg-red-500",
  orange: "bg-orange-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
};

export default function CategoryBreakdown({
  categories,
  onCategoryClick,
  selectedCategory,
}: CategoryBreakdownProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Category Breakdown</h2>

      <div className="flex flex-col gap-3">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          const isHovered = hoveredCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onCategoryClick?.(category.id)}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              className={`flex flex-col gap-2 rounded-lg border p-3 transition-all ${
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              } ${isHovered ? "shadow-md" : ""}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex items-center justify-center rounded-md p-2 ${colorMap[category.color] || colorMap.gray}`}
                  >
                    <Icon icon={category.icon} className="size-5 text-white" />
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-sm font-medium">{category.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {category.percentage}% of spending
                    </p>
                  </div>
                </div>
                <p className="font-semibold">${category.amount.toFixed(2)}</p>
              </div>

              {/* Progress Bar */}
              <div className="bg-secondary h-2 w-full overflow-hidden rounded-full">
                <div
                  className={`h-full ${colorMap[category.color] || colorMap.gray}`}
                  style={{ width: `${category.percentage}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
