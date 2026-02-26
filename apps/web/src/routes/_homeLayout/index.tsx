import AddPage from "@/modules/add/pages";
import { createFileRoute } from "@tanstack/react-router";
import { guard } from "@/middleware/guard";

export const Route = createFileRoute("/_homeLayout/")({
  beforeLoad: guard,
  component: AddPage,
});
