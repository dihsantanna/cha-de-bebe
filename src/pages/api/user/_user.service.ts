import { ITokenPayload } from "@/types/ITokenPayload";
import { CustomError } from "@/utils/CustomError";
import { UserModel } from "./_user.model";
import { StatusCodes as code } from "http-status-codes";
import jwt from "jsonwebtoken";

export class UserService {
  constructor(private model: UserModel) {}

  static init() {
    const model = UserModel.init();
    return new UserService(model);
  }

  async toggleConfirmedPresence(token: string) {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as ITokenPayload;
    if (!payload) throw new CustomError("Token inválido!", code.UNAUTHORIZED);
    const user = await this.model.findUserById(payload.id);
    if (!user) throw new CustomError("Usuário não encontrado!", code.NOT_FOUND);
    const { id, confirmedPresence } = user;
    await this.model.updateConfirmedPresence(id, !confirmedPresence);
  }
}
