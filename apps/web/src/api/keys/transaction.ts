export default {
  all: ["transactions"] as const,
  list: () => ["transactions", "list"] as const,
  user: (id: string | undefined) => ["transactions", id] as const,
};
