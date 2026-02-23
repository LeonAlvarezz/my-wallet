import { Button } from "../ui/button";
import { Icon } from "@iconify/react";

export type BottomNavItemData = {
  icon?: string;
  title: string;
  to: string;
};

export default function BottomNavItem({ icon, title, to }: BottomNavItemData) {
  return (
    <Button
      type="button"
      variant="ghost"
      className="flex h-fit w-20 flex-col gap-1 px-6 py-3 opacity-50"
    >
      {icon && <Icon icon={icon} className="size-8"></Icon>}
      <p className="text-xs">{title}</p>
    </Button>
  );
}
