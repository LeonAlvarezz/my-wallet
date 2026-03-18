import { toast } from "sonner";
import {
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialog,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import { useState, type ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Button>, "variant"> & {
  variant?: "icon" | "default";
  onConfirm?: () => void | Promise<void>;
  title?: string;
  description?: string;
  confirmText?: string;
};

export default function DeleteButton({
  variant = "default",
  onConfirm,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete this transaction.",
  confirmText = "Continue",
  loading,
  className,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const triggerClassName =
    variant === "icon"
      ? "absolute inset-y-1/2 h-2 w-2 -right-5 -translate-y-1/2 opacity-0 transition-all group-hover:opacity-100"
      : undefined;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {variant === "default" ? (
          <Button
            type="button"
            variant="ghost"
            loading={loading}
            className={className}
            {...props}
          >
            {!loading && <Icon icon="solar:trash-bin-2-line-duotone" />}
            Delete
          </Button>
        ) : (
          <Button
            type="button"
            variant="simple"
            loading={loading}
            className={className}
            {...props}
          >
            {!loading && (
              <Icon
                icon="solar:trash-bin-2-line-duotone"
                className="text-red-500"
              />
            )}
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isConfirming}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isConfirming}
            onClick={async (e) => {
              e.preventDefault();
              if (!onConfirm) {
                setOpen(false);
                return;
              }
              try {
                setIsConfirming(true);
                await onConfirm();
                toast.success("Deleted Successfully");
                setOpen(false);
              } finally {
                setIsConfirming(false);
              }
            }}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
