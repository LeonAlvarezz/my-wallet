import { formatTime } from "@/utils/date";
import { Icon } from "@iconify/react";
import type { CategoryModel, TransactionModel } from "@my-wallet/types";

type TransactionCardProps = TransactionModel.TransactionWithCategoryDto & {};

const colorMap: Record<CategoryModel.CategoryColorEnum, string> = {
  GREEN: "bg-green-500",
  BLUE: "bg-blue-500",
  YELLOW: "bg-yellow-500",
  DEFAULT: "bg-gray-500",
  RED: "bg-red-500",
  ORANGE: "bg-orange-500",
  PURPLE: "bg-purple-500",
  PINK: "bg-pink-500",
  GRAY: "bg-gray-500",
  TEAL: "bg-teal-500",
};

export default function TransactionCard({
  created_at,
  description,
  category,
  amount,
}: TransactionCardProps) {
  return (
    <div className="border-border bg-card flex items-center justify-between gap-3 rounded-lg border p-3 transition-all hover:shadow-md">
      {/* Icon & Details */}
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center justify-center rounded-lg p-2 ${category ? colorMap[category.color] : colorMap.DEFAULT}`}
        >
          <Icon
            icon={
              category ? category.icon : "solar:question-circle-bold-duotone"
            }
            className="size-5 text-white"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-medium">{description || "Unknown"}</p>
          <div className="flex items-center gap-1">
            <p className="text-muted-foreground text-xs">
              {formatTime(created_at)}
            </p>
            <span className="text-muted-foreground text-xs">•</span>
            <p className="text-muted-foreground text-xs">
              {category ? category.name : "Unknown"}
            </p>
          </div>
        </div>
      </div>

      {/* Amount */}
      <p className="font-semibold text-red-500">-${amount.toFixed(2)}</p>
    </div>
  );
}
