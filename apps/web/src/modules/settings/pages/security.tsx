import { Icon } from "@iconify/react";

import { SettingsHeader } from "../components/SettingsHeader";

export default function SecuritySettingsPage() {
  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-y-auto p-4 pb-[calc(var(--bottom-nav-total-h)+1rem)]">
      <SettingsHeader title="Security" backLabel="Profile" />

      <div className="bg-card/50 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-12">
        <Icon
          icon="solar:shield-check-bold-duotone"
          className="text-muted-foreground size-8"
        />
        <p className="text-muted-foreground text-sm">Coming soon</p>
      </div>
    </div>
  );
}
