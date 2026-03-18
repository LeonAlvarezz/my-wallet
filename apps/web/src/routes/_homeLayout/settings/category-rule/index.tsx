import CategoryMatchPage from "@/modules/category-rule/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_homeLayout/settings/category-rule/")({
  component: CategoryMatchPage,
});
