export default {
  all: ["wallets"] as const,
  get: (id: string | undefined) => ["wallets", "get", id] as const,
  accountBalance: (id: string | undefined) =>
    ["wallets", "account-balance", id] as const,
};
