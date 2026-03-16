import { api } from "@/api";
import { queryKey } from "@/api/keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.transaction.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKey.transaction.all,
      });
    },
  });
}
