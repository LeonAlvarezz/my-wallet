import { api } from "@/api";
import { queryKey } from "@/api/keys";
import { useGetMe } from "@/modules/auth/hooks/use-get-me";
import { useQuery } from "@tanstack/react-query";

export function useGetTotalByCategory() {
  const { data: me } = useGetMe();
  return useQuery({
    queryKey: queryKey.transaction.totalByCategory(me?.public_id),
    queryFn: api.transaction.getTotalByCategory,
    enabled: !!me?.public_id,
  });
}
