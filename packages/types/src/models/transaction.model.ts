import z from "zod";
import { BaseModel } from "./base.model";
import { CategoryModel } from "./category.model";
import { CursorModel } from "./cursor.model";

export namespace TransactionModel {
  export const TransactionSchema = BaseModel.BaseRowSchema.extend({
    user_id: z.coerce.number(),
    amount: z.number(),
    description: z.string().optional().nullable(),
    category_id: z.number(),
  });
  export const TransactionBaseQuerySchema = z.object({
    query: z.string().optional(),
    time_frame: z.enum(BaseModel.TimeFrameEnum).optional(),
  });
  export const TransactionFilterSchema = CursorModel.CursorQuerySchema.extend(
    TransactionBaseQuerySchema.shape,
  );
  export const TransactionWithCategorySchema = TransactionSchema.omit({
    category_id: true,
  }).extend({
    category: z.lazy(() => CategoryModel.CategorySchema).nullable(),
  });
  export const CreateTransactionSchema = TransactionSchema.pick({
    amount: true,
    description: true,
    category_id: true,
  });
  export const UpdateTransactionSchema = CreateTransactionSchema.partial();
  export const ExtraDailyTotalSchema = z.object({
    day: z.string(),
    total: z.number(),
  });
  export const UserOverviewSchema = z.object({
    total: z.number(),
    average: z.number(),
    highest: z.number(),
  });

  export type TransactionDto = z.infer<typeof TransactionSchema>;
  export type TransactionWithCategoryDto = z.infer<
    typeof TransactionWithCategorySchema
  >;
  export type TransactionFilterDto = z.infer<typeof TransactionFilterSchema>;
  export type CreateTransactionDto = z.infer<typeof CreateTransactionSchema>;
  export type UpdateTransactionDto = z.infer<typeof UpdateTransactionSchema>;
  export type ExtraDailyTotalDto = z.infer<typeof ExtraDailyTotalSchema>;
  export type UserOverviewDto = z.infer<typeof UserOverviewSchema>;
  export type TransactionBaseQuery = z.infer<typeof TransactionBaseQuerySchema>;
}
