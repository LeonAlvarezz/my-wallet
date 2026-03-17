import { api } from "@/api";
import { queryKey } from "@/api/keys";
import { useGetMe } from "@/modules/auth/hooks/use-get-me";
import { useQuery } from "@tanstack/react-query";

export function useGetRecentTransactions() {
  const { data: me } = useGetMe();

  return useQuery({
    queryKey: queryKey.transaction.paginate(me?.public_id, {
      page_size: 3,
    }),
    queryFn: () =>
      api.transaction.cPaginate({
        page_size: 3,
      }),
    enabled: !!me?.public_id,
  });
}