import { db, DrizzleTransaction } from "@/lib/db";
import { transactionTable } from "@/lib/db/schema/transaction.schema";
import { TransactionModel } from "@my-wallet/types";
import { eq } from "drizzle-orm";

export class TransactionRepository {
  static async findMany() {
    return await db.query.transactionTable.findMany();
  }
  static async findById(id: number) {
    return await db.query.transactionTable.findFirst({
      where: eq(transactionTable.id, id),
    });
  }
  static async create(
    payload: TransactionModel.UpsertTransactionDto,
    user_id: number,
    tx?: DrizzleTransaction,
  ) {
    const client = tx ? tx : db;
    const [result] = await client
      .insert(transactionTable)
      .values({
        ...payload,
        user_id,
      })
      .returning();
    return result;
  }

  static async update(
    id: number,
    payload: TransactionModel.UpsertTransactionDto,
    tx?: DrizzleTransaction,
  ) {
    const client = tx ? tx : db;
    const [result] = await client
      .update(transactionTable)
      .set(payload)
      .where(eq(transactionTable.id, id))
      .returning();
    return result;
  }
  static async delete(id: number, tx?: DrizzleTransaction) {
    const client = tx ? tx : db;
    const [result] = await client
      .delete(transactionTable)
      .where(eq(transactionTable.id, id))
      .returning();
    return result;
  }
}
