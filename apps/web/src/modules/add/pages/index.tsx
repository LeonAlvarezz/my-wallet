import * as React from "react";
import { Button } from "@/components/ui/button";
import { AmountInput } from "@/components/amount-input";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import CategoryBlock, {
  type CategoryBlockData,
} from "@/modules/category/components/category-block/CategoryBlock";
import { ToggleGroup } from "@/components/ui/toggle-group";

const mockCategories: CategoryBlockData[] = [
  {
    title: "Food",
    icon: "solar:donut-bold-duotone",
    color: "green",
  },
  {
    title: "Travel",
    icon: "solar:bicycling-bold-duotone",
    color: "blue",
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
    title: "Entertainment",
    icon: "solar:play-bold-duotone",
    color: "purple",
  },
  {
    title: "Shopping",
    icon: "solar:bag-bold-duotone",
    color: "pink",
  },
  {
    title: "Other",
    icon: "solar:menu-dots-bold-duotone",
    color: "default",
  },
];

export default function AddPage() {
  const [selectedCategoryTitle, setSelectedCategoryTitle] = React.useState<
    string | null
  >(null);

  return (
    <div className="flex h-full w-full flex-col gap-8 overflow-y-auto p-4 pb-[calc(var(--bottom-nav-h))]">
      <section className="flex flex-col items-center gap-4">
        <h1>Enter amount</h1>
        <div className="flex h-fit gap-4">
          <AmountInput defaultValue={0} />
          <div className="bg-primary h-fit w-fit rounded-sm px-2 py-1">
            <p className="text-xs">USD</p>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h1>Category</h1>
        <ToggleGroup
          type="single"
          value={selectedCategoryTitle ?? ""}
          onValueChange={(value) =>
            setSelectedCategoryTitle(value ? value : null)
          }
          className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3"
        >
          {mockCategories.map((category) => (
            <CategoryBlock
              key={category.title}
              category={category}
              value={category.title}
            />
          ))}
        </ToggleGroup>
      </section>
      <section className="flex flex-col gap-4">
        <h1>Note</h1>
        <Textarea
          placeholder="Tube Coffee, Aeon Shopping..."
          className="min-h-20"
        />
      </section>

      <Button>Add</Button>

      <div className="max-w-mobile fixed inset-x-0 bottom-0 m-auto px-4">
        <div className="relative mb-[calc(var(--bottom-nav-total-h)+4px)]">
          <Input placeholder="12 Starbuck" />
          <Button
            variant="barebone"
            className="absolute inset-y-1/2 right-1 z-20 h-fit w-fit -translate-y-1/2"
          >
            <Icon icon="solar:arrow-right-up-bold" className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
