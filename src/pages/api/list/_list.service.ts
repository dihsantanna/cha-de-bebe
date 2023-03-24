import { ListModel } from "./_list.model";

export class ListService {
  constructor(private model: ListModel) {}

  static init() {
    const model = ListModel.init();
    return new ListService(model);
  }

  async listMissingItems() {
    const list = await this.model.listMissingItems();
    return list;
  }
}
