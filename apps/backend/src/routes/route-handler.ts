import { auth } from "@/modules/auth";
import { transaction } from "@/modules/transaction";
import { user } from "@/modules/user";
import { category } from "@/modules/category";
import Elysia from "elysia";

export const routeHandler = new Elysia({ name: "route-handler" })
  .use(user)
  .use(transaction)
  .use(category)
  .use(auth);
