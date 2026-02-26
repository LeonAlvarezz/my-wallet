import { requestClient } from "@/lib/request";
import type { SimpleSuccess, TransactionModel } from "@my-wallet/types";

const key = "/transactions";
const transaction = {
  getAll: () =>
    requestClient.get<TransactionModel.TransactionWithCategoryDto[]>(`${key}`),
  getById: (id: number) =>
    requestClient.get<TransactionModel.TransactionDto[]>(`${key}/${id}`),
  create: (payload: TransactionModel.CreateTransactionDto) =>
    requestClient.post<TransactionModel.TransactionDto>(`${key}`, payload),
  update: (id: number, payload: TransactionModel.UpdateTransactionDto) =>
    requestClient.put<SimpleSuccess>(`${key}/${id}`, payload),
  delete: (id: number) => requestClient.delete<SimpleSuccess>(`${key}/${id}`),
};
export default transaction;
