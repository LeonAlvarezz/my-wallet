import { UserRepository } from "./user.repository";
import { NotFoundException } from "@my-wallet/exception";
import { UserModel } from "@my-wallet/types";

export class UserService {
  static async findAll() {
    return await UserRepository.findAll();
  }

  static async updateMe(userId: number, payload: UserModel.UpdateProfileDto) {
    const updated = await UserRepository.update(userId, payload);
    if (!updated) {
      throw new NotFoundException({ message: "User not found" });
    }

    return updated;
  }
}
