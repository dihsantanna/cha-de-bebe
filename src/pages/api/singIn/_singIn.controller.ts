import { CustomError } from "@/utils/CustomError";
import { SingInService } from "./_singIn.service";
import { StatusCodes as code } from "http-status-codes";

export class SingInController {
  constructor(private service: SingInService, private username?: string) {}

  static init(username?: string) {
    const service = SingInService.init();
    return new SingInController(service, username);
  }

  async validateToken(oldToken: string) {
    if (!oldToken)
      throw new CustomError("Token não informado", code.UNAUTHORIZED);
    const { user, token } = await this.service.validateToken(oldToken);

    return {
      user,
      token,
    };
  }

  validate() {
    const emailRegex = /^[a-z0-9._-]+@[a-z0-9]+\.[a-z]+(\.([a-z]+))?$/i;
    const phoneRegex = /\d{11}/;

    const { username } = this;
    if (!username) {
      throw new CustomError(
        "Por favor, preencha o campo de e-mail",
        code.BAD_REQUEST
      );
    }

    const isEmail = emailRegex.test(username);
    const isPhone = phoneRegex.test(username);

    if (!isEmail && !isPhone) {
      throw new CustomError(
        "Por favor, insira um email/celular válido",
        code.BAD_REQUEST
      );
    }
  }

  async singIn() {
    this.validate();
    const { user, token } = await this.service.singIn(this.username!);

    return {
      user,
      token,
    };
  }
}
