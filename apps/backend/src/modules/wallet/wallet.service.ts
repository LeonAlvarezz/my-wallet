import { WalletModel } from "@my-wallet/types";
import { WalletRepository } from "./wallet.repository";

export class WalletService {
  static async findByUserId(user_id: number) {
    const result = await WalletRepository.findByUserId(user_id);
    return WalletModel.WalletPublicSchema.parse(result);
  }
}
