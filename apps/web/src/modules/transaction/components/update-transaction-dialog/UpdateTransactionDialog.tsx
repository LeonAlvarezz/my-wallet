import { AmountInput } from "@/components/amount-input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import CategoryBlock from "@/modules/category/components/category-block/CategoryBlock";
import { useCategories } from "@/modules/category/hooks/query/use-categories";
import { TransactionModel } from "@my-wallet/types";
import { Icon } from "@iconify/react";
import { useForm } from "@tanstack/react-form";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import z from "zod";
import { useDeleteTransaction } from "../../hooks/use-delete-transaction";
import { useUpdateTransaction } from "../../hooks/use-update-transaction";
import CategoryBlockSkeleton from "@/modules/add/components/skeletons/CategoryBlockSkeleton";
import DeleteButton from "@/components/delete-button/DeleteButton";

type Props = {
  children: ReactNode;
  transaction: TransactionModel.TransactionWithCategoryDto;
};

export default function UpdateTransactionDialog({
  children,
  transaction,
}: Props) {
  const [open, setOpen] = useState(false);
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
  const [submitAttempts, setSubmitAttempts] = useState(0);

  const updateMutation = useUpdateTransaction();
  const deleteMutation = useDeleteTransaction();

  const { data, isLoading: isCategoryLoading } = useCategories();
  const categories = data || [];

  const initialValues = {
    amount: transaction.amount,
    category_id: transaction.category?.id ?? 0,
    description: transaction.description ?? "",
  };

  const CATEGORY_PREVIEW_COUNT = 6;
  const visibleCategories = isCategoryExpanded
    ? categories
    : categories.slice(0, CATEGORY_PREVIEW_COUNT);

  const form = useForm({
    defaultValues: initialValues,
    validators: {
      onSubmit: TransactionModel.CreateTransactionSchema.extend({
        description: z.string(), // override to make it required
      }),
    },
    onSubmit: async ({ value }) => {
      await updateMutation.mutateAsync({
        id: transaction.id,
        payload: {
          amount: value.amount,
          category_id: value.category_id,
          description: value.description,
        },
      });
      toast.success("Transaction updated");
      setOpen(false);
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) return;

    setSubmitAttempts(0);
    setIsCategoryExpanded(false);
    form.setFieldValue("amount", initialValues.amount);
    form.setFieldValue("category_id", initialValues.category_id);
    form.setFieldValue("description", initialValues.description);
  };

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

        <form
          className="no-scrollbar -mx-4 max-h-[60vh] overflow-y-auto px-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitAttempts((n) => n + 1);
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="amount"
              children={(field) => {
                const isInvalid =
                  (field.state.meta.isTouched || submitAttempts > 0) &&
                  !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <div className="flex w-full flex-col items-center gap-4">
                      <FieldLabel htmlFor={field.name}>Enter Amount</FieldLabel>
                      <div className="flex h-fit gap-4">
                        <AmountInput
                          value={field.state.value}
                          id={field.name}
                          name={field.name}
                          onBlur={field.handleBlur}
                          onChange={field.handleChange}
                        />
                        <div className="bg-primary h-fit w-fit rounded-sm px-2 py-1">
                          <p className="text-xs">USD</p>
                        </div>
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </div>
                  </Field>
                );
              }}
            />

            <form.Field
              name="category_id"
              children={(field) => {
                const isInvalid =
                  (field.state.meta.isTouched || submitAttempts > 0) &&
                  !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <div className="flex flex-col gap-4">
                      <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                      {isCategoryLoading ? (
                        <CategoryBlockSkeleton />
                      ) : (
                        <>
                          <div className="flex h-fit gap-4">
                            <ToggleGroup
                              type="single"
                              value={field.state.value.toString()}
                              onValueChange={(value) => {
                                field.handleChange(Number(value));
                                field.handleBlur();
                              }}
                              className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3"
                            >
                              {visibleCategories.map((category) => (
                                <CategoryBlock
                                  key={category.id}
                                  category={category}
                                  value={category.id.toString()}
                                  className={cn(
                                    isInvalid && "border border-red-500",
                                  )}
                                />
                              ))}
                            </ToggleGroup>
                          </div>
                          {categories.length > CATEGORY_PREVIEW_COUNT && (
                            <Button
                              type="button"
                              variant="ghost"
                              className="w-full"
                              aria-expanded={isCategoryExpanded}
                              onClick={() =>
                                setIsCategoryExpanded((prev) => !prev)
                              }
                            >
                              <Icon
                                icon={
                                  isCategoryExpanded
                                    ? "solar:alt-arrow-up-bold"
                                    : "solar:alt-arrow-down-bold"
                                }
                                className="size-6"
                              />
                              {isCategoryExpanded ? "Show less" : "Expand more"}
                            </Button>
                          )}
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </>
                      )}
                    </div>
                  </Field>
                );
              }}
            />

            <form.Field
              name="description"
              children={(field) => {
                const isInvalid =
                  (field.state.meta.isTouched || submitAttempts > 0) &&
                  !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <div className="flex flex-col gap-4">
                      <FieldLabel htmlFor={field.name}>Note</FieldLabel>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="Tube Coffee, Aeon Shopping..."
                        className="min-h-20"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </div>
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={() => {
              setSubmitAttempts((n) => n + 1);
              form.handleSubmit();
            }}
            disabled={updateMutation.isPending}
            loading={updateMutation.isPending}
          >
            <Icon icon="solar:diskette-bold-duotone" />
            Save
          </Button>
          <DeleteButton
            title="Delete transaction?"
            description="This action cannot be undone. This will permanently delete this transaction."
            confirmText="Delete"
            onConfirm={async () => {
              await deleteMutation.mutateAsync(transaction.id);
              toast.success("Transaction deleted");
              setOpen(false);
            }}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
