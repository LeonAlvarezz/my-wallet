import z from "zod";
import { BaseModel } from "./base.model";

export namespace WalletEventModel {
  export enum WalletEventType {
    INCOME = "INCOME",
    ADJUSTMENT = "ADJUSTMENT",
    OTHER = "OTHER",
  }

  export const WalletEventSchema = BaseModel.BaseRowSchema.extend({
    wallet_id: z.number(),
    type: z.enum(WalletEventType),
    amount: z.number(),
    note: z.string().optional().nullable(),
  });

  export const WalletEventPublicSchema = WalletEventSchema.omit({
    wallet_id: true,
  });

  // API body (client sends this)
  export const CreateWalletEventBodySchema = WalletEventSchema.pick({
    amount: true,
    note: true,
    type: true,
  });

  // Internal insert (server builds this)
  export const CreateWalletEventSchema = CreateWalletEventBodySchema.extend({
    wallet_id: z.number(),
  });

  export const UpdateWalletEventSchema = CreateWalletEventBodySchema.partial();

  export type WalletEvent = z.infer<typeof WalletEventSchema>;
  export type WalletEventPublic = z.infer<typeof WalletEventPublicSchema>;
  export type CreateWalletEventBody = z.infer<
    typeof CreateWalletEventBodySchema
  >;
  export type CreateWalletEvent = z.infer<typeof CreateWalletEventSchema>;
  export type UpdateWalletEvent = z.infer<typeof UpdateWalletEventSchema>;
}
