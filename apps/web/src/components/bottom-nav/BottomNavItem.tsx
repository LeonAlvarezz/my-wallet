import { Link, useLocation } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export type BottomNavItemData = {
  icon?: string;
  title: string;
  to: string;
};

export default function BottomNavItem({ icon, title, to }: BottomNavItemData) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Button
      asChild
      type="button"
      variant="ghost"
      className={cn(
        "h-full px-6 py-3 transition-opacity",
        isActive ? "opacity-100" : "opacity-30 hover:opacity-75",
      )}
    >
      <Link to={to} preload={false}>
        <div className="flex flex-col items-center justify-center gap-1">
          {icon && <Icon icon={icon} className="size-7"></Icon>}
          <p className="hidden text-xs sm:block">{title}</p>
        </div>
      </Link>
    </Button>
  );
}
