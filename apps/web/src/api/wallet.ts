import { requestClient } from "@/lib/request";
import type { WalletModel } from "@my-wallet/types";

const key = "/wallets";

const wallet = {
  get: () => requestClient.get<WalletModel.WalletPublicDto>(`${key}`),
  getAccountBalance: () =>
    requestClient.get<WalletModel.AccountBalanceDto>(`${key}/account-balance`),
};

export default wallet;
