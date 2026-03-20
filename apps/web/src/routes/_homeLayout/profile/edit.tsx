import { EditProfilePage } from "@/modules/profile/edit-profile.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_homeLayout/profile/edit")({
  component: EditProfilePage,
});
