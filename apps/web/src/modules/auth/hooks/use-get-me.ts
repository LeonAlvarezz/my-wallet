import { api } from "@/api";
import { queryKey } from "@/api/keys";
import type { UserModel } from "@my-wallet/types";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = () => {
  return useQuery<UserModel.UserPublicDto>({
    queryKey: queryKey.auth.me,
    queryFn: () => {
      return api.auth.getMe();
    },
    retry: false,
    staleTime: 60_000,
  });
};
