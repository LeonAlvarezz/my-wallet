import { ForbiddenException, UnauthorizedException } from "@/core/error";
import { db } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/util/password";
import { generateSessionToken, hashSessionToken } from "@/util/session-token";
import type { AuthModel } from "../auth/auth.model";
import { AuthRepository } from "../auth/auth.repository";
import { SessionRepository } from "../session/session.repository";
import { UserModel } from "./user.model";
import { UserRepository } from "./user.repository";
import { SimpleSuccess } from "@/core/response";

export class UserService {
  static async signUp(payload: AuthModel.SignUpDto) {
    const isUserExist = await UserRepository.findByEmail(payload.email);
    if (isUserExist)
      throw new ForbiddenException({
        message: "User with the same email already exist",
      });
    return await db.transaction(async (tx) => {
      const user = await UserRepository.create(
        {
          email: payload.email,
          username: payload.username,
          public_id: crypto.randomUUID(),
        },
        tx,
      );
      const password_hash = await hashPassword(payload.password);
      await AuthRepository.create(
        {
          password_hash,
          user_id: user.id,
        },
        tx,
      );
      return SimpleSuccess();
    });
  }

  static async signIn(payload: AuthModel.SignInDto) {
    const user = await UserRepository.findByEmail(payload.email);
    if (!user) throw new UnauthorizedException();
    const auth = await AuthRepository.findByUserId(user.id);
    if (!auth) throw new UnauthorizedException();
    const isValidPassword = await verifyPassword(
      payload.password,
      auth.password_hash,
    );
    if (!isValidPassword) throw new UnauthorizedException();

    const sessionToken = generateSessionToken();
    const sessionTokenHash = hashSessionToken(sessionToken);

    // Default: 7 days
    const expiresAt = new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 7,
    ).toISOString();

    await SessionRepository.create({
      user_id: user.id,
      session_token_hash: sessionTokenHash,
      expires_at: expiresAt,
    });

    return {
      session_token: sessionToken,
      expires_at: expiresAt,
      user: UserModel.UserPublicSchema.parse(user),
    };
  }

  static async getMe(sessionToken: string) {
    const hashedSession = hashSessionToken(sessionToken);
    const session = await SessionRepository.findByToken(hashedSession);
    if (!session) throw new UnauthorizedException();
    const time = new Date(session.expires_at).getTime();
    await SessionRepository.updateTime(session.id, time);
    return UserModel.UserPublicSchema.parse(session.user);
  }

  static async signOut(sessionToken: string) {
    const hashedSession = hashSessionToken(sessionToken);
    const session = await SessionRepository.findByToken(hashedSession);
    if (!session) throw new UnauthorizedException();
    await SessionRepository.deleteSessionById(session.id);
  }

  static async findAll() {
    return await UserRepository.findAll();
  }
}
