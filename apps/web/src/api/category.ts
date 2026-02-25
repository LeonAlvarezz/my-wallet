import { requestClient } from "@/lib/request";
import { CategoryModel, type ApiResult } from "@my-wallet/types";
const key = "/categories";
export default {
  getAll: () =>
    requestClient.get<ApiResult<CategoryModel.CategoryDto[]>>(`${key}`),

  getById: (id: number) =>
    requestClient.get<ApiResult<CategoryModel.CategoryDto[]>>(`${key}/${id}`),
};
