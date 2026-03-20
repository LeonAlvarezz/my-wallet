import SettingsHubPage from "@/modules/settings/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_homeLayout/settings/")({
  component: SettingsHubPage,
});
