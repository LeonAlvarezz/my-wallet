import { pgEnum, text } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";
import { pgTable, serial } from "drizzle-orm/pg-core";
import { enumToPgEnum, simpleTimestamps } from "../common";
import { CategoryModel } from "@my-wallet/types";
import { integer } from "drizzle-orm/pg-core";
export const categoryColorEnum = pgEnum(
  "CategoryColorEnum",
  enumToPgEnum(CategoryModel.CategoryColorEnum),
);
export const categoryTable = pgTable("categories", {
  id: serial().primaryKey(),
  name: varchar({ length: 50 }).notNull(),
  icon: text().notNull(),
  color: categoryColorEnum().notNull(),
  order: integer().notNull().unique(),
  ...simpleTimestamps,
});
