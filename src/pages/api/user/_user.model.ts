import { Users } from "@prisma/client";
import { UserRepository } from "../_db/repository/user.repository";

export class UserModel {
  constructor(private repo: UserRepository) {}
  static init() {
    const repo = UserRepository.init();
    return new UserModel(repo);
  }

  async findUserById(id: number) {
    return await this.repo.findById(id);
  }

  async updateConfirmedPresence(id: number, confirmedPresence: boolean) {
    await this.repo.update(id, { confirmedPresence } as Users);
  }
}
