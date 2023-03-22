import { SingInModel } from "./_singIn.model";
import { createHash } from "crypto";
import { ITokenPayload } from "@/types/ITokenPayload";
import jwt from "jsonwebtoken";
import { CustomError } from "@/utils/CustomError";
import { StatusCodes } from "http-status-codes";

export class SingInService {
  constructor(private model: SingInModel) {}

  static init() {
    const repository = SingInModel.init();
    return new SingInService(repository);
  }

  private emailToMd5(email: string) {
    return createHash("md5").update(email).digest("hex");
  }

  private createJwtToken(payload: ITokenPayload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      algorithm: "HS256",
      expiresIn: "1d",
    });

    return token;
  }

  async singIn(email: string) {
    const emailHash = this.emailToMd5(email);
    const user = await this.model.findUserByEmailHash(emailHash);

    if (!user)
      throw new CustomError("Usuário não encontrado", StatusCodes.UNAUTHORIZED);

    const { id, name } = user;

    return this.createJwtToken({ id, name });
  }
}
