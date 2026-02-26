import { TransactionPage } from "@/modules/transaction";
import { createFileRoute } from "@tanstack/react-router";
import { guard } from "@/middleware/guard";

export const Route = createFileRoute("/_homeLayout/transaction/")({
  beforeLoad: guard,
  component: TransactionPage,
});
