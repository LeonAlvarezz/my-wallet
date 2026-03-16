export function getDisplayAmount(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function formatAmount(amount: number | string | null | undefined) {
  if (amount === null || amount === undefined) {
    return 0;
  }

  const parsedAmount =
    typeof amount === "string" ? Number(amount.trim()) : amount;

  return Number.isFinite(parsedAmount) ? parsedAmount : 0;
}
