import { ChangePasswordPage } from "@/modules/auth/pages/change-password.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_homeLayout/profile/change-password")({
  component: ChangePasswordPage,
});
