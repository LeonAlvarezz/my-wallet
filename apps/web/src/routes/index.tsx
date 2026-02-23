import AddPage from "@/modules/add/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: AddPage,
});
