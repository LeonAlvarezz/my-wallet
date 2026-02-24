import TopNav from "@/components/top-nav/TopNav";
import { HubSection } from "../components/HubSection";

export default function SettingsHubPage() {
  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-y-auto p-4 pb-[calc(var(--bottom-nav-total-h)+1rem)]">
      <TopNav
        title="Setting"
        back={{
          backTo: "/profile",
          label: "Profile",
        }}
        // back={true}
      />
      <HubSection
        title="Preferences"
        items={[
          {
            title: "Notifications",
            description: "Expense alerts, budgets, weekly reports",
            icon: "solar:bell-bold-duotone",
            to: "/settings/notifications",
          },
          {
            title: "Budget Goals",
            description: "Monthly limits per category (CRUD)",
            icon: "solar:wallet-money-bold-duotone",
            to: "/settings/budget-goals",
          },
        ]}
      />

      <HubSection
        title="Security"
        items={[
          {
            title: "Security",
            description: "PIN, biometrics, sessions (coming soon)",
            icon: "solar:shield-check-bold-duotone",
            disabled: true,
          },
        ]}
      />

      <HubSection
        title="Support"
        items={[
          {
            title: "Support",
            description: "Help center, contact, FAQ (coming soon)",
            icon: "solar:help-bold-duotone",
            disabled: true,
          },
        ]}
      />
    </div>
  );
}
