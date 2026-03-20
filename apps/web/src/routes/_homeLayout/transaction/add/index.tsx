import AddTransactionPage from "@/modules/transaction/pages/add.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_homeLayout/transaction/add/")({
  component: AddTransactionPage,
});
