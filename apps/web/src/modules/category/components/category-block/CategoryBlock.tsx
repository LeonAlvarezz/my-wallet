import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

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
  icon,
  title,
  color = "default",
}: CategoryBlockData) {
  const colors = variantColorMap[color];

  return (
    <Button
      variant="barebone"
      className={`flex h-full w-full flex-col items-center justify-center rounded-sm ${colors.bg} p-4`}
    >
      <Icon icon={icon} className={`size-8 ${colors.text}`} />
      <p className={`font-bold ${colors.text}`}>{title}</p>
    </Button>
  );
}
