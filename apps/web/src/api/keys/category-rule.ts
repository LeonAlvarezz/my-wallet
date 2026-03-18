export default {
  all: ["category-rules"] as const,
  list: (user_id: string | undefined) => ["category-rules", user_id] as const,
  count: (user_id: string | undefined) =>
    ["category-rules", "count", user_id] as const,
  byCategory: (category_id: number | undefined, user_id: string | undefined) =>
    ["category-rules", "by-category", category_id, user_id] as const,
};
