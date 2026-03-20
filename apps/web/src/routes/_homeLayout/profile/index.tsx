import { ProfilePage } from "@/modules/profile/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_homeLayout/profile/")({
  component: ProfilePage,
});
