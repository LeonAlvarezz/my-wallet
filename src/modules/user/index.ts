import Elysia from "elysia";
import { AuthModel } from "../auth/auth.model";
import { UserService } from "./user.service";
import { BaseModel } from "@/core/model/base.model";
import { UserModel } from "./user.model";
import { BadRequestException } from "@/core/error";
import {
  SimpleSuccessSchema,
  SimpleSuccess,
  Success,
  SuccessSchema,
} from "@/core/response";
import { authGuard } from "../auth/guard";

export const user = new Elysia().use(authGuard).group("/users", (app) => {
  app.get(
    "/me",
    async ({ user }) => {
      return Success(user);
    },
    {
      protected: true,
      cookie: BaseModel.CookieSchema,
      detail: {
        summary: "Get user info",
      },
      response: SuccessSchema(UserModel.UserPublicSchema),
    },
  );
  app.post(
    "/sign-up",
    async ({ body }) => {
      await UserService.signUp(body);
      return SimpleSuccess();
    },
    {
      body: AuthModel.SignUpSchema,
      detail: {
        summary: "Sign up",
      },
      response: SimpleSuccessSchema(),
    },
  );
  app.post(
    "/sign-in",
    async ({ cookie: { session_token }, body }) => {
      const data = await UserService.signIn(body);
      session_token.value = data.session_token;
      return Success(data);
    },
    {
      body: AuthModel.SignInSchema,
      cookie: BaseModel.CookieSchema,
      detail: {
        summary: "Sign in",
      },
      response: SuccessSchema(UserModel.UserPublicSessionSchema),
    },
  );

  app.post(
    "/sign-out",
    async ({ cookie: { session_token } }) => {
      if (!session_token.value)
        throw new BadRequestException({ message: "Missing Token" });
      await UserService.signOut(session_token.value);
      delete session_token.value;
      return SimpleSuccess();
    },
    {
      cookie: BaseModel.CookieSchema,
      detail: {
        summary: "Sign out",
      },
      response: SimpleSuccessSchema(),
    },
  );

  return app;
});
