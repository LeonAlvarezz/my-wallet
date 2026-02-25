import { api } from "@/api";
import { queryKey } from "@/api/keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export const useSignOut = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.auth.signOut,
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: queryKey.auth.me });
      queryClient.removeQueries({ queryKey: queryKey.auth.me });
      toast.success("Signed out");
      navigate({
        to: "/auth/login",
      });
    },
  });
};
