import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { AmountInput } from "@/components/amount-input";
import { ToggleGroup } from "@/components/ui/toggle-group";
import CategoryBlock from "@/modules/category/components/category-block/CategoryBlock";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import CategoryBlockSkeleton from "../../skeletons/CategoryBlockSkeleton";
import AddTransactionFormFooter from "./MutateTransactionFormFooter";
import React from "react";
import { useMutateTransactionContext } from "./use-mutate-transaction-context";
import type { TransactionModel } from "@my-wallet/types";

type Props = {
  className?: string;
  children?: ReactNode;
  value?: TransactionModel.CreateTransactionDto;
};
function AddTransactionForm({ className, children }: Props) {
  const {
    form,
    categories,
    isCategoryLoading,
    CATEGORY_PREVIEW_COUNT,
    submitAttempts,
    noteTextareaRef,
    isCategoryExpanded,
    setIsCategoryExpanded,
  } = useMutateTransactionContext();
  const visibleCategories = isCategoryExpanded
    ? categories
    : categories?.slice(0, CATEGORY_PREVIEW_COUNT);

  const footer = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) && child.type === AddTransactionForm.Footer,
  );
  return (
    <form id="add-transaction-form" className={className}>
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
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
                            console.log("value:", value);
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
                          className=""
                          aria-expanded={isCategoryExpanded}
                          onClick={() => setIsCategoryExpanded((prev) => !prev)}
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
                    ref={noteTextareaRef}
                    id={field.name}
                    name={field.name}
                    value={field.state.value ?? ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Tube Coffee, Aeon Shopping..."
                    className="min-h-20"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </div>
              </Field>
            );
          }}
        />
      </FieldGroup>
      {footer}
    </form>
  );
}
AddTransactionForm.Footer = AddTransactionFormFooter;
export default AddTransactionForm;
