import { UserRepository } from "../_db/repository/user.repository";

export class SingInModel {
  constructor(private repo: UserRepository) {}

  static init() {
    const repository = UserRepository.init();
    return new SingInModel(repository);
  }

  async findUserByUsernameHash(usernameHash: string) {
    return await this.repo.findByUsernameHash(usernameHash);
  }

  async findUserById(id: number) {
    return await this.repo.findById(id);
  }
}
