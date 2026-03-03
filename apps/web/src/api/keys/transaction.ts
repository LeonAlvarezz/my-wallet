export default {
  all: ["transactions"] as const,
  list: () => ["transactions", "list"] as const,
  overview: (
    id: string | undefined,
    options?: {
      time_frame?: string;
    },
  ) =>
    ["transactions", "overview", id, options?.time_frame ?? null] as const,
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
};
