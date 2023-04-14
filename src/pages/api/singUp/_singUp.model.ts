import { IUser } from "@/types/IUser";
import { UserRepository } from "../_db/repository/user.repository";

export class SingUpModel {
  constructor(private repo: UserRepository) {}

  static init() {
    const repository = UserRepository.init();
    return new SingUpModel(repository);
  }

  async findUserByUsernameHash(username: string) {
    return await this.repo.findByUsernameHash(username);
  }

  async create(user: IUser) {
    const newUser = await this.repo.create(user);
    return newUser;
  }
}
