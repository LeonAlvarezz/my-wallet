import { auth } from "@/modules/auth";
import { transaction } from "@/modules/transaction";
import { user } from "@/modules/user";
import { category } from "@/modules/category";
import Elysia from "elysia";
import { wallet } from "@/modules/wallet";
import { categoryRule } from "@/modules/category-rule";

export const routeHandler = new Elysia({ name: "route-handler" })
  .use(user)
  .use(transaction)
  .use(category)
  .use(wallet)
  .use(auth)
  .use(categoryRule);
