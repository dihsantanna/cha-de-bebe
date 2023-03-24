import { ListService } from "./_list.service";

export class ListController {
  constructor(private service: ListService) {}

  static init() {
    const service = ListService.init();
    return new ListController(service);
  }

  async listMissingItems() {
    const list = await this.service.listMissingItems();
    return list;
  }
}
