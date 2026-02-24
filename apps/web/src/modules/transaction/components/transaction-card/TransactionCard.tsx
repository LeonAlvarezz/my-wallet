import { Icon } from "@iconify/react";

export interface TransactionCardData {
  id: string;
  icon: string;
  time: string;
  name: string;
  category: string;
  amount: number;
  categoryColor: string;
}

type TransactionCardProps = TransactionCardData & {};

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

export default function TransactionCard({
  icon,
  time,
  name,
  category,
  amount,
  categoryColor,
}: TransactionCardProps) {
  return (
    <div className="border-border bg-card flex items-center justify-between gap-3 rounded-lg border p-3 transition-all hover:shadow-md">
      {/* Icon & Details */}
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center justify-center rounded-lg p-2 ${colorMap[categoryColor] || colorMap.gray}`}
        >
          <Icon icon={icon} className="size-5 text-white" />
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-medium">{name}</p>
          <div className="flex items-center gap-1">
            <p className="text-muted-foreground text-xs">{time}</p>
            <span className="text-muted-foreground text-xs">•</span>
            <p className="text-muted-foreground text-xs">{category}</p>
          </div>
        </div>
      </div>

      {/* Amount */}
      <p className="font-semibold text-red-500">-${amount.toFixed(2)}</p>
    </div>
  );
}
