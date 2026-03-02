import { requestClient } from "@/lib/request";
import type {
  CursorPagination,
  SimpleSuccess,
  TransactionModel,
} from "@my-wallet/types";

const key = "/transactions";
const transaction = {
  cPaginate: (filter: TransactionModel.TransactionFilterDto) =>
    requestClient.get<
      CursorPagination<
        TransactionModel.TransactionWithCategoryDto,
        TransactionModel.ExtraDailyTotalDto[]
      >
    >(`${key}`, {
      params: filter,
    }),
  getOverview: () =>
    requestClient.get<TransactionModel.UserOverviewDto>(`${key}/overview`),
  // getAll: () =>
  //   requestClient.get<TransactionModel.TransactionWithCategoryDto[]>(`${key}`),
  getById: (id: number) =>
    requestClient.get<TransactionModel.TransactionDto>(`${key}/${id}`),
  create: (payload: TransactionModel.CreateTransactionDto) =>
    requestClient.post<TransactionModel.TransactionDto>(`${key}`, payload),
  update: (id: number, payload: TransactionModel.UpdateTransactionDto) =>
    requestClient.put<TransactionModel.TransactionDto>(`${key}/${id}`, payload),
  delete: (id: number) => requestClient.delete<SimpleSuccess>(`${key}/${id}`),
};
export default transaction;
