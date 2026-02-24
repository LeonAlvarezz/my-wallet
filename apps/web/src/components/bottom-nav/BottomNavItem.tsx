import { useRouter, useLocation } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export type BottomNavItemData = {
  icon?: string;
  title: string;
  to: string;
};

export default function BottomNavItem({ icon, title, to }: BottomNavItemData) {
  const router = useRouter();
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        "flex h-full w-18 flex-col gap-1 px-6 py-3 transition-opacity sm:w-20",
        isActive ? "opacity-100" : "opacity-30 hover:opacity-75",
      )}
      onClick={() => router.history.push(to)}
    >
      {icon && <Icon icon={icon} className="size-8"></Icon>}
      <p className="text-xs">{title}</p>
    </Button>
  );
}
