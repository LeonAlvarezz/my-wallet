import BudgetGoalsSettingsPage from "@/modules/settings/pages/budget-goals";
import { createFileRoute } from "@tanstack/react-router";
import { guard } from "@/middleware/guard";

export const Route = createFileRoute("/settings/budget-goals/")({
  beforeLoad: guard,
  component: BudgetGoalsSettingsPage,
});
