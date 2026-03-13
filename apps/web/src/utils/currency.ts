export function getDisplayAmount(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function formatAmount(amount: number | string) {
  return !Number.isNaN(Number(amount)) ? Number(amount) : 0;
}
