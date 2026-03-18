import { api } from "@/api";
import { queryKey } from "@/api/keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteCategoryRule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.categoryRule.delete(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKey.categoryRule.all,
      });
    },
  });
}
