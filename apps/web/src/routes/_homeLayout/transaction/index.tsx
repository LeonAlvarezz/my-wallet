import { TransactionPage } from "@/modules/transaction";
import { createFileRoute } from "@tanstack/react-router";
import { TransactionModel } from "@my-wallet/types";

// const TransactionSearchSchema = z.object({
//   query: z.preprocess((value) => {
//     if (typeof value !== "string") return value;
//     const trimmed = value.trim();
//     return trimmed.length ? trimmed : undefined;
//   }, z.string().optional()),
//   time_frame: z.preprocess((value) => {
//     if (typeof value !== "string") return value;
//     const trimmed = value.trim();
//     return trimmed.length ? trimmed : undefined;
//   }, z.enum(BaseModel.TimeFrameEnum).optional()),
// });

export const Route = createFileRoute("/_homeLayout/transaction/")({
  validateSearch: (search) =>
    TransactionModel.TransactionBaseQuerySchema.parse(search),
  component: TransactionPage,
});
