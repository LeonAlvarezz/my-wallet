import { createFileRoute } from "@tanstack/react-router";
import { guard } from "@/middleware/guard";
import Dashboard from "@/modules/dashboard/page";

export const Route = createFileRoute("/_homeLayout/")({
  beforeLoad: guard,
  component: Dashboard,
});
