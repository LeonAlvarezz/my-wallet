import { queryKey } from "@/api/keys";
import { api } from "@/api";
import { useGetMe } from "@/modules/auth/hooks/use-get-me";
import { useQuery } from "@tanstack/react-query";

export function useGetSpendingOverview() {
  const me = useGetMe();

  return useQuery({
    queryKey: queryKey.transaction.overview(me.data?.public_id),
    enabled: !!me.data?.public_id,
    queryFn: () => api.transaction.getOverview(),
  });
}
