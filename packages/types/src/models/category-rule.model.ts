import z from "zod";
import { BaseModel } from "./base.model";
import { CategoryModel } from "./category.model";

export namespace CategoryRuleModel {
  export enum TypeEnum {
    SYSTEM = "SYSTEM",
    USER = "USER",
  }

  export const CategoryRuleSchema = BaseModel.BaseRowSchema.extend({
    user_id: z.number().nullable(),
    category_id: z.number(),
    type: z.enum(TypeEnum),
    keyword: z.string().min(1, { error: "Keyword cannot be empty" }),
  });

  export const CreateCategoryRuleSchema = CategoryRuleSchema.pick({
    category_id: true,
    keyword: true,
  });

  export const CategoryRuleCountSchema = z.object({
    category: z.lazy(() => CategoryModel.CategorySchema),
    total: z.number(),
  });

  export const UpdateCategoryRuleSchema = CreateCategoryRuleSchema.partial();

  export type CategoryRuleDto = z.infer<typeof CategoryRuleSchema>;
  export type CategoryRuleCountDto = z.infer<typeof CategoryRuleCountSchema>;
  export type CreateCategoryRuleDto = z.infer<typeof CreateCategoryRuleSchema>;
  export type UpdateCategoryRuleDto = z.infer<typeof UpdateCategoryRuleSchema>;
}
