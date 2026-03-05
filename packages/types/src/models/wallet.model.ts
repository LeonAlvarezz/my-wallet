import z from "zod";
import { BaseModel } from "./base.model";

export namespace WalletModel {
  export const WalletSchema = BaseModel.BaseRowSchema.extend({
    public_id: z.uuid(),
    user_id: z.number(),
    name: z.string(),
  });

  export const WalletPublicSchema = WalletSchema.omit({
    id: true,
    deleted_at: true,
  });

  export const CreateWalletSchema = WalletSchema.pick({
    name: true,
  });

  export const UpdateWalletSchema = CreateWalletSchema.partial();

  export const WalletQuerySchema = z.object({
    time_frame: z
      .enum(BaseModel.TimeFrameEnum)
      .default(BaseModel.TimeFrameEnum.ALL_TIME),
  });

  export const AccountBalanceSchema = z.object({
    balance: z.number(),
    expenses: z.number(),
    remaining: z.number(),
  });

  export type WalletDto = z.infer<typeof WalletSchema>;
  export type WalletPublicDto = z.infer<typeof WalletPublicSchema>;
  export type CreateWalletDto = z.infer<typeof CreateWalletSchema>;
  export type UpdateWalletDto = z.infer<typeof UpdateWalletSchema>;
  export type WalletQueryDto = z.infer<typeof WalletQuerySchema>;
  export type AccountBalanceDto = z.infer<typeof AccountBalanceSchema>;
}
