import { IUser } from "@/types/IUser";
import { SingUpModel } from "./_singUp.model";
import { createHash } from "crypto";
import { CustomError } from "@/utils/CustomError";
import { StatusCodes } from "http-status-codes";
import { ITokenPayload } from "@/types/ITokenPayload";
import jwt from "jsonwebtoken";

export class SingUpService {
  constructor(private model: SingUpModel) {}

  static init() {
    const repository = SingUpModel.init();
    return new SingUpService(repository);
  }

  private async userExists(username: string) {
    const exists = !!(await this.model.findUserByUsernameHash(username));

    if (exists)
      throw new CustomError(
        "username já esta sendo utilizado",
        StatusCodes.BAD_REQUEST
      );
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

  async singUp({ name, username }: IUser) {
    const usernameHash = this.usernameToMd5(username);

    await this.userExists(usernameHash);

    const newUser = { name, username: usernameHash };
    const user = await this.model.create(newUser);

    const { id } = user;

    const token = this.createJwtToken({ id, name });

    Reflect.deleteProperty(user, "username");

    return { user, token };
  }
}
