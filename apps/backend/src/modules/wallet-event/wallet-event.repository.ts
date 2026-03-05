import { db } from "@/lib/db";
import {
  transactionTable,
  userTable,
  walletEventTable,
  walletTable,
} from "@/lib/db/schema";
import { getMonth } from "@/util/date";
import { BaseModel, WalletModel } from "@my-wallet/types";
import { and, eq, gte, inArray, lt, SQL, sql } from "drizzle-orm";

export class WalletEventRepository {
  static buildFilter(query: WalletModel.WalletQueryDto) {
    const where: SQL[] = [];
    if (query.time_frame) {
      let start: Date | undefined;
      let endExclusive: Date | undefined;
      const now = new Date();
      switch (query.time_frame) {
        case BaseModel.TimeFrameEnum.MONTH: {
          start = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
        }
        default:
          break;
      }
      if (start) {
        where.push(gte(walletEventTable.created_at, start.toISOString()));
      }
      if (endExclusive) {
        where.push(lt(walletEventTable.created_at, endExclusive.toISOString()));
      }
    }
    return where;
  }
  static async findUserIncome(
    user_id: number,
    query: WalletModel.WalletQueryDto,
  ) {
    const conditions = this.buildFilter(query);

    const [result] = await db
      .select({
        total:
          sql<number>`COALESCE(SUM(${walletEventTable.amount}), 0)`.mapWith(
            Number,
          ),
      })
      .from(walletEventTable)
      .leftJoin(walletTable, eq(walletEventTable.wallet_id, walletTable.id))
      .leftJoin(userTable, eq(walletTable.user_id, userTable.id))
      .where(and(...conditions, eq(walletTable.user_id, user_id)));
    return result;
  }
}
