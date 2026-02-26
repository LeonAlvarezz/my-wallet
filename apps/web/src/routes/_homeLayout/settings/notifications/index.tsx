import NotificationsSettingsPage from "@/modules/settings/pages/notifications";
import { createFileRoute } from "@tanstack/react-router";
import { guard } from "@/middleware/guard";

export const Route = createFileRoute("/_homeLayout/settings/notifications/")({
  beforeLoad: guard,
  component: NotificationsSettingsPage,
});
