import { ProfilePage } from "@/modules/profile/pages";
import { createFileRoute } from "@tanstack/react-router";
import { guard } from "@/middleware/guard";

export const Route = createFileRoute("/_homeLayout/profile/")({
  beforeLoad: guard,
  component: ProfilePage,
});
