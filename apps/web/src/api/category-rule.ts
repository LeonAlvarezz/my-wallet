import { requestClient } from "@/lib/request";
import type { CategoryRuleModel } from "@my-wallet/types";

const key = "/category-rules";

const categoryRule = {
  getRuleByCategory: (id: number) =>
    requestClient.get<CategoryRuleModel.CategoryRuleDto[]>(
      `${key}/category/${id}`,
    ),
  getCountByCategory: () =>
    requestClient.get<CategoryRuleModel.CategoryRuleCountDto[]>(`${key}/count`),
};

export default categoryRule;
