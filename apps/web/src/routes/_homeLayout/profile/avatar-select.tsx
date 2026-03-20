import AvatarSelectPage from "@/modules/profile/avatar-select.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_homeLayout/profile/avatar-select")({
  component: AvatarSelectPage,
});
