import { ListRepository } from "../_db/repository/list.repository";
import { UserRepository } from "../_db/repository/user.repository";

export class ListModel {
  constructor(
    private listRepo: ListRepository,
    private userRepo: UserRepository
  ) {}

  static init() {
    const listRepo = ListRepository.init();
    const userRepo = UserRepository.init();
    return new ListModel(listRepo, userRepo);
  }

  async listMissingItems() {
    const list = await this.listRepo.listMissingItems();
    return list;
  }

  async findUserById(id: number) {
    const user = await this.userRepo.findById(id);
    return user;
  }

  async findUserItemByItemId(itemId: number) {
    const userItem = await this.listRepo.findUserItemByItemId(itemId);
    return userItem;
  }

  async toggleUserItem(userId: number, itemId: number, exists: boolean) {
    await this.listRepo.toggleUserItem(userId, itemId, exists);
  }

  async listUserItems(userId: number) {
    const list = await this.listRepo.listUserItems(userId);
    return list;
  }
}
