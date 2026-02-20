import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { userTable } from "./user.schema";
import { isoTimestamp as timestamp } from "@/lib/db/common/iso-timestamp";

export const authTable = pgTable("auths", {
  id: serial().primaryKey(),

  user_id: integer()
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),

  // local auth (password)
  password_hash: text().notNull(),
  password_updated_at: timestamp({ mode: "string" }).notNull().defaultNow(),

  // // basic security controls
  // failed_login_attempts: integer().notNull().default(0),
  // locked_until: timestamp(),
});

export const authRelation = relations(authTable, ({ one }) => ({
  user: one(userTable, {
    fields: [authTable.user_id],
    references: [userTable.id],
  }),
}));
