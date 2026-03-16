import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import { CategoryModel } from "@my-wallet/types";
import IconSkeleton from "@/components/icon-skeleton/IconSkeleton";
import { getCategoryVariantColors } from "@/modules/category/constants/category-color-map";

export type ColorVariant =
  | "default"
  | "yellow"
  | "green"
  | "blue"
  | "gray"
  | "purple"
  | "pink"
  | "red"
  | "orange"
  | "teal";

type CategoryBlockProps = {
  category: CategoryModel.CategoryDto;
  value: string;
  className?: string;
  disabled?: boolean;
};

export default function CategoryBlock({
  category,
  value,
  className,
  disabled,
}: CategoryBlockProps) {
  const colors = getCategoryVariantColors(category.color);

  return (
    <ToggleGroupItem
      value={value}
      disabled={disabled}
      aria-label={category.name}
      className={cn(
        "flex h-full w-full flex-col items-center justify-center rounded-sm! border p-4 transition-all",
        colors.bg,
        "border-transparent",
        "data-[state=on]:border-primary data-[state=on]:ring-primary data-[state=on]:scale-105 data-[state=on]:ring-1",
        className,
      )}
    >
      <Icon
        icon={category.icon}
        className={`size-8 ${colors.text}`}
        fallback={<IconSkeleton />}
      />
      <p className={`${colors.text}`}>{category.name}</p>
      {/* <IconSkeleton /> */}
    </ToggleGroupItem>
  );
}
