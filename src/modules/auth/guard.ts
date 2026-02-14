import { BaseModel } from "@/core/model/base.model";
import Elysia from "elysia";
import { UserService } from "../user/user.service";

// user middleware (compute user and session and pass to routes)
export const authGuard = new Elysia({ name: "auth-guard" })
  .macro({
    protected: {
      cookie: BaseModel.CookieSchema,
      async resolve({ cookie }) {
        const user = await UserService.getMe(
          cookie.session_token.value as string,
        );
        return { user };
      },

      // async befroeHandler({ cookie }) {
      //   const user = await UserService.getMe(cookie.session_token.value);
      //   return { user };
      // },
      // async beforeHandle({ cookie }) {
      //   const user = await UserService.getMe(cookie.session_token.value);
      //   return { user };
      // },
    },
  })
  .as("global");
