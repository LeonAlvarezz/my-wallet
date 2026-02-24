import NotificationsSettingsPage from "@/modules/settings/pages/notifications";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/notifications/")({
  component: NotificationsSettingsPage,
});
