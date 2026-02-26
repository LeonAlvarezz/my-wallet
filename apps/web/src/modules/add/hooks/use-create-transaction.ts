import { api } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useCreateTransaction() {
  return useMutation({
    mutationFn: api.transaction.create,
    // onSuccess:
  });
}
