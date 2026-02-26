import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { userTable } from "./user.schema";
import { numeric } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { timestamps } from "../common";
import { relations } from "drizzle-orm";
import { categoryTable } from "./category.schema";

export const transactionTable = pgTable("transactions", {
  id: serial().primaryKey(),
  user_id: integer()
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  amount: numeric({ precision: 10, scale: 2, mode: "number" }).notNull(),
  description: text(),
  category_id: integer()
    .notNull()
    .references(() => categoryTable.id),
  ...timestamps,
});

export const transactionRelation = relations(transactionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [transactionTable.user_id],
    references: [userTable.id],
  }),

  category: one(categoryTable, {
    fields: [transactionTable.id],
    references: [categoryTable.id],
  }),
}));
