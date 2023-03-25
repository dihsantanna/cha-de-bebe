import { ITokenPayload } from "@/types/ITokenPayload";
import { CustomError } from "@/utils/CustomError";
import { StatusCodes as code } from "http-status-codes";
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

  private async validateToken(token: string): Promise<ITokenPayload> {
    const payload = await this.service.validateToken(token);
    return payload;
  }

  async toggleUserItem(itemId: number, token: string) {
    const payload = await this.validateToken(token);
    if (!payload) {
      throw new CustomError("Token inválido!", code.UNAUTHORIZED);
    }
    const { id } = payload;

    await this.service.toggleUserItem(id, itemId);

    return {
      message: "Item alterado com sucesso!",
    };
  }

  async listUserItems(token: string) {
    const payload = await this.validateToken(token);
    if (!payload) {
      throw new CustomError("Token inválido!", code.UNAUTHORIZED);
    }
    const { id } = payload;

    const list = await this.service.listUserItems(id);

    return list;
  }
}
