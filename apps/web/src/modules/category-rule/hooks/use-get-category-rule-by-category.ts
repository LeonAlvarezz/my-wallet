import { api } from "@/api";
import { queryKey } from "@/api/keys";
import { useGetMe } from "@/modules/auth/hooks/use-get-me";
import { useQuery } from "@tanstack/react-query";

export function useGetCategoryRuleByCategory(
  category_id: number,
  enabled = true,
) {
  const { data: me } = useGetMe();

  return useQuery({
    queryKey: queryKey.categoryRule.byCategory(category_id, me?.public_id),
    queryFn: () => api.categoryRule.getRuleByCategory(category_id),
    enabled: !!me?.public_id && enabled && category_id > 0,
  });
}
