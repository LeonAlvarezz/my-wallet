import { EditProfilePage } from "@/modules/profile/edit-profile.page";
import { guard } from "@/middleware/guard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_homeLayout/profile/edit")({
  beforeLoad: guard,
  component: EditProfilePage,
});
