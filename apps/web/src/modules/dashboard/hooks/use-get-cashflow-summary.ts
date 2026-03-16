import { api } from "@/api";
import { queryKey } from "@/api/keys";
import { useGetMe } from "@/modules/auth/hooks/use-get-me";
import { useQuery } from "@tanstack/react-query";

export function useGetCashflowSummary() {
  const { data: me } = useGetMe();
  return useQuery({
    queryKey: queryKey.transaction.cashflowSummary(me?.public_id),
    queryFn: api.transaction.getCashflowSummary,
    enabled: !!me?.public_id,
  });
}
