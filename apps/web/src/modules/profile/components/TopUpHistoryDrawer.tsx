import { Icon } from "@iconify/react";
import { AmountDisplay } from "@/components/amount/AmountDisplay";
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
import { formatTime } from "@/utils/date";
import { WalletEventModel } from "@my-wallet/types";
import { groupTopUpHistoryByDate } from "@/utils/transaction";

type TopUpHistoryDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const topUpHistoryItems: WalletEventModel.WalletEventPublic[] = [
  {
    id: 1,
    amount: 100,
    created_at: "2026-03-10T08:45:00.000Z",
    note: "Monthly budget refill",
    type: WalletEventModel.WalletEventType.INCOME,
  },
  {
    id: 2,
    amount: 50,
    created_at: "2026-03-07T12:20:00.000Z",
    type: WalletEventModel.WalletEventType.INCOME,
    note: "Weekend allowance",
  },
  {
    id: 3,
    amount: 25,
    type: WalletEventModel.WalletEventType.INCOME,
    created_at: "2026-03-03T18:10:00.000Z",
  },
  {
    id: 4,
    amount: 75,
    type: WalletEventModel.WalletEventType.INCOME,
    created_at: "2026-02-28T09:05:00.000Z",
    note: "Savings top up",
  },
  {
    id: 5,
    amount: 75,
    type: WalletEventModel.WalletEventType.INCOME,
    created_at: "2026-02-28T09:05:00.000Z",
    note: "Savings top up",
  },
  {
    id: 6,
    amount: 75,
    type: WalletEventModel.WalletEventType.INCOME,
    created_at: "2026-02-28T09:05:00.000Z",
    note: "Savings top up",
  },
  {
    id: 7,
    amount: 75,
    type: WalletEventModel.WalletEventType.INCOME,
    created_at: "2026-02-28T09:05:00.000Z",
    note: "Savings top up",
  },
  {
    id: 8,
    amount: 75,
    type: WalletEventModel.WalletEventType.INCOME,
    created_at: "2026-02-28T09:05:00.000Z",
    note: "Savings top up",
  },
];

export function TopUpHistoryDrawer({
  open,
  onOpenChange,
}: TopUpHistoryDrawerProps) {
  const groupedHistory = groupTopUpHistoryByDate(topUpHistoryItems);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-w-mobile mx-auto">
        <DrawerHeader>
          {/* <div className="flex justify-between">
            <div className="basis-[80%]"> */}
          <DrawerTitle className="flex items-center gap-2 text-left text-lg leading-1">
            <Icon icon="solar:history-bold-duotone" className="size-5" />
            Top up history
          </DrawerTitle>
          <DrawerDescription className="text-left">
            Review your recent wallet top ups and their notes.
          </DrawerDescription>
          {/* </div> */}
          {/* <Button>Top up</Button> */}
          {/* </div> */}
        </DrawerHeader>

        <div className="flex max-h-[60vh] flex-col overflow-y-auto px-4 pb-2">
          {groupedHistory.length > 0 ? (
            <div className="flex flex-col gap-6">
              {groupedHistory.map((group) => (
                <div key={group.day} className="flex flex-col gap-3">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold">{group.label}</p>
                      <p className="text-muted-foreground text-xs">
                        {group.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {group.items.map((item) => (
                      <Button
                        key={item.id}
                        type="button"
                        variant="outline"
                        className="h-fit w-full justify-start gap-3 rounded-lg p-3 text-left transition-all hover:shadow-md"
                      >
                        <div className="flex w-full items-center gap-3">
                          <div className="flex items-center justify-center rounded-lg bg-emerald-500 p-2">
                            <Icon
                              icon="solar:wallet-money-bold-duotone"
                              className="size-5 text-white"
                            />
                          </div>

                          <div className="flex min-w-0 flex-1 flex-col items-start">
                            <p className="max-w-50 overflow-hidden text-sm font-medium text-ellipsis">
                              {item.note || "Wallet top up"}
                            </p>
                            <div className="flex items-center gap-1">
                              <p className="text-muted-foreground text-xs">
                                {formatTime(item.created_at)}
                              </p>
                              <span className="text-muted-foreground text-xs">
                                •
                              </span>
                              <p className="text-muted-foreground text-xs">
                                Top up
                              </p>
                            </div>
                          </div>
                        </div>

                        <AmountDisplay value={item.amount} showSign={true} />
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card/50 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-12 text-center">
              <Icon
                icon="solar:inbox-bold"
                className="text-muted-foreground size-8"
              />
              <p className="text-muted-foreground text-sm font-medium">
                No top up history yet
              </p>
              <p className="text-sm">
                Your completed wallet top ups will show up here.
              </p>
            </div>
          )}
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
