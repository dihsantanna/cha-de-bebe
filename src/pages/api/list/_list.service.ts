import { ITokenPayload } from "@/types/ITokenPayload";
import { CustomError } from "@/utils/CustomError";
import { StatusCodes as code } from "http-status-codes";
import jwt from "jsonwebtoken";
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

  async validateToken(token: string) {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as ITokenPayload;
    const { id } = payload;

    const userExists = await this.model.findUserById(id);
    if (!userExists) {
      throw new CustomError("Token inválido!", code.UNAUTHORIZED);
    }

    return payload;
  }

  async toggleUserItem(userId: number, itemId: number) {
    const itemIsCheckedForOtherUser = await this.model.findUserItemByItemId(
      itemId
    );

    if (
      itemIsCheckedForOtherUser &&
      itemIsCheckedForOtherUser.userId !== userId
    ) {
      throw new CustomError(
        "Item já foi selecionado por outro usuário!",
        code.BAD_REQUEST
      );
    }

    await this.model.toggleUserItem(
      userId,
      itemId,
      !!itemIsCheckedForOtherUser
    );
  }
}
