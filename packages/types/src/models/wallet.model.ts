import z from "zod";
import { BaseModel } from "./base.model";

export namespace WalletModel {
  export const WalletSchema = BaseModel.BaseRowSchema.extend({
    public_id: z.uuid(),
    user_id: z.number(),
    name: z.string(),
    balance: z.number(),
  });

  export const WalletPublicSchema = WalletSchema.omit({
    id: true,
    deleted_at: true,
  });

  export const CreateWalletSchema = WalletSchema.pick({
    name: true,
    balance: true,
  });

  export const UpdateWalletSchema = CreateWalletSchema.partial();

  export type WalletDto = z.infer<typeof WalletSchema>;
  export type WalletPublicDto = z.infer<typeof WalletPublicSchema>;
  export type CreateWalletDto = z.infer<typeof CreateWalletSchema>;
  export type UpdateWalletDto = z.infer<typeof UpdateWalletSchema>;
}
