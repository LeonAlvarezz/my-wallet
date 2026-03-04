import { db } from "@/lib/db";
import { walletTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export class WalletRepository {
  static async findByUserId(user_id: number) {
    return db.query.walletTable.findFirst({
      where: eq(walletTable.user_id, user_id),
    });
  }
}
