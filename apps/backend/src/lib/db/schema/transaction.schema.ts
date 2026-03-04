import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { userTable } from "./user.schema";
import { numeric } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { timestamps } from "../common";
import { relations } from "drizzle-orm";
import { categoryTable } from "./category.schema";
import { walletTable } from "./wallet.schema";

export const transactionTable = pgTable("transactions", {
  id: serial().primaryKey(),
  wallet_id: integer()
    .notNull()
    .references(() => walletTable.id, {
      onDelete: "set null",
    }),
  amount: numeric({ precision: 10, scale: 2, mode: "number" }).notNull(),
  description: text(),
  category_id: integer()
    .notNull()
    .references(() => categoryTable.id),
  ...timestamps,
});

export const transactionRelation = relations(transactionTable, ({ one }) => ({
  wallet: one(walletTable, {
    fields: [transactionTable.wallet_id],
    references: [walletTable.id],
  }),

  category: one(categoryTable, {
    fields: [transactionTable.category_id],
    references: [categoryTable.id],
  }),
}));
