import z from "zod";
import { BaseModel } from "./base.model";

export namespace TransactionModel {
  export const TransactionSchema = BaseModel.BaseRowSchema.extend({
    user_id: z.coerce.number(),
    amount: z.coerce.number(),
    description: z.string().optional().nullable(),
  });

  export const CreateTransactionSchema = TransactionSchema.pick({
    amount: true,
    description: true,
  });

  export const UpdateTransactionSchema = CreateTransactionSchema.partial();

  export type TransactionDto = z.infer<typeof TransactionSchema>;
  export type CreateTransactionDto = z.infer<typeof CreateTransactionSchema>;
  export type UpdateTransactionDto = z.infer<typeof UpdateTransactionSchema>;
}
