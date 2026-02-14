import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import { errorHandler } from "@/core/error/error-handler";
import env from "@/lib/env";
import { appInfo } from "./modules/app";
import { routeHandler } from "./routes/route-handler";
import openapi from "@elysiajs/openapi";
import { authGuard } from "./modules/auth/guard";

const app = new Elysia({
  prefix: "/v1",
})
  .use(cors())
  .use(appInfo)
  .use(routeHandler)
  .use(errorHandler)
  .listen(env.PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
