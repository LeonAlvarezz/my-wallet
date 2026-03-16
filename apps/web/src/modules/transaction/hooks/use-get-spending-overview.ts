import { queryKey } from "@/api/keys";
import { api } from "@/api";
import { useGetMe } from "@/modules/auth/hooks/use-get-me";
import { useQuery } from "@tanstack/react-query";
import type { TransactionModel } from "@my-wallet/types";

export function useGetSpendingOverview(
  filter?: TransactionModel.TransactionBaseQuery,
) {
  const me = useGetMe();

  return useQuery({
    queryKey: queryKey.transaction.overview(me.data?.public_id, filter),
    enabled: !!me.data?.public_id,
    queryFn: () => api.transaction.getOverview(filter),
  });
}
