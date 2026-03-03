import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from "@my-wallet/exception";
import { TransactionRepository } from "./transaction.repository";
import { TransactionModel } from "@my-wallet/types";
import { processCursorResult } from "@/util/cursor-pagination";
import { CategoryRepository } from "../category/category.repository";

export class TransactionService {
  /**
   * Cursor based
   * - First Page
   * {
   * data: (length {page_size})
   * meta: {
   *    last_id,
   *    total,
   *    page,
   *    page_size
   * }
   * }
   * - Second Page
   * offset: last_id
   * {
   * data: (length {page_size})
   * meta: {
   *    last_id,
   *    total,
   *    page,
   *    page_size
   * }
   * }
   */
  static async cPaginate(
    query: TransactionModel.TransactionFilterDto,
    user_id: number,
  ) {
    const data = await TransactionRepository.cPaginate(query, user_id);

    const dates = Array.from(
      new Set(data.map((row) => row.created_at.split("T")[0])),
    );

    const extra =
      dates.length > 0
        ? await TransactionRepository.findTotalAmountByDays(
            dates,
            user_id,
            query.query,
          )
        : [];

    return processCursorResult(data, query.page_size, extra);
  }

  static findUserOverview(
    query: TransactionModel.TransactionBaseQuery,
    user_id: number,
  ) {
    return TransactionRepository.findUserOverview(query, user_id);
  }

  static async findAll() {
    return await TransactionRepository.findMany();
  }

  static async findById(id: number) {
    const data = await TransactionRepository.findById(id);
    if (!data) throw new NotFoundException();
    return data;
  }

  static async findByUserId(user_id: number) {
    return await TransactionRepository.findByUserId(user_id);
  }
  static async create(
    payload: TransactionModel.CreateTransactionDto,
    user_id: number,
  ) {
    const category = await CategoryRepository.findById(payload.category_id);

    if (!category) {
      throw new BadRequestException({ message: "Invalid category_id" });
    }

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
