export default {
  all: ["transactions"] as const,
  list: () => ["transactions", "list"] as const,
  cashflow: (
    id: string | undefined,
    options?: {
      time_frame?: string;
    },
  ) => ["transactions", "cashflow", id, options?.time_frame ?? null] as const,
  paginate: (
    id: string | undefined,
    options?: {
      page_size?: number;
      query?: string;
      time_frame?: string;
    },
  ) =>
    [
      "transactions",
      "paginate",
      id,
      options?.page_size ?? null,
      options?.query ?? null,
      options?.time_frame ?? null,
    ] as const,
  user: (id: string | undefined) => ["transactions", id] as const,
  cashflowSummary: (id: string | undefined) =>
    ["transactions", "cashflow", id] as const,
  statistic: (id: string | undefined, options?: { time_frame?: string }) =>
    ["transactions", "statistic", id, options?.time_frame ?? null] as const,
  totalByCategory: (id: string | undefined) =>
    ["transactions", "by-category", id] as const,
};
