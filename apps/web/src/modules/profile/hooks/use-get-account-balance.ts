import { api } from "@/api";
import { queryKey } from "@/api/keys";
import { useGetMe } from "@/modules/auth/hooks/use-get-me";
import { useQuery } from "@tanstack/react-query";

export function useGetAccountBalance() {
  const me = useGetMe();

  return useQuery({
    queryKey: queryKey.wallet.accountBalance(me.data?.public_id),
    enabled: !!me.data?.public_id,
    queryFn: () => api.wallet.getAccountBalance(),
    staleTime: 60_000,
  });
}
