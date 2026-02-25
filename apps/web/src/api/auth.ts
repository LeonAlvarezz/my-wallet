import { requestClient } from "@/lib/request";
import type { AuthModel, SimpleSuccess, UserModel } from "@my-wallet/types";

const key = "/auth";

const auth = {
  signIn: (payload: AuthModel.SignInDto) =>
    requestClient.post<UserModel.UserPublicSessionDto>(
      `${key}/sign-in`,
      payload,
    ),
  signOut: () => requestClient.post<SimpleSuccess>(`${key}/sign-out`),
  getMe: () => requestClient.get<UserModel.UserPublicDto>(`${key}/me`),
};

export default auth;
