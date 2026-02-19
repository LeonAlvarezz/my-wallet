import Elysia from "elysia";
import { AuthModel } from "./auth.model";
import { BaseModel } from "@/core/model/base.model";
import { UserModel } from "../user/user.model";
import { BadRequestException } from "@/core/error";
import {
  SimpleSuccessSchema,
  SimpleSuccess,
  Success,
  SuccessSchema,
} from "@/core/response";
import { authGuard } from "./guard";
import { AuthService } from "./auth.service";
import { OpenApiKey } from "../app/openapi";
import { redis } from "@/lib/redis";
import { RedisService } from "@/lib/redis/redis.service";

export const auth = new Elysia().use(authGuard).group("/auths", (app) => {
  app.get(
    "/me",
    async ({ user }) => {
      return Success(user);
    },
    {
      authenticated: true,
      cookie: BaseModel.CookieSchema,
      detail: {
        summary: "Get user info",
        tags: [OpenApiKey.Auth],
      },
      response: SuccessSchema(UserModel.UserPublicSchema),
    },
  );
  app.post(
    "/sign-up",
    async ({ body }) => {
      await AuthService.signUp(body);
      return SimpleSuccess();
    },
    {
      parse: "application/json",
      body: AuthModel.SignUpSchema,
      detail: {
        summary: "Sign up",
        tags: [OpenApiKey.Auth],
      },
      response: SimpleSuccessSchema(),
    },
  );
  app.post(
    "/sign-in",
    async ({ cookie: { session_token }, body }) => {
      const data = await AuthService.signIn(body);
      session_token.value = data.session_token;
      await RedisService.setSession(data.session_token, data.user);
      return Success(data);
    },
    {
      parse: "application/json",
      body: AuthModel.SignInSchema,
      cookie: BaseModel.CookieSchema,
      detail: {
        summary: "Sign in",
        tags: [OpenApiKey.Auth],
      },

      response: SuccessSchema(UserModel.UserPublicSessionSchema),
    },
  );

  app.post(
    "/sign-out",
    async ({ cookie: { session_token } }) => {
      if (!session_token.value)
        throw new BadRequestException({ message: "Missing Token" });
      await AuthService.signOut(session_token.value);
      delete session_token.value;
      return SimpleSuccess();
    },
    {
      cookie: BaseModel.CookieSchema,
      detail: {
        summary: "Sign out",
        tags: ["Auth"],
      },
      response: SimpleSuccessSchema(),
    },
  );

  return app;
});
