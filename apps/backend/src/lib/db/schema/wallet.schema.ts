import { relations } from "drizzle-orm";
import {
  integer,
  numeric,
  pgTable,
  serial,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { timestamps } from "../common";
import { userTable } from "./user.schema";
import { transactionTable } from "./transaction.schema";

export const walletTable = pgTable("wallets", {
  id: serial().primaryKey(),
  public_id: uuid().defaultRandom().unique().notNull(),
  user_id: integer()
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  name: varchar({ length: 50 }).notNull(),
  balance: numeric({ precision: 10, scale: 2, mode: "number" })
    .notNull()
    .default(0),
  ...timestamps,
});

export const walletRelation = relations(walletTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [walletTable.user_id],
    references: [userTable.id],
  }),
  transactions: many(transactionTable),
}));
