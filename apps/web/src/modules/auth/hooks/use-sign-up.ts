import { api } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const useSignUp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: api.auth.signUp,
    onSuccess: () => {
      toast.success("Sign up successful");
      navigate({
        to: "/auth/login",
      });
    },
  });
};
