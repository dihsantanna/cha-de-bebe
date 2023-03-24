import { ListRepository } from "../_db/repository/list.repository";

export class ListModel {
  constructor(private listRepo: ListRepository) {}

  static init() {
    const listRepo = ListRepository.init();
    return new ListModel(listRepo);
  }

  async listMissingItems() {
    const list = await this.listRepo.listMissingItems();
    return list;
  }
}
