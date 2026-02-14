import { eq } from "drizzle-orm";
import { type DrizzleTransaction, db } from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import type { UserModel } from "./user.model";

export abstract class UserRepository {
  static async create(
    payload: UserModel.UpsertUserDto,
    tx?: DrizzleTransaction,
  ) {
    const client = tx ? tx : db;
    const [result] = await client.insert(userTable).values(payload).returning();
    return result;
  }

  static async findByEmail(email: string) {
    return await db.query.userTable.findFirst({
      where: eq(userTable.email, email),
    });
  }
  static async findAll() {
    return await db.query.userTable.findMany();
  }
}
