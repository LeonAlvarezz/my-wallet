import { BaseModel } from "@/core/model/base.model";
import z from "zod";

export namespace TransactionModel {
  export const TransactionSchema = BaseModel.BaseRowSchema.extend({
    user_id: z.coerce.number(),
    amount: z.coerce.number(),
    description: z.string().optional(),
  });

  export type TransactionDto = z.infer<typeof TransactionSchema>;
}
