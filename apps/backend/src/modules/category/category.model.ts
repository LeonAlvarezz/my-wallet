import { BaseModel } from "@/core/model/base.model";
import z from "zod";

export namespace CategoryModel {
  export enum CategoryColorEnum {
    DEFAULT = "DEFAULT",
    YELLOW = "YELLOW",
    GREEN = "GREEN",
    BLUE = "BLUE",
    GRAY = "GRAY",
    PURPLE = "PURPLE",
    PINK = "PINK",
    RED = "RED",
    ORANGE = "ORANGE",
    TEAL = "TEAL",
  }

  export const CategorySchema = BaseModel.SimpleBaseRowSchema.extend({
    name: z.string(),
    color: z.enum(CategoryColorEnum),
    icon: z.string(),
  });

  export const CreateCategorySchema = CategorySchema.pick({
    name: true,
    color: true,
    icon: true,
  });

  export const UpdateCategorySchema = CreateCategorySchema.partial();

  export type CategoryDto = z.infer<typeof CategorySchema>;
  export type CreateCategoryDto = z.infer<typeof CreateCategorySchema>;
  export type UpdateCategoryDto = z.infer<typeof UpdateCategorySchema>;
}
