import { UserRepository } from "../_db/repository/user.repository";

export class SingInModel {
  constructor(private repo: UserRepository) {}

  static init() {
    const repository = UserRepository.init();
    return new SingInModel(repository);
  }

  async findUserByEmailHash(emailHash: string) {
    return await this.repo.findByEmailHash(emailHash);
  }

  async findUserById(id: number) {
    return await this.repo.findById(id);
  }
}
