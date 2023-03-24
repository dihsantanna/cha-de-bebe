import { CustomError } from "@/utils/CustomError";
import { SingInService } from "./_singIn.service";
import { StatusCodes as code } from "http-status-codes";

export class SingInController {
  constructor(private service: SingInService, private email?: string) {}

  static init(email?: string) {
    const service = SingInService.init();
    return new SingInController(service, email);
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

    const { email } = this;
    if (!email) {
      throw new CustomError(
        "Por favor, preencha o campo de e-mail",
        code.BAD_REQUEST
      );
    }

    if (!emailRegex.test(email)) {
      throw new CustomError("E-mail inválido", code.BAD_REQUEST);
    }
  }

  async singIn() {
    this.validate();
    const { user, token } = await this.service.singIn(this.email!);

    return {
      user,
      token,
    };
  }
}
