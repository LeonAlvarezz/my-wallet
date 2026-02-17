import Elysia, { InternalServerError } from "elysia";
import { UserModel } from "./user.model";
import { Success, SuccessSchema } from "@/core/response";
import { authGuard } from "../auth/guard";
import { OpenApiKey } from "../app/openapi";
import { UnauthorizedException } from "@/core/error";
import { UserService } from "./user.service";

export const user = new Elysia().use(authGuard).group("/users", (app) => {
  app.get(
    "/",
    async ({ user }) => {
      if (!user) throw new UnauthorizedException();
      const data = await UserService.findAll();
      return Success(data);
    },
    {
      authenticated: true,
      detail: {
        summary: "Get all users list",
        tags: [OpenApiKey.User],
      },
      response: SuccessSchema(UserModel.UserPublicSchema.array()),
    },
  );

  return app;
});
