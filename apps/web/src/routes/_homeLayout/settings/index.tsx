import SettingsHubPage from "@/modules/settings/pages";
import { createFileRoute } from "@tanstack/react-router";
import { guard } from "@/middleware/guard";

export const Route = createFileRoute("/_homeLayout/settings/")({
  beforeLoad: guard,
  component: SettingsHubPage,
});
