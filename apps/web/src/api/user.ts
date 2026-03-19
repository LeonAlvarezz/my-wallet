import { requestClient } from "@/lib/request";
import type { UserModel } from "@my-wallet/types";

const key = "/users";

const user = {
  updateMe: (payload: UserModel.UpdateProfileDto) =>
    requestClient.put<UserModel.UserPublicDto>(`${key}/me`, payload),
};

export default user;
