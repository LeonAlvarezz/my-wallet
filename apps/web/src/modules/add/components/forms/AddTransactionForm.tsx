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
import { parseSmartInput } from "@/modules/add/lib/smart-input";

const formSchema = z.object({
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  category: z.string().min(1, "Select a category"),
  // Optional from a UX perspective (can be empty), but keep it as a string
  // so it matches our form defaultValues typing.
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
  const noteTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
  const [smartText, setSmartText] = useState("");
  const [loading, setLoading] = useState(false);
  const [smartAppliedOnce, setSmartAppliedOnce] = useState(false);
  const [submitAttempts, setSubmitAttempts] = useState(0);

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
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Transaction added", {
        description: `${value.category} • ${value.note} • $${value.amount.toFixed(2)}`,
      });
      formApi.reset();
      setSmartText("");
      setSmartAppliedOnce(false);
      setSubmitAttempts(0);
      setLoading(false);
    },
  });

  const isFormComplete = () => {
    const amount = form.getFieldValue("amount");
    const category = form.getFieldValue("category");
    return amount > 0 && category.trim().length > 0;
  };

  const applySmartInput = (options?: {
    focusNote?: boolean;
    showToasts?: boolean;
  }) => {
    const showToasts = options?.showToasts ?? true;
    const focusNote = options?.focusNote ?? false;

    const result = parseSmartInput(smartText, mockCategories);
    const didParseAnything =
      result.parsed.amount || result.parsed.category || result.parsed.note;

    if (result.amount !== undefined) {
      form.setFieldValue("amount", result.amount);
    }
    if (result.category !== undefined) {
      form.setFieldValue("category", result.category);

      // If smart input selects a category that's currently hidden,
      // expand so the user can see the selected state.
      const isInPreview = mockCategories
        .slice(0, CATEGORY_PREVIEW_COUNT)
        .some((c) => c.title === result.category);
      if (!isCategoryExpanded && !isInPreview) {
        setIsCategoryExpanded(true);
      }
    }
    if (result.note !== undefined) {
      form.setFieldValue(
        "note",
        result.note.charAt(0).toUpperCase() + result.note.slice(1),
      );
    }

    if (showToasts) {
      if (!didParseAnything) {
        toast("Couldn't understand that input", {
          description: "Try: 5 Starbucks #coffee or 5 Starbucks coffee",
        });
      } else if (result.warnings.length > 0) {
        toast(result.warnings[0]);
      }
    }

    if (focusNote && (!result.note || !result.category)) {
      noteTextareaRef.current?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
      noteTextareaRef.current?.focus();
    }

    setSmartAppliedOnce(true);
  };

  const handleSmartSubmit = () => {
    // 1st tap: apply smart input into the form
    // 2nd tap: if the form is complete, submit
    setSubmitAttempts((n) => n + 1);

    if (!smartAppliedOnce) {
      applySmartInput({ focusNote: true, showToasts: false });
      return;
    }

    if (isFormComplete()) {
      form.handleSubmit();
      return;
    }

    applySmartInput({ focusNote: true, showToasts: false });
  };

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
          name="category"
          children={(field) => {
            const isInvalid =
              (field.state.meta.isTouched || submitAttempts > 0) &&
              !field.state.meta.isValid;
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
            <Input
              placeholder="5 Starbucks #coffee"
              value={smartText}
              onChange={(e) => {
                setSmartText(e.target.value);
                setSmartAppliedOnce(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                e.preventDefault();
                handleSmartSubmit();
              }}
              className="w-full"
            />
            <Button
              type="button"
              variant="barebone"
              className="absolute inset-y-1/2 right-1 z-20 h-fit w-fit -translate-y-1/2"
              onClick={handleSmartSubmit}
            >
              <Icon icon="solar:arrow-right-up-bold" className="size-5" />
            </Button>
          </div>
          <Button
            type="button"
            onClick={() => {
              setSubmitAttempts((n) => n + 1);
              form.handleSubmit();
            }}
            disabled={loading}
            loading={loading}
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}
