import { api } from "@/api";
import { queryKey } from "@/api/keys";
import { useGetMe } from "@/modules/auth/hooks/use-get-me";
import { useQuery } from "@tanstack/react-query";

export function useGetCategoryRuleList() {
  const { data: me } = useGetMe();
  return useQuery({
    queryKey: queryKey.categoryRule.list(me?.public_id),
    queryFn: () => api.categoryRule.getRuleList(),
    enabled: !!me,
  });
}
