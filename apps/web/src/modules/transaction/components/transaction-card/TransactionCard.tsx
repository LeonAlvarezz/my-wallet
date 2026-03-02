import { Button } from "@/components/ui/button";
import { formatTime } from "@/utils/date";
import { Icon } from "@iconify/react";
import type { CategoryModel, TransactionModel } from "@my-wallet/types";
import UpdateTransactionDialog from "../update-transaction-dialog/UpdateTransactionDialog";
import { useDeleteTransaction } from "../../hooks/use-delete-transaction";
import DeleteButton from "@/components/delete-button/DeleteButton";

type TransactionCardProps = {
  transaction: TransactionModel.TransactionWithCategoryDto;
};
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

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const deleteMutation = useDeleteTransaction();
  return (
    <div className="group relative w-full">
      <UpdateTransactionDialog transaction={transaction}>
        <Button
          variant="outline"
          className="flex h-fit w-full items-center justify-between gap-3 rounded-lg border bg-blue-500 p-4 transition-all hover:scale-101 hover:shadow-md"
        >
          {/* Icon & Details */}
          <div className="flex w-full items-center gap-3">
            <div
              className={`flex items-center justify-center rounded-lg p-2 ${transaction.category ? colorMap[transaction.category.color] : colorMap.DEFAULT}`}
            >
              <Icon
                icon={
                  transaction.category
                    ? transaction.category.icon
                    : "solar:question-circle-bold-duotone"
                }
                className="size-5 text-white"
              />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-sm font-medium">
                {transaction.description || "Unknown"}
              </p>
              <div className="flex items-center gap-1">
                <p className="text-muted-foreground text-xs">
                  {formatTime(transaction.created_at)}
                </p>
                <span className="text-muted-foreground text-xs">•</span>
                <p className="text-muted-foreground text-xs">
                  {transaction.category ? transaction.category.name : "Unknown"}
                </p>
              </div>
            </div>
          </div>
          {/* Amount */}
          <p className="font-semibold text-red-500">
            -${transaction.amount.toFixed(2)}
          </p>
        </Button>
      </UpdateTransactionDialog>
      <DeleteButton
        variant="icon"
        onConfirm={async () => {
          await deleteMutation.mutateAsync(transaction.id);
        }}
      />
    </div>
  );
}
