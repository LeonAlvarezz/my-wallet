import { api } from "@/api";
import { queryKey } from "@/api/keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useChangePassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.auth.changePassword,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKey.auth.me });
    },
  });
}
