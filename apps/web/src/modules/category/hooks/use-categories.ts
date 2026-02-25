import { api } from "@/api";
import type { CategoryModel } from "@my-wallet/types";
import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "../api/key";

export const useCategories = () => {
  return useQuery<CategoryModel.CategoryDto[]>({
    queryKey: categoryKeys.all,
    queryFn: () => {
      return api.category.getAll();
    },
    staleTime: Infinity,
  });
};
