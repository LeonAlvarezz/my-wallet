import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import z from "zod";
import { toast } from "sonner";
import { AmountInput } from "@/components/amount-input";
import { ToggleGroup } from "@/components/ui/toggle-group";
import CategoryBlock, {
  type CategoryBlockData,
} from "@/modules/category/components/category-block/CategoryBlock";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  category: z.string().min(1, "Select a category"),
  note: z.string(),
});

const mockCategories: CategoryBlockData[] = [
  {
    title: "Food",
    icon: "solar:donut-bold-duotone",
    color: "green",
  },

  {
    title: "Coffee",
    icon: "solar:cup-paper-bold-duotone",
    color: "yellow",
  },
  {
    title: "Transportation",
    icon: "solar:scooter-bold-duotone",
    color: "gray",
  },
  {
    title: "Health",
    icon: "solar:health-bold-duotone",
    color: "red",
  },
  {
    title: "Utility",
    icon: "solar:lightbulb-bolt-bold-duotone",
    color: "orange",
  },

  {
    title: "Other",
    icon: "solar:menu-dots-bold-duotone",
    color: "default",
  },

  {
    title: "Travel",
    icon: "solar:bicycling-bold-duotone",
    color: "blue",
  },

  {
    title: "Entertainment",
    icon: "solar:play-bold-duotone",
    color: "purple",
  },
  {
    title: "Shopping",
    icon: "solar:bag-bold-duotone",
    color: "pink",
  },
];

export default function AddTransactionForm() {
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);

  const CATEGORY_PREVIEW_COUNT = 6;
  const visibleCategories = isCategoryExpanded
    ? mockCategories
    : mockCategories.slice(0, CATEGORY_PREVIEW_COUNT);

  const form = useForm({
    defaultValues: {
      amount: 0,
      category: "",
      note: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      toast.success("Transaction added", {
        description: `${value.category} • ${value.note} • $${value.amount.toFixed(2)}`,
      });
      formApi.reset();
    },
  });

  return (
    <form
      id="add-transaction-form"
      className="pb-[calc(var(--bottom-nav-total-h)+5rem)]"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field
          name="amount"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
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
          name="category"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <div className="flex flex-col gap-4">
                  <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                  <div className="flex h-fit gap-4">
                    <ToggleGroup
                      type="single"
                      value={field.state.value}
                      onValueChange={(value) => {
                        field.handleChange(value);
                        field.handleBlur();
                      }}
                      className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3"
                    >
                      {visibleCategories.map((category) => (
                        <CategoryBlock
                          key={category.title}
                          category={category}
                          value={category.title}
                          className={cn(isInvalid && "border border-red-500")}
                        />
                      ))}
                    </ToggleGroup>
                  </div>
                  {mockCategories.length > CATEGORY_PREVIEW_COUNT && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full"
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
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </div>
              </Field>
            );
          }}
        />

        <form.Field
          name="note"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
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
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </div>
              </Field>
            );
          }}
        />
      </FieldGroup>

      <div className="max-w-mobile fixed inset-x-0 bottom-0 m-auto px-4">
        <div className="mb-[calc(var(--bottom-nav-total-h)+10px)] flex gap-2">
          <div className="relative w-full" id="smart-input">
            <Input placeholder="12 Starbucks" className="w-full" />
            <Button
              type="button"
              variant="barebone"
              className="absolute inset-y-1/2 right-1 z-20 h-fit w-fit -translate-y-1/2"
            >
              <Icon icon="solar:arrow-right-up-bold" className="size-5" />
            </Button>
          </div>
          <Button
            type="button"
            onClick={() => form.handleSubmit()}
            disabled={form.state.isSubmitting}
          >
            Add
          </Button>
        </div>
      </div>
    </form>
  );
}
