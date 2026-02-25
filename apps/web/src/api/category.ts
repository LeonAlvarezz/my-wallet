import { requestClient } from "@/lib/request";
import { CategoryModel, type ApiResult } from "@my-wallet/types";
const key = "/categories";
const category = {
  getAll: () => {
    new Promise((resolve) => setTimeout(resolve, 5000));
    return requestClient.get<CategoryModel.CategoryDto[]>(`${key}`);
  },

  getById: (id: number) =>
    requestClient.get<ApiResult<CategoryModel.CategoryDto[]>>(`${key}/${id}`),
};

export default category;
