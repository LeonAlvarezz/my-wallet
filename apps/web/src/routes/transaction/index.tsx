import { TransactionPage } from "@/modules/transaction";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/transaction/")({
  component: TransactionPage,
});
