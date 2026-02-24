import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { ToggleGroupItem } from "@/components/ui/toggle-group";

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

export type CategoryBlockData = {
  icon: string;
  title: string;
  color?: ColorVariant;
};

type CategoryBlockProps = {
  category: CategoryBlockData;
  value: string;
  className?: string;
  disabled?: boolean;
};

const variantColorMap: Record<ColorVariant, { bg: string; text: string }> = {
  yellow: { bg: "bg-yellow-300/10", text: "text-yellow-300" },
  green: { bg: "bg-green-300/10", text: "text-green-300" },
  blue: { bg: "bg-blue-300/10", text: "text-blue-300" },
  gray: { bg: "bg-gray-300/10", text: "text-gray-300" },
  default: { bg: "bg-neutral-300/10", text: "text-neutral-300" },
  purple: { bg: "bg-purple-300/10", text: "text-purple-300" },
  pink: { bg: "bg-pink-300/10", text: "text-pink-300" },
  red: { bg: "bg-red-300/10", text: "text-red-300" },
  orange: { bg: "bg-orange-300/10", text: "text-orange-300" },
  teal: { bg: "bg-teal-300/10", text: "text-teal-300" },
};

export default function CategoryBlock({
  category,
  value,
  className,
  disabled,
}: CategoryBlockProps) {
  const colors = variantColorMap[category.color ?? "default"];

  return (
    <ToggleGroupItem
      value={value}
      disabled={disabled}
      aria-label={category.title}
      className={cn(
        "flex h-full w-full flex-col items-center justify-center rounded-sm! border p-4 transition-all",
        colors.bg,
        "border-transparent",
        "data-[state=on]:border-primary data-[state=on]:ring-primary data-[state=on]:scale-105 data-[state=on]:ring-2",
        className,
      )}
    >
      <Icon icon={category.icon} className={`size-8 ${colors.text}`} />
      <p className={`${colors.text}`}>{category.title}</p>
    </ToggleGroupItem>
  );
}
