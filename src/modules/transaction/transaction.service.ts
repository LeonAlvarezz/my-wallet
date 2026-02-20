import { ForbiddenException, NotFoundException } from "@/core/error";
import { TransactionModel } from "./transaction.model";
import { TransactionRepository } from "./transaction.repository";

export class TransactionService {
  static async findAll() {
    return await TransactionRepository.findMany();
  }
  static async findById(id: number) {
    const data = await TransactionRepository.findById(id);
    if (!data) throw new NotFoundException();
    return data;
  }
  static create(
    payload: TransactionModel.CreateTransactionDto,
    user_id: number,
  ) {
    return TransactionRepository.create(payload, user_id);
  }
  static async update(
    id: number,
    user_id: number,
    payload: TransactionModel.UpdateTransactionDto,
  ) {
    const transaction = await TransactionRepository.findById(id);
    if (!transaction) throw new NotFoundException();

    // Check if user owns this transaction
    if (transaction.user_id !== user_id) {
      throw new ForbiddenException({
        message: "You can no permission to edit this transaction",
      });
    }

    return TransactionRepository.update(id, payload);
  }

  static async delete(id: number, user_id: number) {
    const transaction = await TransactionRepository.findById(id);
    if (!transaction) throw new NotFoundException();

    // Check if user owns this transaction
    if (transaction.user_id !== user_id) {
      throw new ForbiddenException({
        message: "You can no permission to edit this transaction",
      });
    }

    return TransactionRepository.delete(id);
  }
}
