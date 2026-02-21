import { BaseModel } from "@/core/model/base.model";
import Elysia from "elysia";
import { AuthService } from "./auth.service";
import { UnauthorizedException } from "@/core/error";
import { RedisService } from "@/lib/redis/redis.service";
import { redis } from "bun";

// user middleware (compute user and session and pass to routes)
export const authGuard = new Elysia({ name: "auth-guard" })
  .macro("protected", {
    cookie: BaseModel.CookieSchema,

    async resolve({ cookie }) {
      const sessionToken = cookie.session_token.value;
      if (!sessionToken) throw new UnauthorizedException();
      const userCache = await RedisService.getSession(sessionToken);
      if (!userCache) {
        const user = await AuthService.getMe(sessionToken);
        RedisService.setSession(user.session_token, user.user);
      }

      return {};
    },
  })
  .macro("authenticated", {
    cookie: BaseModel.CookieSchema,
    async resolve({ cookie }) {
      const sessionToken = cookie.session_token.value as string;
      console.log("sessionToken:", sessionToken);
      if (!sessionToken) throw new UnauthorizedException();
      const userCache = await RedisService.getSession(sessionToken);
      if (!userCache) {
        const user = await AuthService.getMe(sessionToken);
        RedisService.setSession(user.session_token, user.user);
        return { user: user.user };
      }
      console.log("Use Cache");
      return { user: userCache };
    },
  })
  .as("global");
