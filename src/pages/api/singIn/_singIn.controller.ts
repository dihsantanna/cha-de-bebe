import { CustomError } from "@/utils/CustomError";
import { SingInService } from "./_singIn.service";
import { StatusCodes as code } from "http-status-codes";

export class SingInController {
  constructor(private service: SingInService, private email: string) {}

  static init(email: string) {
    const service = SingInService.init();
    const controller = new SingInController(service, email);
    controller.validate();
    return controller;
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
    const token = await this.service.singIn(this.email);

    return {
      token,
      message: "Login realizado com sucesso",
    };
  }
}
