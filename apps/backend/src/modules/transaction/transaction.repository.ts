import { db, DrizzleTransaction } from "@/lib/db";
import { transactionTable } from "@/lib/db/schema/transaction.schema";
import { decodeCursor } from "@/util/cursor-pagination";
import { CursorModel, TransactionModel } from "@my-wallet/types";
import { and, desc, eq, ilike, lt, or, SQL } from "drizzle-orm";

export class TransactionRepository {
  static buildFilter(filter: TransactionModel.TransactionFilterDto) {
    const where: SQL[] = [];
    if (filter.cursor) {
      const { created_at, id } = decodeCursor(filter.cursor);

      // Match orderBy: created_at desc, id desc
      // Next page: (created_at < cursor.created_at) OR (created_at = cursor.created_at AND id < cursor.id)
      const condition = or(
        lt(transactionTable.created_at, created_at),
        and(
          eq(transactionTable.created_at, created_at),
          lt(transactionTable.id, id),
        ),
      );
      if (condition) where.push(condition);
    }

    if (filter.query) {
      where.push(ilike(transactionTable.description, `%${filter.query}%`));
    }

    return where;
  }
  static async findMany() {
    return await db.query.transactionTable.findMany();
  }
  static async findById(id: number) {
    return await db.query.transactionTable.findFirst({
      where: eq(transactionTable.id, id),
    });
  }
  static async findByUserId(user_id: number) {
    return await db.query.transactionTable.findMany({
      where: eq(transactionTable.user_id, user_id),
      with: {
        category: true,
      },
    });
  }
  static async cPaginate(query: CursorModel.CursorQuery) {
    const where = this.buildFilter(query);
    const run = db.query.transactionTable.findMany({
      where: and(...where),
      orderBy: [desc(transactionTable.created_at), desc(transactionTable.id)],
      limit: query.page_size,
      with: {
        category: true,
      },
    });

    console.log("run.toSQL():", run.toSQL());
    return await run;
  }
  static async create(
    payload: TransactionModel.CreateTransactionDto,
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
    payload: TransactionModel.UpdateTransactionDto,
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
