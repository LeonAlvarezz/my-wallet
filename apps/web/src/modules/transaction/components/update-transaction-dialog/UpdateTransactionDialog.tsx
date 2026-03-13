import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TransactionModel } from "@my-wallet/types";
import { Icon } from "@iconify/react";
import { useState, type ReactNode } from "react";
import { useDeleteTransaction } from "../../hooks/use-delete-transaction";
import DeleteButton from "@/components/delete-button/DeleteButton";
import AddTransactionForm from "@/modules/add/components/forms/mutate-transaction-form/MutateTransactionForm";
import AddTransactionContext, {
  useMutateTransactionForm,
} from "@/modules/add/components/forms/mutate-transaction-form/use-mutate-transaction-context";

type Props = {
  children: ReactNode;
  transaction: TransactionModel.TransactionWithCategoryDto;
};

export default function UpdateTransactionDialog({
  children,
  transaction,
}: Props) {
  const [open, setOpen] = useState(false);
  const defaultValue = {
    amount: transaction.amount,
    category_id: transaction.category?.id ?? 0,
    description: transaction.description ?? "",
    type: transaction.type,
  };
  const handleOpenChange = () => setOpen((prev) => !prev);
  const formHook = useMutateTransactionForm({
    defaultValue,
    action: "update",
    transactionId: transaction.id,
    afterSubmit: handleOpenChange,
  });
  const { form, loading } = formHook;
  const deleteMutation = useDeleteTransaction();

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transaction</DialogTitle>
          <DialogDescription>
            View, update, or delete transaction
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 max-h-[60vh] overflow-y-auto px-4">
          <AddTransactionContext.Provider value={{ ...formHook }}>
            <AddTransactionForm className="py-4" value={defaultValue} />
          </AddTransactionContext.Provider>
        </div>
        <DialogFooter>
        <div className="grid grid-cols-2 gap-2">
            <DeleteButton
              title="Delete transaction?"
              description="This action cannot be undone. This will permanently delete this transaction."
              confirmText="Delete"
              onConfirm={async () => {
                await deleteMutation.mutateAsync(transaction.id);
                setOpen(false);
              }}
              className="text-red-500"
            />
            <Button
              type="button"
              onClick={form.handleSubmit}
              disabled={loading}
              loading={loading}
            >
              <Icon icon="solar:diskette-bold-duotone" />
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
