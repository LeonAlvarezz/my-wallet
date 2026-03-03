import { db, DrizzleTransaction } from "@/lib/db";
import { transactionTable } from "@/lib/db/schema/transaction.schema";
import { decodeCursor } from "@/util/cursor-pagination";
import { BaseModel, CursorModel, TransactionModel } from "@my-wallet/types";
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
  static async findByUserId(user_id: number) {
    return await db.query.transactionTable.findMany({
      where: eq(transactionTable.user_id, user_id),
      with: {
        category: true,
      },
    });
  }

  static async findTotalAmountByDays(
    dates: string[],
    user_id: number,
    query?: string,
  ) {
    const where: SQL[] = [
      eq(transactionTable.user_id, user_id),
      inArray(sql`DATE(${transactionTable.created_at})`, dates),
    ];
    if (query) {
      where.push(ilike(transactionTable.description, `%${query}%`));
    }
    return await db
      .select({
        day: sql<string>`DATE(${transactionTable.created_at})`,
        // Postgres returns SUM(numeric) as string; cast to float to ensure JSON number.
        total: sql<number>`COALESCE(SUM(${transactionTable.amount}), 0)::float8`,
      })
      .from(transactionTable)
      .where(and(...where))
      .groupBy(sql`DATE(${transactionTable.created_at})`)
      .orderBy(sql`DATE(${transactionTable.created_at})`);
  }

  static async findUserOverview(user_id: number) {
    const [result] = await db
      .select({
        total: sum(transactionTable.amount).mapWith(Number),
        average: avg(transactionTable.amount).mapWith(Number),
        highest: max(transactionTable.amount).mapWith(Number),
      })
      .from(transactionTable)
      .where(eq(transactionTable.user_id, user_id));
    return result;
  }

  static async cPaginate(
    query: TransactionModel.TransactionFilterDto,
    user_id: number,
  ) {
    const where = this.buildFilter(query);
    const run = db.query.transactionTable.findMany({
      where: and(...where, eq(transactionTable.user_id, user_id)),
      orderBy: [desc(transactionTable.created_at), desc(transactionTable.id)],
      limit: query.page_size,
      with: {
        category: true,
      },
    });
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
