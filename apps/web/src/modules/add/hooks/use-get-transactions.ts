import { api } from "@/api";
import { queryKey } from "@/api/keys";
import { useGetMe } from "@/modules/auth/hooks/use-get-me";
import { useQuery } from "@tanstack/react-query";

export function useGetTransactions() {
  const { data } = useGetMe();
  return useQuery({
    queryKey: queryKey.transaction.user(data?.public_id),
    queryFn: api.transaction.getAll,
  });
}
