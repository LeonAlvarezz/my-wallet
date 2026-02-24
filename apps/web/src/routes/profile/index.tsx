import { ProfilePage } from "@/modules/profile/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/")({
  component: ProfilePage,
});
