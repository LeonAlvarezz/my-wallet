import AvatarSelectPage from "@/modules/profile/avatar-select.page";
import { guard } from "@/middleware/guard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_homeLayout/profile/avatar-select")({
  beforeLoad: guard,
  component: AvatarSelectPage,
});
