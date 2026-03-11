import { WalletEventModel } from "@my-wallet/types";
import { WalletEventRepository } from "./wallet-event.repository";
import { NotFoundException } from "@my-wallet/exception";
import { WalletRepository } from "../wallet/wallet.repository";

export class WalletEventService {
  static async create(
    user_id: number,
    payload: WalletEventModel.CreateWalletEventBody,
  ) {
    const wallet = await WalletRepository.findByUserId(user_id);
    if (!wallet) throw new NotFoundException({ message: "Wallet not found" });
    return WalletEventRepository.create({
      ...payload,
      wallet_id: wallet.id,
    });
  }

  static async update(
    user_id: number,
    wallet_event_id: number,
    payload: WalletEventModel.UpdateWalletEvent,
  ) {
    const updated = await WalletEventRepository.updateByIdAndUserId(
      wallet_event_id,
      user_id,
      payload,
    );

    if (!updated)
      throw new NotFoundException({ message: "Wallet event not found" });

    return updated;
  }

  static async delete(user_id: number, wallet_event_id: number) {
    const deleted = await WalletEventRepository.deleteByIdAndUserId(
      wallet_event_id,
      user_id,
    );

    if (!deleted)
      throw new NotFoundException({ message: "Wallet event not found" });

    return deleted;
  }
}
