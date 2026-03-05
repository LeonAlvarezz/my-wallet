import { relations } from "drizzle-orm";
import {
  integer,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";
import { enumToPgEnum, timestamps } from "../common";
import { walletTable } from "./wallet.schema";
import { WalletEventModel } from "@my-wallet/types";

export const walletEventType = pgEnum(
  "WalletEventTypeEnum",
  enumToPgEnum(WalletEventModel.WalletEventType),
);

export const walletEventTable = pgTable("wallet_events", {
  id: serial().primaryKey(),
  wallet_id: integer()
    .notNull()
    .references(() => walletTable.id, {
      onDelete: "cascade",
    }),
  type: walletEventType()
    .notNull()
    .default(WalletEventModel.WalletEventType.INCOME),
  amount: numeric({ precision: 10, scale: 2, mode: "number" }).notNull(),
  note: text(),
  ...timestamps,
});

export const walletEventRelation = relations(walletEventTable, ({ one }) => ({
  wallet: one(walletTable, {
    fields: [walletEventTable.wallet_id],
    references: [walletTable.id],
  }),
}));
