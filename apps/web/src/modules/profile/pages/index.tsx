import { Icon } from "@iconify/react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useSignOut } from "@/modules/auth/hooks/use-sign-out";
import { useGetMe } from "@/modules/auth/hooks/use-get-me";
import { HubSection } from "@/modules/settings/components/HubSection";
import { useTheme } from "@/modules/theme/use-theme";

export function ProfilePage() {
  const signOutMutation = useSignOut();
  const { data } = useGetMe();
  const { theme, setTheme } = useTheme();

  const user = {
    name: "Leon",
    email: "leon@example.com",
  };
  const navigate = useNavigate();

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
      </section>

      <HubSection
        title="Preferences"
        items={[
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

          {
            title: "Category Matching",
            description: "Manage how category will be match",
            icon: "solar:tag-bold-duotone",
            onClick: () => {
              navigate({
                to: "/settings/category-rule",
              });
            },
          },
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
