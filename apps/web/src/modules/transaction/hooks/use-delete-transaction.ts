import { api } from "@/api";
import { queryKey } from "@/api/keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.transaction.delete(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKey.transaction.all,
      });
    },
  });
}
