import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import { useRouter } from "@tanstack/react-router";
type Props = {
  label?: string;
  backTo?: string;
  className?: string;
};
export default function BackButton({ backTo, label, className }: Props) {
  const router = useRouter();
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => {
        if (backTo) {
          router.history.push(backTo);
        } else {
          router.history.back();
        }
      }}
      className={cn("flex items-center gap-2", className)}
    >
      <Icon icon="solar:arrow-left-linear" className="size-5" />
      {label && <span className="text-sm">{label}</span>}
    </Button>
  );
}
