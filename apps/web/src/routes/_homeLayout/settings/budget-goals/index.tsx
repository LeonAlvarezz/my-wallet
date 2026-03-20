import BudgetGoalsSettingsPage from "@/modules/settings/pages/budget-goals";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_homeLayout/settings/budget-goals/")({
  component: BudgetGoalsSettingsPage,
});
