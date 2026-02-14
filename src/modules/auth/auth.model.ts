import z from "zod";

export namespace AuthModel {
  export const SignInSchema = z.object({
    email: z.email(),
    password: z
      .string()
      .min(8, { error: "Password must be greater than 8 characters" }),
  });

  export const SignUpSchema = SignInSchema.extend({
    username: z.string(),
  });

  export const UpsertAuthSchema = z.object({
    password_hash: z.string().min(1),
    user_id: z.number().int().positive(),
    failed_login_attempts: z.number().int().min(0).default(0).optional(),
    locked_until: z.iso.date().optional(),
    password_updated_at: z.iso.date().optional(),
  });

  export type SignUpDto = z.infer<typeof SignUpSchema>;
  export type SignInDto = z.infer<typeof SignInSchema>;
  export type UpsertAuthDto = z.infer<typeof UpsertAuthSchema>;
}
