import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import { CategoryModel } from "@my-wallet/types";
import IconSkeleton from "@/components/icon-skeleton/IconSkeleton";

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

const variantColorMap: Record<
  CategoryModel.CategoryColorEnum,
  { bg: string; text: string }
> = {
  YELLOW: { bg: "bg-yellow-300/10", text: "text-yellow-300" },
  GREEN: { bg: "bg-green-300/10", text: "text-green-300" },
  BLUE: { bg: "bg-blue-300/10", text: "text-blue-300" },
  GRAY: { bg: "bg-gray-300/10", text: "text-gray-300" },
  DEFAULT: { bg: "bg-neutral-300/10", text: "text-neutral-300" },
  PURPLE: { bg: "bg-purple-300/10", text: "text-purple-300" },
  PINK: { bg: "bg-pink-300/10", text: "text-pink-300" },
  RED: { bg: "bg-red-300/10", text: "text-red-300" },
  ORANGE: { bg: "bg-orange-300/10", text: "text-orange-300" },
  TEAL: { bg: "bg-teal-300/10", text: "text-teal-300" },
};

export default function CategoryBlock({
  category,
  value,
  className,
  disabled,
}: CategoryBlockProps) {
  const colors =
    variantColorMap[category.color ?? CategoryModel.CategoryColorEnum.DEFAULT];

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
