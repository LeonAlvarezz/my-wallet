import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/modules/dashboard/page";

export const Route = createFileRoute("/_homeLayout/")({
  component: Dashboard,
});
