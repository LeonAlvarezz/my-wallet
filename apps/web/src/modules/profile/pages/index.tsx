import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useSignOut } from "@/modules/auth/hooks/use-sign-out";
import { useGetMe } from "@/modules/auth/hooks/use-get-me";
import { TopUpDrawer } from "@/modules/profile/components/TopUpDrawer";
import { TopUpHistoryDrawer } from "@/modules/profile/components/TopUpHistoryDrawer";
import { getDisplayAmount } from "@/utils/currency";
import { HubSection } from "@/modules/settings/components/HubSection";
import { useTheme } from "@/modules/theme/use-theme";

export function ProfilePage() {
  const signOutMutation = useSignOut();
  const { data } = useGetMe();
  const { theme, setTheme } = useTheme();
  const [isTopUpHistoryOpen, setIsTopUpHistoryOpen] = useState(false);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);

  const user = {
    name: "Leon",
    email: "leon@example.com",
  };
  const navigate = useNavigate();

  // const account = {
  //   remaining: accountBalanceQuery.data?.remaining ?? 0,
  //   balance: accountBalanceQuery.data?.balance ?? 0,
  //   expenses: accountBalanceQuery.data?.expenses ?? 0,
  // };

  const daysInView = 30;
  // React 19 automatically memoizes this computation
  const monthSeries = (() => {
    const base = [
      12, 8, 18, 0, 22, 14, 9, 30, 16, 4, 0, 26, 10, 12, 18, 6, 9, 20, 15, 0, 8,
      11, 24, 19, 7, 13, 28, 5, 9, 17,
    ];
    return base.slice(0, daysInView);
  })();

  // This will also be memoized automatically
  const monthTotal = monthSeries.reduce((sum, v) => sum + v, 0);

  // And this complex calculation too
  const { points, yMin, yMax } = (() => {
    const values = monthSeries;
    const min = Math.min(...values);
    const max = Math.max(...values, 1);
    const range = Math.max(1, max - min);

    const padX = 4;
    const padY = 10;
    const w = 100 - padX * 2;
    const h = 100 - padY * 2;

    const pts = values
      .map((v, i) => {
        const x = padX + (i / Math.max(1, values.length - 1)) * w;
        const y = padY + (1 - (v - min) / range) * h;
        return `${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");

    return { points: pts, yMin: min, yMax: max };
  })();

  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-y-auto p-4 pb-[calc(var(--bottom-nav-total-h)+1rem)]">
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <div className="bg-secondary flex size-16 items-center justify-center rounded-full border">
            <span className="text-lg font-semibold">{data?.username}</span>
          </div>

          <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between gap-2">
              <p className="text-base font-semibold">{user.name}</p>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Edit profile"
              >
                <Icon icon="solar:pen-new-square-linear" className="size-5" />
              </Button>
            </div>
            <p className="text-muted-foreground text-xs">{user.email}</p>
          </div>
        </div>

        {/* <div className="bg-secondary flex flex-col gap-2 rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-xs font-semibold uppercase">
              Account Balance
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                aria-label="Open top up history"
                onClick={() => setIsTopUpHistoryOpen(true)}
              >
                <Icon icon="solar:history-bold-duotone" />
              </Button>
              <Button type="button" onClick={() => setIsTopUpOpen(true)}>
                <Icon icon="solar:wallet-bold-duotone" />
                Top Up
              </Button>
            </div>
          </div>
          <AmountDisplay
            value={account.remaining}
            className="text-3xl font-bold"
          />

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-secondary/10 flex flex-col gap-1 rounded-lg border p-3">
              <p className="text-muted-foreground text-xs">Balance</p>

              <AmountDisplay
                value={account.balance}
                className="font-semibold"
              />
            </div>

            <div className="bg-secondary/10 flex flex-col gap-1 rounded-lg border p-3">
              <p className="text-muted-foreground text-xs">Expenses</p>
              <AmountDisplay
                value={account.expenses}
                className="font-semibold"
              />
            </div>
          </div>
        </div> */}
      </section>
      {/* 
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold">This month</h2>
            <p className="text-muted-foreground text-xs">
              {getDisplayAmount(monthTotal)} total • {daysInView} days
            </p>
          </div>
        </div>

        <div className="bg-secondary rounded-lg border p-3">
          <div className="flex flex-col gap-3">
            <svg
              viewBox="0 0 100 100"
              className="text-primary h-28 w-full"
              role="img"
              aria-label="Monthly spending trend"
              preserveAspectRatio="none"
            >
              <polyline
                points={points}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>

            <div className="text-muted-foreground flex items-center justify-between text-xs">
              <span>Day 1</span>
              <span>Day 15</span>
              <span>Day {daysInView}</span>
            </div>

            <div className="text-muted-foreground flex items-center justify-between text-xs">
              <span>Min ${yMin.toFixed(0)}</span>
              <span>Max ${yMax.toFixed(0)}</span>
            </div>
          </div>
        </div>
      </section> */}

      <HubSection
        title="Preferences"
        items={[
          // {
          //   title: "Notifications",
          //   description: "Expense alerts, budgets, weekly reports",
          //   icon: "solar:bell-bold-duotone",
          //   to: "/settings/notifications",
          // },
          {
            title: "Dark Mode",
            description: "Dark Mode",
            icon: "solar:lightbulb-bolt-bold-duotone",
            switch: {
              checked: theme === "dark",
              onCheckedChange: (checked) => {
                setTheme(checked ? "dark" : "light");
              },
            },
          },
          // {
          //   title: "Currency",
          //   description: "USD - US Dollar",
          //   icon: "solar:wallet-bold-duotone",
          //   onClick: () => {
          //     navigate({
          //       to: "/settings/notifications",
          //     });
          //   },
          // },
          {
            title: "Category Matching",
            description: "Manage how category will be match",
            icon: "solar:tag-bold-duotone",
            onClick: () => {
              navigate({
                to: "/settings/budget-goals",
              });
            },
          },
          // {
          //   title: "Budget Goals",
          //   description: "Monthly limits per category (CRUD)",
          //   icon: "solar:wallet-money-bold-duotone",
          //   to: "/settings/budget-goals",
          // },
        ]}
      />

      <HubSection
        title="Security"
        items={[
          {
            title: "Change password",
            description: "Change account password",
            icon: "solar:lock-keyhole-minimalistic-unlocked-bold-duotone",
            disabled: true,
          },
        ]}
      />

      <Button
        type="button"
        variant="destructive"
        className="w-full"
        loading={signOutMutation.isPending}
        disabled={signOutMutation.isPending}
        onClick={async () => {
          await signOutMutation.mutateAsync();
        }}
      >
        <Icon icon="solar:logout-2-bold" className="size-5" />
        Sign out
      </Button>
    </div>
  );
}
