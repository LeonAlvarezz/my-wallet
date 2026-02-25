import AddPage from "@/modules/add/pages";
import { createFileRoute } from "@tanstack/react-router";
import { guard } from "@/middleware/guard";

export const Route = createFileRoute("/")({
  beforeLoad: guard,
  component: AddPage,
});
