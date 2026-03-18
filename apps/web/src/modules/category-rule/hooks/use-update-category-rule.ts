import { api } from "@/api";
import { queryKey } from "@/api/keys";
import { useGetMe } from "@/modules/auth/hooks/use-get-me";
import type { CategoryRuleModel } from "@my-wallet/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateCategoryRule() {
  const queryClient = useQueryClient();
  const { data: me } = useGetMe();

  return useMutation({
    mutationFn: (params: {
      id: number;
      payload: CategoryRuleModel.UpdateCategoryRuleDto;
    }) => api.categoryRule.update(params.id, params.payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKey.categoryRule.all,
        }),
      ]);
    },
  });
}
