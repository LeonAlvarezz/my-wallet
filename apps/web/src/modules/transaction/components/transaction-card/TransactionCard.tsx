import { Button } from "@/components/ui/button";
import { formatTime } from "@/utils/date";
import { Icon } from "@iconify/react";
import { TransactionModel, type CategoryModel } from "@my-wallet/types";
import UpdateTransactionDialog from "../update-transaction-dialog/UpdateTransactionDialog";
import { useDeleteTransaction } from "../../hooks/use-delete-transaction";
import DeleteButton from "@/components/delete-button/DeleteButton";
import { AmountDisplay } from "@/components/amount/AmountDisplay";

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
  const isExpense =
    transaction.type === TransactionModel.TransactionTypeEnum.EXPENSE;
  const deleteMutation = useDeleteTransaction();
  return (
    <div className="group relative">
      <UpdateTransactionDialog transaction={transaction}>
        <Button
          variant="outline"
          className="h-fit w-full gap-3 rounded-lg border bg-blue-500 p-3 transition-all hover:shadow-md"
        >
          {/* Icon & Details */}
          <div className="flex w-full items-center gap-3">
            <div
              className={`flex items-center justify-center rounded-lg p-2 ${
                isExpense
                  ? transaction.category
                    ? colorMap[transaction.category.color]
                    : colorMap.DEFAULT
                  : colorMap.GREEN
              }`}
            >
              <Icon
                icon={
                  isExpense
                    ? transaction.category
                      ? transaction.category.icon
                      : "solar:question-circle-bold-duotone"
                    : "solar:wallet-bold-duotone"
                }
                className="size-5 text-white"
              />
            </div>
            <div className="flex flex-col items-start">
              <p className="max-w-50 overflow-hidden text-sm font-medium text-ellipsis">
                {transaction.description || "Unknown"}
              </p>
              <div className="flex items-center gap-1">
                <p className="text-muted-foreground text-xs">
                  {formatTime(transaction.created_at)}
                </p>
                <span className="text-muted-foreground text-xs">•</span>
                <p className="text-muted-foreground text-xs">
                  {isExpense
                    ? transaction.category
                      ? transaction.category.name
                      : "Unknown"
                    : "Top up"}
                </p>
              </div>
            </div>
          </div>
          <AmountDisplay
            value={isExpense ? -transaction.amount : transaction.amount}
          />
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
