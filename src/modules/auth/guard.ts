import { BaseModel } from "@/core/model/base.model";
import Elysia from "elysia";
import { AuthService } from "./auth.service";
import { UnauthorizedException } from "@/core/error";

// user middleware (compute user and session and pass to routes)
export const authGuard = new Elysia({ name: "auth-guard" })
  .macro({
    protected: {
      cookie: BaseModel.CookieSchema,
      async resolve({ cookie }) {
        if (!cookie.session_token.value) throw new UnauthorizedException();
        const user = await AuthService.getMe(
          cookie.session_token.value as string,
        );
        return { user };
      },
    },
  })
  .as("global");
