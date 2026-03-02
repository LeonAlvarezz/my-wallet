export default {
  all: ["transactions"] as const,
  list: () => ["transactions", "list"] as const,
  overview: (id: string | undefined) =>
    ["transactions", "overview", id] as const,
  paginate: (
    id: string | undefined,
    options?: {
      page_size?: number;
      query?: string;
    },
  ) =>
    [
      "transactions",
      "paginate",
      id,
      options?.page_size ?? null,
      options?.query ?? null,
    ] as const,
  user: (id: string | undefined) => ["transactions", id] as const,
};
