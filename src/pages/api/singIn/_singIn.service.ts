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

  private usernameToMd5(username: string) {
    return createHash("md5").update(username).digest("hex");
  }

  private createJwtToken(payload: ITokenPayload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      algorithm: "HS256",
      expiresIn: "1d",
    });

    return token;
  }

  async singIn(username: string) {
    const usernameHash = this.usernameToMd5(username);
    const user = await this.model.findUserByUsernameHash(usernameHash);

    if (!user)
      throw new CustomError("Usuário não encontrado", StatusCodes.UNAUTHORIZED);

    const { id, name } = user;

    const token = this.createJwtToken({ id, name });

    Reflect.deleteProperty(user, "username");

    return { user, token };
  }

  async validateToken(oldToken: string) {
    try {
      const payload = jwt.verify(
        oldToken,
        process.env.JWT_SECRET as string
      ) as ITokenPayload;

      const user = await this.model.findUserById(payload.id);

      if (!user)
        throw new CustomError(
          "Usuário não encontrado",
          StatusCodes.UNAUTHORIZED
        );

      const { id, name } = user;

      const token = this.createJwtToken({ id, name });

      Reflect.deleteProperty(user, "username");

      return { user, token };
    } catch (error) {
      if (
        error instanceof jwt.JsonWebTokenError ||
        error instanceof jwt.TokenExpiredError ||
        error instanceof jwt.NotBeforeError
      ) {
        throw new CustomError("Token inválido", StatusCodes.UNAUTHORIZED);
      }

      throw error;
    }
  }
}
