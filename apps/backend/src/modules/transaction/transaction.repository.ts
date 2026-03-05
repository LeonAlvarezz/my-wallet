import { db, DrizzleTransaction } from "@/lib/db";
import { categoryTable, walletTable } from "@/lib/db/schema";
import { transactionTable } from "@/lib/db/schema/transaction.schema";
import { decodeCursor } from "@/util/cursor-pagination";
import { getMonth } from "@/util/date";
import {
  BaseModel,
  CursorModel,
  TransactionModel,
  WalletModel,
} from "@my-wallet/types";
import {
  and,
  avg,
  desc,
  eq,
  gte,
  ilike,
  inArray,
  lt,
  max,
  or,
  sql,
  SQL,
  sum,
} from "drizzle-orm";

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

    if (filter.time_frame) {
      const now = new Date();
      const startOfDayUtc = (d: Date) =>
        new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));

      let start: Date | undefined;
      let endExclusive: Date | undefined;

      switch (filter.time_frame) {
        case BaseModel.TimeFrameEnum.TODAY: {
          start = startOfDayUtc(now);
          endExclusive = new Date(start);
          endExclusive.setUTCDate(endExclusive.getUTCDate() + 1);
          break;
        }
        case BaseModel.TimeFrameEnum.YESTERDAY: {
          endExclusive = startOfDayUtc(now);
          start = new Date(endExclusive);
          start.setUTCDate(start.getUTCDate() - 1);
          break;
        }
        case BaseModel.TimeFrameEnum.WEEK: {
          // "This week" = from Monday 00:00 (UTC) to now
          const day = now.getUTCDay(); // 0=Sun..6=Sat
          const diffFromMonday = (day + 6) % 7;
          start = startOfDayUtc(now);
          start.setUTCDate(start.getUTCDate() - diffFromMonday);
          break;
        }
        case BaseModel.TimeFrameEnum.MONTH: {
          start = new Date(
            Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
          );
          break;
        }
        case BaseModel.TimeFrameEnum.YEAR: {
          start = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
          break;
        }
        case BaseModel.TimeFrameEnum.ALL_TIME:
        default: {
          break;
        }
      }

      if (start) {
        where.push(gte(transactionTable.created_at, start.toISOString()));
      }
      if (endExclusive) {
        where.push(lt(transactionTable.created_at, endExclusive.toISOString()));
      }
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

  static async getTransactionsByUserId(userId: number) {
    const result = await db
      .select()
      .from(transactionTable)
      .innerJoin(walletTable, eq(transactionTable.wallet_id, walletTable.id))
      .where(eq(walletTable.user_id, userId));
    return result.map((row) => row.transactions);
  }

  static async findTotalAmountByDays(walletId: number, query?: string) {
    const where = this.buildFilter({
      query,
      page_size: 10,
    });

    const conditions: SQL[] = [
      ...where,
      eq(transactionTable.wallet_id, walletId),
    ];

    return await db
      .select({
        day: sql<string>`DATE(${transactionTable.created_at})`,
        // Postgres returns SUM(numeric) as string; cast to float to ensure JSON number.
        total: sql<number>`COALESCE(SUM(${transactionTable.amount}), 0)::float8`,
      })
      .from(transactionTable)
      .leftJoin(walletTable, eq(transactionTable.wallet_id, walletTable.id))
      .where(and(...conditions))
      .groupBy(sql`DATE(${transactionTable.created_at})`)
      .orderBy(sql`DATE(${transactionTable.created_at})`);
  }

  static async findUserOverview(
    query: TransactionModel.TransactionBaseQuery,
    user_id: number,
  ) {
    const conditions = this.buildFilter({
      ...query,
      page_size: 0,
    });

    const [result] = await db
      .select({
        total:
          sql<number>`COALESCE(SUM(${transactionTable.amount}), 0)`.mapWith(
            Number,
          ),
        average:
          sql<number>`COALESCE(AVG(${transactionTable.amount}), 0)`.mapWith(
            Number,
          ),
        highest:
          sql<number>`COALESCE(MAX(${transactionTable.amount}), 0)`.mapWith(
            Number,
          ),
      })
      .from(transactionTable)
      .leftJoin(walletTable, eq(transactionTable.wallet_id, walletTable.id))
      .where(and(...conditions, eq(walletTable.user_id, user_id)));

    return result;
  }

  static async findUserExpense(
    user_id: number,
    query: WalletModel.WalletQueryDto,
  ) {
    const conditions = this.buildFilter({
      ...query,
      page_size: 0,
    });
    const { monthStart, nextMonthStart } = getMonth();

    const [result] = await db
      .select({
        total:
          sql<number>`COALESCE(SUM(${transactionTable.amount}), 0)`.mapWith(
            Number,
          ),
      })
      .from(transactionTable)
      .leftJoin(walletTable, eq(transactionTable.wallet_id, walletTable.id))
      .where(and(...conditions, eq(walletTable.user_id, user_id)));
    return result;
  }

  static async cPaginate(
    query: TransactionModel.TransactionFilterDto,
    user_id: number,
  ) {
    const conditions = this.buildFilter(query);
    const result = await db
      .select()
      .from(transactionTable)
      .leftJoin(walletTable, eq(transactionTable.wallet_id, walletTable.id))
      .leftJoin(
        categoryTable,
        eq(transactionTable.category_id, categoryTable.id),
      )
      .where(and(...conditions, eq(walletTable.user_id, user_id)))
      .limit(query.page_size)
      .orderBy(desc(transactionTable.created_at), desc(transactionTable.id));

    const transaction = result.map((row) => ({
      ...row.transactions,
      category: row.categories,
    }));

    return transaction;
  }

  static async create(
    payload: TransactionModel.CreateTransactionDto,
    wallet_id: number,
    tx?: DrizzleTransaction,
  ) {
    const client = tx ? tx : db;
    const [result] = await client
      .insert(transactionTable)
      .values({
        ...payload,
        wallet_id,
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
