import { api } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useSignIn = () => {
  return useMutation({
    mutationFn: api.auth.signIn,
  });
};
