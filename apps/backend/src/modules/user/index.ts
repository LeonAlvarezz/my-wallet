import Elysia, { InternalServerError } from "elysia";
import { Success } from "@/core/response";
import { authGuard } from "../auth/guard";
import { OpenApiKey } from "../app/openapi";
import { UserService } from "./user.service";
import { SuccessSchema, UserModel } from "@my-wallet/types";

export const user = new Elysia().use(authGuard).group("/users", (app) => {
  app.get(
    "/",
    async () => {
      const data = await UserService.findAll();
      return Success(data);
    },
    {
      protected: true,
      detail: {
        summary: "Get all users list",
        tags: [OpenApiKey.User],
      },
      response: SuccessSchema(UserModel.UserPublicSchema.array()),
    },
  );

  return app;
});
