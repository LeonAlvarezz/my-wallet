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

  export const CategorySchema = z.object({
    id: z.number(),
    created_at: z.iso.datetime(),
    updated_at: z.iso.datetime().nullable().optional(),
    name: z.string(),
    color: z.enum(CategoryColorEnum),
    order: z.number(),
    icon: z.string(),
  });

  export const CreateCategorySchema = CategorySchema.pick({
    name: true,
    color: true,
    icon: true,
    order: true,
  });

  export const UpdateCategorySchema = CreateCategorySchema.partial();

  export type CategoryDto = z.infer<typeof CategorySchema>;
  export type CreateCategoryDto = z.infer<typeof CreateCategorySchema>;
  export type UpdateCategoryDto = z.infer<typeof UpdateCategorySchema>;
}
