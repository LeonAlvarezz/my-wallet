import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/modules/dashboard/page";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/_homeLayout/")({
  head: () =>
    buildSeo({
      title: "Dashboard",
      description:
        "View your balance, cash flow, and category spending from the My Wallet dashboard.",
      path: "/",
    }),
  component: Dashboard,
});
