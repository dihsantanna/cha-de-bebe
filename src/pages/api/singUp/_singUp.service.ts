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

  private async userExists(email: string) {
    const exists = !!(await this.model.findUserByEmailHash(email));

    if (exists)
      throw new CustomError(
        "Email já esta sendo utilizado",
        StatusCodes.BAD_REQUEST
      );
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

  async singUp({ name, email }: IUser) {
    const emailHash = this.emailToMd5(email);

    await this.userExists(emailHash);

    const user = { name, email: emailHash };
    const { id } = await this.model.create(user);

    return this.createJwtToken({ id, name });
  }
}
