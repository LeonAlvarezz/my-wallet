import { useId, useState } from "react";
import { Icon } from "@iconify/react";
import { AmountInput } from "@/components/amount-input";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { getDisplayAmount } from "@/utils/currency";

type TopUpDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (payload: {
    amount: number;
    note: string;
  }) => void | Promise<void>;
  loading?: boolean;
};

const quickTopUpAmounts = [10, 25, 50, 100];

export function TopUpDrawer({
  open,
  onOpenChange,
  onSubmit,
  loading = false,
}: TopUpDrawerProps) {
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");
  const noteId = useId();

  const resetForm = () => {
    setAmount(0);
    setNote("");
  };

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      resetForm();
    }
  };

  const handleSubmit = async () => {
    if (amount <= 0) return;

    await onSubmit?.({
      amount,
      note,
    });
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="max-w-mobile mx-auto">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2 text-left text-lg">
            <Icon icon="solar:wallet-money-bold-duotone" className="size-5" />
            Top up balance
          </DrawerTitle>
          <DrawerDescription className="text-left">
            Add funds to your wallet balance and keep a short note if needed.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-6 px-4 pb-2">
          <div className="bg-secondary flex flex-col gap-2 rounded-xl border p-4">
            <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
              Amount
            </p>
            <AmountInput
              value={amount}
              onChange={setAmount}
              aria-label="Top up amount"
            />
            <p className="text-muted-foreground text-sm">
              {getDisplayAmount(amount || 0)} will be added to your wallet.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {quickTopUpAmounts.map((quickAmount) => (
              <Button
                key={quickAmount}
                type="button"
                variant={amount === quickAmount ? "default" : "outline"}
                onClick={() => setAmount(quickAmount)}
              >
                +{getDisplayAmount(quickAmount)}
              </Button>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor={noteId}>
              Note
            </label>
            <Textarea
              id={noteId}
              placeholder="Optional note for this top up"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>

        <DrawerFooter>
          <Button
            type="button"
            disabled={amount <= 0 || loading}
            loading={loading}
            onClick={handleSubmit}
          >
            Confirm top up
          </Button>
          <DrawerClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
