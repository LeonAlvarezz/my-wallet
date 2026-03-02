import { api } from "@/api";
import { queryKey } from "@/api/keys";
import type { TransactionModel } from "@my-wallet/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      id: number;
      payload: TransactionModel.UpdateTransactionDto;
    }) => api.transaction.update(params.id, params.payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKey.transaction.all,
      });
    },
  });
}
